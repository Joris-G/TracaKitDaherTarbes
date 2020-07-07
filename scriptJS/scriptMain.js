var divDay = document.getElementById('day')
var dateToday = new Date()
var divWorker = document.getElementById('worker')
var divToolChoice = document.getElementById('toolChoice')
var divInterractive = document.getElementById('interractiveTable')
var divNumberOfPart = document.getElementById('numberOfPart')
var numberOfPart
var mywindow, timerLogout
var divNumberOfMissingPart = document.getElementById('numberOfMissingPart')
var tbl = document.getElementById('tableauRecap')
var divKitTable =document.getElementById('tableKit')
var btnAddKitManualMode = document.getElementById('btnAddKitManualMode')
btnAddKitManualMode.addEventListener('click', addKitManualMode)
var idKitTable = new Array()
var divScan = document.getElementById("divScan")
var btnEdit = document.getElementById('edit')
btnEdit.addEventListener('click', editMoldingMode)
var title = document.getElementById('title')
var btnManual = document.getElementById("btnManuel")

btnManual.onclick = function(){
    btnOff(btnScan)
    btnOn(btnManual)
    divManu.style.display ='flex'
}
divMessage = document.createElement('div')
divMessage.innerHTML = 'SCAN ACTIF'
divMessage.classList.add('quick-msg')

initNewMolding()

function initNewMolding(){
    //startTimer()
    divDay.innerHTML = "Date de moulage : " + dateToday.getDate() + "/" + (dateToday.getMonth()+1) + "/" + dateToday.getFullYear()
    console.log("Nouveau Moulage lancé")
    if(mywindow){
        console.log(mywindow)
        mywindow = window.close
    }
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
        isValidDate(manuKitDate18.value) && 
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
            divManu.style.display = 'none'
            btnOff(btnManual)
    }else{
        alert('Veuiller remplir correctement tous les champs !!')
    }
    console.log("Le kit a été créé manuellement")
}
/**
 * 
 * @param {kit} Objet kit 
 */
