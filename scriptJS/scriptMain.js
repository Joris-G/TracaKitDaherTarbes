var divDay = document.getElementById('day')
var dateToday = new Date()
var divWorker = document.getElementById('worker')
var divMoldingTool = document.getElementById('moldingTool')
var divNumberOfPart = document.getElementById('numberOfPart')
var numberOfPart
var divNumberOfMissingPart = document.getElementById('numberOfMissingPart')
var tbl = document.getElementById('tableauRecap')
var divTbl = document.getElementById('printable')
//var username = document.getElementById('user').innerHTML;
var btnAddKitManualMode = document.getElementById('btnAddKitManualMode');
btnAddKitManualMode.addEventListener('click', addKitManualMode);
var idKitTable = new Array();
var divScan = document.getElementById("divScan")

initNewMolding()

function initNewMolding(){
    divDay.innerHTML = "Date de moulage : " + dateToday.getDate() + "/" + (dateToday.getMonth()+1) + "/" + dateToday.getFullYear()
    createKitTable()
}
function addKitManualMode() {
    var manuKitArticleSap = document.getElementById('articleSap')
    var manuKitDesArticle = document.getElementById('desArticle')
    var manuKitWorkOrder = document.getElementById('workOrder')
    var manuKitDate18 = document.getElementById('pickerDate18')
    var manuKitDateDra = document.getElementById('pickerDateDra')
    var manuKitDatePol = document.getElementById('pickerDatePol')
    if (!manuKitDesArticle.value == 0 &&
        !manuKitArticleSap.value == 0 && 
        !manuKitWorkOrder.value == 0 && 
        !manuKitDate18.value == 0 && 
        !manuKitDateDra.value == 0 && 
        !manuKitDatePol.value == 0){
            var manuKit = new Kit(manuKitArticleSap.value, manuKitDesArticle.value,manuKitWorkOrder.value,new Date(manuKitDate18.value),new Date(manuKitDateDra.value),new Date(manuKitDatePol.value))
            afterNewKitActions(manuKit)
            manuKitArticleSap.value = ""
            manuKitDesArticle.value = ""
            manuKitWorkOrder.value = ""
            manuKitDate18.value = ""
            manuKitDateDra.value = ""
            manuKitDatePol.value = ""
    }else{
        alert('Veuiller remplir correctement tous les champs !!')
    }

}
function displayKitOnTable(kit){
    divTbl.style.display= null;
    addRow(kit)
}
var btnScan = document.getElementById('btnScan')
if(btnScan)   {
    btnScan.addEventListener('click', focusTxtArea)
}
var $inputKit = document.getElementById('kitInput')
if($inputKit){
    $inputKit.addEventListener("focus", focusScanAction);
    $inputKit.addEventListener("focusout", exitFocusScanAction);
    //$inputKit.addEventListener('input', scanAction);
}
function exitFocusScanAction(){
    btnScan.style.backgroundColor = "red";
}
function focusScanAction(){
    btnScan.style.backgroundColor = "green";
}
function focusTxtArea(){
    $inputKit.focus()
}
function exitFocusTxtArea(){
    $inputKit.blur()
}
function scanAction (event){
    if (event.keyCode === 13) {
        exitFocusTxtArea()
        if ($inputKit.value.length > 20){
            newKitByScan($inputKit.value)
        }else{
            alert('Tentez de scanner le QR code et pas le code barre. \n\nPlacer un papier devant le code barre')
        }
        $inputKit.value = ''
        window.setTimeout(focusTxtArea(), 3000)
    }
}
function afterNewKitActions(kit){
    idKitTable.push(kit.kitId)
    kit.registerInBase(toolSap,1)
    updateGlobalDates(kit)
    displayKitOnTable(kit)

    console.log(idKitTable)
    divNumberOfPart.innerHTML = "Nombre de kit scanné : " + idKitTable.length
    divNumberOfMissingPart.innerHTML = "Nombre de kit manquant : " + numberOfPart - idKitTable.length
}
function newKitByScan(){
    //Tableau des index de colonnes de la Fiche de Vie scanner, "RefSap : "
    var TbIndex=["Kit : ", "RÃ©fÃ©rence SAP : ", "DÃ©signation SAP : ", "Tack Life ( Heures ) : ", 
    "Time Out ( Heures ) : ", "Date de pÃ©remption Ã -18Â°C : ", "KIT Ã draper avant : ", 
"KIT Ã cuire avant : ", "MatiÃ¨re pÃ©nalisante drapage : ", "MatiÃ¨re pÃ©nalisante cuisson : "];
    //Fonction permettant d'insérer le saut de ligne entre les données
    var tableauSplit = CheckDataIndex($inputKit.value, TbIndex, '\n').split("\n");        
    var tableauRes = [];
    var k = 0;
    for (var i = 0; i < tableauSplit.length; i++) {
        var tableauTampon = tableauSplit[i].split(" : ");
        tableauRes[k] = tableauTampon[0];
        tableauRes[k + 1] = tableauTampon[1];
        console.info(tableauTampon[0] + " || " + tableauTampon[1]);
        k = k + 2;
    }
    var date18 = new Date();
    date18.setDate(tableauRes[11].substr(0,2));
    date18.setMonth(tableauRes[11].substr(3,2)-1);
    date18.setFullYear(tableauRes[11].substr(6,4));
    date18.setHours(tableauRes[11].substr(11,2));
    date18.setMinutes(tableauRes[11].substr(14,2));

    var dateDra = new Date();
    dateDra.setDate(tableauRes[13].substr(0,2));
    dateDra.setMonth(tableauRes[13].substr(3,2)-1);
    dateDra.setFullYear(tableauRes[13].substr(6,4));
    dateDra.setHours(tableauRes[13].substr(11,2));
    dateDra.setMinutes(tableauRes[13].substr(14,2))

    var datePol = new Date()
    datePol.setDate(tableauRes[15].substr(0,2))
    datePol.setMonth(tableauRes[15].substr(3,2)-1)
    datePol.setFullYear(tableauRes[15].substr(6,4))
    datePol.setHours(tableauRes[15].substr(11,2))
    datePol.setMinutes(tableauRes[15].substr(14,2))

    var scanKit = new Kit(tableauRes[3],tableauRes[5],tableauRes[1],date18,dateDra,datePol)
    afterNewKitActions(scanKit)
}
function imprimer_page(elem, OT){
    var molding = new Molding(toolSap, date18LimTot, dateDraLimTot, datePolLimTot)
    molding.saveMolding()
    var nodeToCopy = document.getElementById('tableKit').innerHTML
    var mywindow = window.open("../public/printSheet.php","Fiche synthèse traçabilité")
    mywindow.onload = function() {
        mywindow.document.getElementById('tableauRecap2').innerHTML = nodeToCopy
        //mywindow.document.getElementsByClassName("deleteLine").style.display = "none"        

        var dateToday = new Date()
        var dateString = 'Date d\'enregistrement : ' + dateToday.getDate() + '/' + (dateToday.getMonth()+1) + '/' + dateToday.getFullYear() ;
        var tool = 'Outillage : OT0' + toolSap
        var moldingId = 'ID du moulage : ' + molding.idMolding

        var divTool = mywindow.document.getElementById('tool')
        var divMoldingDate = mywindow.document.getElementById('moldingDate')
        var divMoldingId = mywindow.document.getElementById('moldingId')

        divTool.innerHTML = tool
        divMoldingDate.innerHTML = dateString
        divMoldingId.innerHTML = moldingId 
        mywindow.print()
    }
}
function CheckDataIndex(Chaine,TbIndex,Sep){
    var DatasQR="";
    for (var i = 0; i < TbIndex.length; i++) {
        var Pos1=Chaine.indexOf(TbIndex[i])+TbIndex[i].length;
        if (i == TbIndex.length-1){
            var Pos2=5;
        } else {
            var Pos2=(Chaine.indexOf(TbIndex[i+1])-Chaine.indexOf(TbIndex[i]))-TbIndex[i].length;
        }
        var Val=Chaine.substr(Pos1, Pos2);
        var DatasQR=DatasQR+TbIndex[i]+ Val+ Sep;
      }
    return DatasQR;
}
