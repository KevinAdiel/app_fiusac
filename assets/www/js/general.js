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