function displayKitOnTable(kit){
    if (!divKitTable.hasChildNodes()) {
        console.log("Le tableau va être créé car il n'existe pas")
        createKitTable()
    }
    addRow(kit)
    divInterractive.style.display ='flex'
    console.log("Le kit est affiché dans le tableau !")
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
    btnOff(btnScan)
}
function focusScanAction(){
    btnOn(btnScan)
}
function focusTxtArea(){
    btnOff(btnManual)
    btnOn(btnScan)
    divManu.style.display = 'none'
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
    changeName(kit)
    console.log(kit)
    kit.registerInBase(toolSap,1)
    idKitTable.push(kit.kitId)
    displayKitOnTable(kit)
    updateGlobalDates(kit)
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
    console.log(scanKit)
    console.log("Le kit a été ajouté par le scanner")
}
function imprimer_page(elem, OT){
    var molding = new Molding(toolSap, date18LimTot, dateDraLimTot, datePolLimTot,idMoldingToEdit)
    saveMolding(molding)

    console.log("L'id de moulage après sauvegarde est : " + molding.idMolding)
    console.log(idKitTable)
    molding.associateMoldingIdToKits(idKitTable,molding)

    var nodeToCopy = document.getElementById('tableKit').innerHTML
    mywindow = window.open("../public/printSheet.php","Fiche synthèse traçabilité")
    mywindow.onload = function() {
    mywindow.document.getElementById('tableauRecap2').innerHTML = nodeToCopy
    var copiedTable = mywindow.document.getElementById('tableauRecap2')     
//Supprimer la colonne du bouton
console.log(copiedTable)
var oTbody = copiedTable.tBodies
console.log(oTbody)
var oNbTbody = oTbody.length
console.log(oNbTbody)
var iIndex = 6

for(var i = 0; i<oNbTbody;i++){
    var aTr = oTbody[i].children, iNbTr = aTr.length
    for(var h = 0;h<iNbTr;h++){
        console.log(aTr[h].children[iIndex])
        aTr[h].children[iIndex].remove()
    }
}
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
    setTimeout(function() {
        mywindow.print()
        window.location.href="../public/index.php"
      }, 100);
}   
    console.log("Les actions suivantes ont été effectuée : Impression effectué, enregistrement du moulage, association du numéro de moulage à tous les kits")
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
var divTool = document.getElementById('moldingTool')
divTool.onmouseover = function(){
    divTool.style.color="red"
  }
  divTool.onmouseout = function(){
    divTool.style.color = 'white'
  }
  divTool.onclick = function(){
    editToolMenu()
  }
  function editToolMenu(){
    divToolChoice.style.display='block'
    divKitTable.style.display='none'
  }
  var idMoldingToEdit
  function editMoldingMode(){
      var tableau = document.getElementById('tableKit')
    if(tableau.hasChildNodes()){
        var childs = tableau.childNodes
        childs.forEach(element => {
            tableau.removeChild(element)
        });
    }
      //Message au chargement de la page
    idMoldingToEdit = prompt("Veuiller entrer le numéro de moulage à modifier", "")
//Si l'id de moulage est vide ou null retourne sur la page d'index
    if (idMoldingToEdit == null || idMoldingToEdit == "") {
    //window.location.href="newMolding.php"
    }else{
    displayEditingMolding()
    }
    console.log("Lancement du mode modification de moulage")
  }
  
var divToolNumber = document.getElementById('toolNumber')

function displayEditingMolding(){
    divToolChoice.style.display ='none'
    divScan.style.display = 'block'
    divManu.style.display = 'inline-block'
    title.innerHTML = "Modifier le moulage " + idMoldingToEdit
    var textIdMolding = document.createElement('div')
    textIdMolding.className="sideBar-item"
    textIdMolding.id="moldingId"
    textIdMolding.innerHTML = "Id de moulage : " + idMoldingToEdit
  
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open("GET",'../scriptPhp/getMoldingSettingsByMoldingId.php?moldingId=' + parseInt(idMoldingToEdit),true);
    xmlhttp.onload = () => {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400){
            var dataMolding = JSON.parse(xmlhttp.responseText)
            toolSap = dataMolding[0]['Outillage']
            
            divToolNumber.innerHTML = "Outillage : OT0" + toolSap
            document.getElementById('editToolIcone').style.display= 'flex'
            if(divKitTable.childNodes.length == 0){
                showKits(idMoldingToEdit)
            }
        }
    }
    xmlhttp.send()
    console.log("Récupération et Affichage des kits à modifier")  
}
function showKits(idMoulage){
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open("GET",'../scriptPhp/listKitsByMoldingId.php?moldingId=' + parseInt(idMoulage),true);
    xmlhttp.onload = () => {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400){
            var data = JSON.parse(xmlhttp.responseText)
            console.log("Tentative d'ajout du kit : " + data[0]['value'])
            for (var index = 0; index < data.length; index++) {
                var id = data[index]['value']
                var refSap = data[index]['ARTICLE SAP']
                var des =data[index]['DESIGNATION']
                var of = data[index]['OF']
                var date18 =new Date(data[index]['DATE DE PEREMPTION A -18°C'])
                var dateDra = new Date(data[index]['DATE LIMITE DE DRAPAGE'])
                var datePol =new Date(data[index]['DATE LIMITE DE POLYMERISATION'])
                var newKit = new Kit(refSap,des,of,date18,dateDra,datePol,id)
                idKitTable.push(newKit.kitId)
                console.log("ajoute dans le tableau virtuel de kit")
                displayKitOnTable(newKit)
                updateGlobalDates(newKit)
                console.log("affiche des kits à modifier")                
            }
        }
    }                     
    xmlhttp.send()
    console.log("Affichage des kits à modifier")
}
function btnOn(btn){
    btn.classList.add('bouton-on')
    btn.classList.remove('bouton-off')
}
function btnOff(btn){
    btn.classList.remove('bouton-on')
    btn.classList.add('bouton-off')
}