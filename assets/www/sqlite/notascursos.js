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
										'CREATE TABLE IF NOT EXISTS notascursos(curso TEXT NOT NULL, nombre TEXT NOT NULL, seccion TEXT NOT NULL, laboratorio INTEGER NOT NULL, zona INTEGER NOT NULL, examen INTEGER NOT NULL, periodo TEXT NOT NULL, anio INTEGER NOT NULL )',
										[], nullHandler, errorHandler);
					}, errorHandler, successCallBack);

}

function ListDBValues(periodo, anio) {

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	$('#lbUsers').html('');
	db.transaction(function(transaction) {
		transaction.executeSql(
				'SELECT * FROM notascursos WHERE periodo = ? AND anio = ?;', [
						periodo, anio ], function(transaction, result) {
					if (result != null && result.rows != null) {
						for ( var i = 0; i < result.rows.length; i++) {
							var row = result.rows.item(i);
							// alert(row.anio + " " + row.fecha)
							agregarCurso(row.curso, row.nombre, row.seccion,
									row.laboratorio, row.zona, row.examen);
						}
					}
				}, errorHandler);
	}, errorHandler, nullHandler);

	return;

}

function AddValueToDB(curso, nombre, seccion, laboratorio, zona, examen,
		periodo, anio) {

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	db
			.transaction(function(transaction) {
				transaction
						.executeSql(
								'INSERT INTO notascursos(curso , nombre , seccion , laboratorio , zona , examen , periodo , anio) VALUES (?,?, ?, ?, ?, ?, ?, ?)',
								[ curso, nombre, seccion, laboratorio, zona,
										examen, periodo, anio ], nullHandler,
								errorHandler);
			});

	return false;

}

function eliminarSemestre(periodo, anio) {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx.executeSql(
				'DELETE FROM notascursos WHERE periodo = ? AND anio = ?;', [
						periodo, anio ], nullHandler, errorHandler);
	}, errorHandler, successCallBack);
}

function vaciarTablaNotas() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx
				.executeSql('DELETE FROM notascursos;', [], nullHandler,
						errorHandler);
	}, errorHandler, successCallBack);
}
