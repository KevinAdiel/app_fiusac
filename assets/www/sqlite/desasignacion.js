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
										'CREATE TABLE IF NOT EXISTS desasignacion(curso TEXT NOT NULL, nombre TEXT NOT NULL, fecha TEXT NOT NULL)',
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
		transaction.executeSql('SELECT * FROM desasignacion;', [], function(
				transaction, result) {
			if (result != null && result.rows != null) {
				for ( var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					// alert(row.anio + " " + row.fecha)
					agregarDesasignacion(row.curso, row.nombre, row.fecha);
				}
			}
		}, errorHandler);
	}, errorHandler, nullHandler);

	return;

}

function AddValueToDB(curso, nombre, fecha) {

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	db
			.transaction(function(transaction) {
				transaction
						.executeSql(
								'INSERT INTO desasignacion(curso, nombre, fecha) VALUES (?,?, ?)',
								[ curso, nombre, fecha ], nullHandler,
								errorHandler);
			});

	return false;

}

function vaciarTablaDesasignacion() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx.executeSql('DELETE FROM desasignacion;', [], nullHandler,
				errorHandler);
	}, errorHandler, successCallBack);
}
