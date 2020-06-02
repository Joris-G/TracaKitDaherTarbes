var tbl = document.getElementById('tableauRecap');
var divTbl = document.getElementById('printable');
var username = document.getElementById('user').innerHTML;
var idKitTable = new Array();

function displayKitOnTable(kit){
    divTbl.style.display= null;
    var expired = false;
    // creates a table row
    var row = document.createElement("tr");
    for (var j = 0; j <= 5; j++) {
    // Create a <td> element and a text node, make the text
    // node the contents of the <td>, and put the <td> at
    // the end of the table row
        var cell = document.createElement("td");
        var result = function(j){
            let result1="";
            switch (j) {
                case 0:
                    result1 = kit.refSap;
                    break;
                case 1:
                    result1 = kit.workOrder;
                    break;
                case 2:
					console.log(kit);
                    var jour = kit['shelfLifeDate'].getDate();
                    var mois = kit['shelfLifeDate'].getMonth()+1;
                    var annee = kit['shelfLifeDate'].getFullYear();
                    var heure = kit['shelfLifeDate'].getHours();
                    var minute = kit['shelfLifeDate'].getMinutes();
                    result1 = jour + '-' + mois + '-' + annee + ' à  ' + heure + ':' + minute;
                    if(kit['shelfLifeDate'] < Date.now()){
                    expired = true;
                    }
                    break;
                case 3:
                    var jour = kit['layUpLimDate'].getDate();
                    var mois = kit['layUpLimDate'].getMonth()+1;
                    var annee = kit['layUpLimDate'].getFullYear();
                    var heure = kit['layUpLimDate'].getHours();
                    var minute = kit['layUpLimDate'].getMinutes();
                    result1 = jour + '-' + mois + '-' + annee + ' à ' + heure + ':' + minute;
                    if(kit['layUpLimDate'] < Date.now()){
                    expired = true;
                    }
                    break;
                case 4:
                    var jour = kit['curingLimDate'].getDate();
                    var mois = kit['curingLimDate'].getMonth()+1;
                    var annee = kit['curingLimDate'].getFullYear();
                    var heure = kit['curingLimDate'].getHours();
                    var minute = kit['curingLimDate'].getMinutes();
                    result1 = jour + '-' + mois + '-' + annee + ' à  ' + heure + ':' + minute;
                    if(kit['curingLimDate'] < Date.now()){
                    expired = true
                    }
                    break
                    case 5:
                        //alert(kit.kitId)
                default:
                    alert('case défaut')
                    break                   
            }
            return result1
        };
        if (j==5){
            //alert(kit.kitId)
            var cellText = document.createElement("button");
            cellText.className = "deleteLine"
            cellText.innerHTML = "Supprimer"
            cellText.addEventListener ("click", function() {
                var xmlhttp = new XMLHttpRequest()
                xmlhttp.open("GET",'../scriptPhp/unvalidateKitScript.php?id=' + kit.kitId,true)
                xmlhttp.send()
                oTr = cellText.parentNode.parentNode
                oTr.remove()
            })
        }else{
            var cellText = document.createTextNode(result(j))  
        }
        cell.appendChild(cellText)
        row.appendChild(cell)
        if (expired==true){
            cell.style.background = "red"
            cell.style.border = "solid 1px red"
        }
    }
    var tblBody = document.getElementById('tbody')
    // add the row to the end of the table body
    tblBody.appendChild(row)
    
            // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "1")

    var tfDate18 = document.getElementById('tfDate18')
    var tfDateDra = document.getElementById('tfDateDra')
    var tfDatePol = document.getElementById('tfDatePol')

    tfDate18.innerHTML = date18LimTot.getDate() + '-' + (date18LimTot.getMonth()+1) + '-' + date18LimTot.getFullYear() + ' à ' + date18LimTot.getHours() + ':' + date18LimTot.getMinutes();
    tfDateDra.innerHTML = dateDraLimTot.getDate() + '-' + (dateDraLimTot.getMonth()+1) + '-' + dateDraLimTot.getFullYear() + ' à ' + dateDraLimTot.getHours() + ':' + dateDraLimTot.getMinutes();
    tfDatePol.innerHTML = datePolLimTot.getDate() + '-' + (datePolLimTot.getMonth()+1) + '-' + datePolLimTot.getFullYear() + ' à ' + datePolLimTot.getHours() + ':' + datePolLimTot.getMinutes();
}
var btnScan = document.getElementById('btnScan');
if(btnScan)   {
    btnScan.addEventListener('click', focusTxtArea)
}
var $inputKit = document.getElementById('kitInput');
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
    $inputKit.focus();
}

function scanAction (event){
    if (event.keyCode === 13) {
    var kit = traitementDouchette($inputKit.value);
    displayKitOnTable(kit);
    $inputKit.value = '';
    focusTxtArea()
    }
}

var dateFictive = new Date(2099,1,1);
var date18LimTot = dateFictive;
var dateDraLimTot = dateFictive;
var datePolLimTot = dateFictive;

function traitementDouchette(){
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

    if(date18 < date18LimTot){date18LimTot = date18}
    if(dateDra < dateDraLimTot){dateDraLimTot = dateDra}
    if(datePol < datePolLimTot){datePolLimTot = datePol}


    var kit = new Kit(tableauRes[3],tableauRes[1],date18,dateDra,datePol)
    kit.registerInBase(toolSap,1)
    idKitTable.push(kit.kitId)
    return kit
}
// TraitementDouchette["__class"] = "TraitementDouchette";

// function imprimer(divName) {
//     var printContents = document.getElementById(divName).innerHTML;    
//  var originalContents = document.body.innerHTML;      
//  document.body.innerHTML = printContents;     
//  window.print();     
//  document.body.innerHTML = originalContents;
//  }

function imprimer_page(elem, OT){
    var molding = new Molding(toolSap, date18LimTot, dateDraLimTot, datePolLimTot)
    molding.saveMolding()
     nodeToCopy = document.getElementById('tableauRecap').innerHTML
     var mywindow = window.open("../public/printSheet.php","Fiche synthèse traçabilité")
     mywindow.onload = function() {
         mywindow.document.getElementById('tableauRecap2').innerHTML = nodeToCopy
         //mywindow.document.getElementById('tableauRecap2').innerHTML
         mywindow.document.getElementsByClassName("deleteLine").style.display = "none"
        //  function deleteCol(el,n){
        //      var r=(typeof el==='string'?document.getElementById(el):el).rows,i=r.length;
        //      while(i--){
        //          r[i].deleteCell(n);
        //     }
        // }
        // deleteCol("deleteLine")


    //     //var title = 'feuille de traçabilité';
         var dateToday = new Date()
         var dateString = 'Date d\'enregistrement : ' + dateToday.getDate() + '/' + (dateToday.getMonth()+1) + '/' + dateToday.getFullYear() ;
         var tool = 'Outillage : OT0' + toolSap
         var compagnon = 'Moulé par : ' + username
         var moldingId = 'ID du moulage : ' + molding.idMolding

    //     //var divTitle = mywindow.document.getElementById('title');
         var divTool = mywindow.document.getElementById('tool');
         var divCompagnon = mywindow.document.getElementById('compagnon');
         var divMoldingDate = mywindow.document.getElementById('moldingDate');
         var divMoldingId = mywindow.document.getElementById('moldingId');

    //     //divTitle.innerHTML = title;
         divTool.innerHTML = tool;
         divCompagnon.innerHTML = compagnon;
         divMoldingDate.innerHTML = dateString;
         divMoldingId.innerHTML = moldingId;


    }
}

   // mywindow.print();

    //WebBrowser.ExecWB(6,2,3,0);

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
