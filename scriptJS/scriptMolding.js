class Molding {
	
	constructor(toolNum, dateLim18, dateLimDra, dateLimPol, idMolding = 0){
		this.toolNum = toolNum
		this.dateLim18 = dateLim18
		this.dateLimPol = dateLimPol
		this.dateLimDra = dateLimDra
		this.idMolding = idMolding
	}

	
	associateMoldingIdToKits(idKitTable,molding){
		for (let index = 0; index < idKitTable.length; index++) {
			var xmlhttp = new XMLHttpRequest()
			xmlhttp.open("GET",'../scriptPhp/associateMoldingToKitScript.php?kitId=' + idKitTable[index] + '&moldingId=' + molding.idMolding + '&toolNumber='+ molding.toolNum,true)
			xmlhttp.send()
			console.log("Kit " + idKitTable[index] + " est associé avec le moulage " + molding.idMolding)
		}
	}
}
function saveMolding(molding) {
	var xmlhttp = new XMLHttpRequest()
	switch (title.innerText.substr(0,3)){
        case "Mod":
			modifDate = new Date()
			modifDate = modifDate.toISOString().slice(0, 19).replace('T', ' ')
			console.log(idMoldingToEdit)
			xmlhttp.open("GET",'../scriptPhp/updateMoldingScript.php?moldingID=' + idMoldingToEdit + '&tool=' + molding.toolNum + '&date18=' + molding.dateLim18.toISOString().slice(0, 19).replace('T', ' ') + '&datePol=' + molding.dateLimPol.toISOString().slice(0, 19).replace('T', ' ') + '&dateDra=' + molding.dateLimDra.toISOString().slice(0, 19).replace('T', ' ') + '&dateMod=' + modifDate,false);
			xmlhttp.onload = () => {
				if (xmlhttp.status >= 200 && xmlhttp.status < 400){
					console.log("Moulage modifié !")
				}	
			}
			xmlhttp.send()
			console.log("La modification du moulage a été sauvegardé")
        break
        case "Nou":
			xmlhttp.open("GET",'../scriptPhp/newMoldingScript.php?tool=' + molding.toolNum + '&date18=' + molding.dateLim18.toISOString().slice(0, 19).replace('T', ' ') + '&datePol=' + molding.dateLimPol.toISOString().slice(0, 19).replace('T', ' ') + '&dateDra=' + molding.dateLimDra.toISOString().slice(0, 19).replace('T', ' '),false);
			xmlhttp.onload = () => {
				if (xmlhttp.status >= 200 && xmlhttp.status < 400){
					molding.idMolding = xmlhttp.responseText
				}	
			}
			xmlhttp.send()
			console.log("Le nouveau moulage a été sauvegardé")
		break
	}		
}