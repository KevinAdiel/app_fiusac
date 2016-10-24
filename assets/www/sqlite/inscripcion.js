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
		//alert('Databases are not supported in this browser.');
		return;
	}

	db = openDatabase(shortName, version, displayName, maxSize);
	db
			.transaction(
					function(tx) {
						tx
								.executeSql(
										'CREATE TABLE IF NOT EXISTS inscripcion(anio INTEGER NOT NULL, fecha TEXT NOT NULL PRIMARY KEY)',
										[], nullHandler, errorHandler);
					}, errorHandler, successCallBack);

}

function ListDBValues() {

	if (!window.openDatabase) {
		//alert('Databases are not supported in this browser.');
		return;
	}

	$('#lbUsers').html('');
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM inscripcion;', [], function(
				transaction, result) {
			if (result != null && result.rows != null) {
				for ( var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					// alert(row.anio + " " + row.fecha)
					agregarInscripcion(row.anio, row.fecha);
				}
			}
		}, errorHandler);
	}, errorHandler, nullHandler);

	return;

}

function AddValueToDB(anio, fecha) {

	if (!window.openDatabase) {
		//alert('Databases are not supported in this browser.');
		return;
	}

	db.transaction(function(transaction) {
		transaction.executeSql(
				'INSERT INTO inscripcion(anio, fecha) VALUES (?,?)', [ anio,
						fecha ], nullHandler, errorHandler);
	});

	return false;

}

function vaciarTablaInscripcion() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx
				.executeSql('DELETE FROM inscripcion;', [], nullHandler,
						errorHandler);
	}, errorHandler, successCallBack);
}
