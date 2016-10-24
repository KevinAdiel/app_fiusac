var carnet;
var carrera;

function cargarVariables() {
	cadVariables = location.search.substring(1, location.search.length);
	arrVariables = cadVariables.split("&");
	for (i = 0; i < arrVariables.length; i++) {
		arrVariableActual = arrVariables[i].split("=");
		if (i == 0) {
			carnet = arrVariableActual[1];
		} else {
			carrera = arrVariableActual[1];
		}
	}
}

function enviarInfo(pagina) {
	pagina = pagina + ".html";
	nombres = "carnet,carrera";
	pagina += "?";
	nomVec = nombres.split(",");
	for (i = 0; i < nomVec.length; i++) {
		if (i == 0) {
			pagina += nomVec[i] + "=" + carnet + "&";
		} else {
			pagina += nomVec[i] + "=" + carrera + "&";
		}
	}
	pagina = pagina.substring(0, pagina.length - 1);
	location.href = pagina;
}

// SQLITE

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

function eliminarTablaInscripcion() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(
			function(tx) {

				tx.executeSql('DROP TABLE IF EXISTS inscripcion;', [], nullHandler,
						errorHandler);
			}, errorHandler, successCallBack);
}

function eliminarTablaRepitencia() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx.executeSql('DROP TABLE IF EXISTS repitencia;', [], nullHandler, errorHandler);
	}, errorHandler, successCallBack);
}

function eliminarTablaResolucionjd() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx
				.executeSql('DROP TABLE IF EXISTS resolucionjd;', [], nullHandler,
						errorHandler);
	}, errorHandler, successCallBack);
}

function eliminarTablaDatosListado() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx
				.executeSql('DROP TABLE IF EXISTS datoslistado;', [], nullHandler,
						errorHandler);
	}, errorHandler, successCallBack);
}

function eliminarTablaCursoAprobado() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx
				.executeSql('DROP TABLE IF EXISTS cursoaprobado;', [], nullHandler,
						errorHandler);
	}, errorHandler, successCallBack);
}

function eliminarTablaEstudiante() {
	if (!window.openDatabase) {
		// alert('Databases are not supported in this browser.');
		return;
	}
	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx) {

		tx
				.executeSql('DROP TABLE IF EXISTS estudiantedatos;', [], nullHandler,
						errorHandler);
	}, errorHandler, successCallBack);
}