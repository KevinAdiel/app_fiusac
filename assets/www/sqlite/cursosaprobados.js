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
										'CREATE TABLE IF NOT EXISTS datoslistado(carnet TEXT NOT NULL, nombre TEXT NOT NULL, codigo TEXT NOT NULL, carrera TEXT NOT NULL, cursosaprobados INTEGER NOT NULL, cursosproblema INTEGER NOT NULL, creditos INTEGER NOT NULL, promedio TEXT NOT NULL )',
										[], nullHandler, errorHandler);
					}, errorHandler, successCallBack);

}

function onBodyLoad2() {

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
										'CREATE TABLE IF NOT EXISTS cursoaprobado(numero INTEGER NOT NULL, codigo TEXT NOT NULL, nombre TEXT NOT NULL, creditos INTEGER NOT NULL, fecha TEXT NOT NULL, nota REAL NOT NULL, forma INTEGER NOT NULL)',
										[], nullHandler, errorHandler);
					}, errorHandler, successCallBack);

}

function ListDBValues2() {

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	$('#lbUsers').html('');
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM cursoaprobado;', [], function(
				transaction, result) {
			if (result != null && result.rows != null) {
				for ( var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					agregarCurso(row.numero, row.codigo, row.nombre,
							row.creditos, row.fecha, row.nota, row.forma);
				}
			}
		}, errorHandler);
	}, errorHandler, nullHandler);

	return;

}

function ListDBValues() {

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	$('#lbUsers').html('');
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM datoslistado;', [], function(
				transaction, result) {
			if (result != null && result.rows != null) {
				for ( var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					agregarInfo("id", "NOMBRE: " + row.carnet + " - "
							+ row.nombre);
					agregarInfo("carrera", "CARRERA: " + row.codigo + " - "
							+ row.carrera);
					agregarInfo("aprobado", "CURSOS APROBADOS: "
							+ row.cursosaprobados);
					agregarInfo("problema", "CURSOS PROBLEMA: "
							+ row.cursosproblema);
					agregarInfo("creditos", "CREDITOS: " + row.creditos);
					agregarInfo("promedio", "PROMEDIO: " + row.promedio);
				}
			}
		}, errorHandler);
	}, errorHandler, nullHandler);

	return;

}

function AddValueToDB(carnet, nombre, codigo, carrera, cursosaprobados,
		cursosproblema, creditos, promedio) {

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	db
			.transaction(function(transaction) {
				transaction
						.executeSql(
								'INSERT INTO datoslistado(carnet, nombre, codigo, carrera, cursosaprobados, cursosproblema, creditos, promedio) VALUES (?,?, ?, ?,?,?,?,?)',
								[ carnet, nombre, codigo, carrera,
										cursosaprobados, cursosproblema,
										creditos, promedio ], nullHandler,
								errorHandler);
			});

	return false;

}

function AddValueToDB2(numero, codigo, nombre, creditos, fecha, nota, forma) {

	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}

	db
			.transaction(function(transaction) {
				transaction
						.executeSql(
								'INSERT INTO cursoaprobado(numero, codigo, nombre, creditos, fecha, nota, forma) VALUES (?,?, ?, ?,?,?,?)',
								[ numero, codigo, nombre, creditos, fecha,
										nota, forma ], nullHandler,
								errorHandler);
			});

	return false;

}

function vaciarTablaDatosListado() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx.executeSql('DELETE FROM datoslistado;', [], nullHandler,
				errorHandler);
	}, errorHandler, successCallBack);
}

function vaciarTablaCursos() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx.executeSql('DELETE FROM cursoaprobado;', [], nullHandler,
				errorHandler);
	}, errorHandler, successCallBack);
}