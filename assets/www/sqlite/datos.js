var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;

function errorHandler(transaction, error) {
	// alert('Error: ' + error.message + ' code: ' + error.code);

}

function successCallBack() {
	// alert("DEBUGGING: success");

}

function nullHandler() {
};

function onBodyLoad() {

	// alert("DEBUGGING: we are in the onBodyLoad() function");

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	db = openDatabase(shortName, version, displayName, maxSize);
	db
			.transaction(
					function(tx) {
						tx
								.executeSql(
										'CREATE TABLE IF NOT EXISTS estudiantedatos(nombre TEXTO NOT NULL, apellido TEXT NOT NULL, carnet TEXT NOT NULL, direccion TEXT NOT NULL, celular TEXT NOT NULL, telefono TEXT NOT NULL, correo TEXT NOT NULL, fecha TEXT NOT NULL )',
										[], nullHandler, errorHandler);
					}, errorHandler, successCallBack);

}

function ListDBValues() {

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	$('#lbUsers').html('');
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM estudiantedatos;', [], function(
				transaction, result) {
			if (result != null && result.rows != null) {
				for ( var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					// alert(row.anio + " " + row.fecha)
					agregarInfo('nombre', row.nombre + ' ' + row.apellido);
					agregarInfo('carne', row.carnet);
					agregarInfo('direccion', row.direccion);
					agregarInfo('celular', row.celular);
					agregarInfo('telefono', row.telefono);
					agregarInfo('correo', row.correo);
					agregarInfo('fechanac', row.fecha);
				}
			}
		}, errorHandler);
	}, errorHandler, nullHandler);

	return;

}

function AddValueToDB(nombre, apellido, carnet, direccion, celular, telefono,
		correo, fecha) {

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	db
			.transaction(function(transaction) {
				transaction
						.executeSql(
								'INSERT INTO estudiantedatos(nombre, apellido, carnet, direccion, celular, telefono, correo, fecha) VALUES (?,?, ?, ?, ? ,? ,? ,?)',
								[ nombre, apellido, carnet, direccion, celular,
										telefono, correo, fecha ], nullHandler,
								errorHandler);
			});

	return false;

}

function vaciarTablaEstudiante() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx.executeSql('DELETE FROM estudiantesdatos;', [], nullHandler,
				errorHandler);
	}, errorHandler, successCallBack);
}
