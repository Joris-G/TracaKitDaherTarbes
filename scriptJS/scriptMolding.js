class Molding {
	
	constructor(toolNum, dateLim18, dateLimDra, dateLimPol){
		this.toolNum = toolNum
		this.dateLim18 = dateLim18
		this.dateLimPol = dateLimPol
		this.dateLimDra = dateLimDra
		this.idMolding = null
	}
	saveMolding() {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				
			}

		
		}
		xmlhttp.open("GET",'../scriptPhp/newMoldingScript.php?tool=' + this.toolNum + '&date18=' + this.dateLim18.toISOString().slice(0, 19).replace('T', ' ') + '&datePol=' + this.dateLimPol.toISOString().slice(0, 19).replace('T', ' ') + '&dateDra=' + this.dateLimDra.toISOString().slice(0, 19).replace('T', ' '),true);
		xmlhttp.onload = () => {
			if (xmlhttp.status >= 200 && xmlhttp.status < 400){
				this.idMolding= xmlhttp.responseText
			  }	
		}
		xmlhttp.send();
	}
}