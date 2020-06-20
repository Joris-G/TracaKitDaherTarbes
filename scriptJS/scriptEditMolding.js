var divIdMolding = document.getElementById('idMolding')
var btnChangeTool = document.getElementById('btnChangeTool')
var headerValues = []
//Message au chargement de la page
var idMoldingToEdit = prompt("Veuiller entrer le numéro de moulage à modifier", "")
//Si l'id de moulage est vide ou null retourne sur la page d'index
if (idMoldingToEdit == null || idMoldingToEdit == "") {
  window.location.href="index.php"
}else{
displayEditingMolding()
}
//initialisation de la page
function displayEditingMolding(){
  var textIdMolding = document.getElementById('idMolding')
  textIdMolding.innerHTML = "Id de moulage : " + idMoldingToEdit

  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open("GET",'../scriptPhp/getMoldingSettingsByMoldingId.php?moldingId=' + parseInt(idMoldingToEdit),true);
  xmlhttp.onload = () => {
    if (xmlhttp.status >= 200 && xmlhttp.status < 400){
      var dataMolding = JSON.parse(xmlhttp.responseText)
      divTool.innerHTML = "Outillage : " + dataMolding[0]['Outillage']
      

      // ,dataMolding[0]['DateDePeremptionA-18C'],dataMolding[0]['DateLimiteDeDrapage'], dataMolding[0]['DateLimiteDePolymerisation'])
    }
  }
  xmlhttp.send()
  var divContainer = document.getElementById("kitTable");
  
  if(divContainer.childNodes.length == 0){
    showKits(idMoldingToEdit)
  }
  
  
}
function editToolMenu(){
  var divToolChoice = document.getElementById("toolChoice")
  divToolChoice.style.display="block"
}
function editKitMenu(){

  divKitTable.style.display="block"
  showKits(idMoldingToEdit)
}
function showKits(idMoldingToEdit){
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      }
  }   
  xmlhttp.open("GET",'../scriptPhp/listKitsByMoldingId.php?moldingId=' + parseInt(idMoldingToEdit),true);
      xmlhttp.onload = () => {
          if (xmlhttp.status >= 200 && xmlhttp.status < 400){
            var data = JSON.parse(xmlhttp.responseText)
            kitTable = document.createElement('TABLE')
            kitTable.id = "tableEditMolding"
            populateHeader(data,kitTable)
            populateRows(data,kitTable)
            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("kitTable");
            divContainer.innerHTML = "";
            divContainer.appendChild(kitTable);
          }                     
      }
  xmlhttp.send()
}
function populateHeader(jsonData, tableDOM){
  tableDOM.appendChild(thead)

  for (var i = 0; i < jsonData.length; i++){
    for (var key in jsonData[i]){
      if (headerValues.indexOf(key) === -1){
        headerValues.push(key)
      }
    }
  }
  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
  var tr = document.createElement('tr')                 // TABLE ROW.
  for (var i = 1; i < headerValues.length; i++){
    var th = document.createElement("th")
     // TABLE HEADER.
    th.innerHTML = headerValues[i]
    tr.appendChild(th)
    thead.appendChild(tr)
  }
}
function populateRows(jsonData, tableDOM){

// ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 1; i < jsonData.length; i++){
    var tr1 = document.createElement('tr')
    
    
    tr1.onmouseover = function(){
      
      var rowIdOverCell = this.rowIndex //var numéro de la ligne cliquée
      var overRow = tableDOM.rows[rowIdOverCell]
      var cellToDisplay = overRow.cells[6]
      cellToDisplay.classList.remove('cellInvisible')
    }
    tr1.onmouseout = function(){
      var rowIdOverCell = this.rowIndex //var numéro de la ligne cliquée
      var overRow = tableDOM.rows[rowIdOverCell]
      var cellToDisplay = overRow.cells[6]
      cellToDisplay.classList.add('cellInvisible')
    }
    for (var j = 1; j < headerValues.length+2; j++){
      var tabCell = tr1.insertCell(-1)
      //On ajoute les valeurs pour chaque entête du JSON
      if (j < headerValues.length ){
        tabCell.innerHTML = jsonData[i][headerValues[j]]
      }
      //Pour les deux dernières colonne on ajoute des logos clicables
      else{
        var image = new Image(30,25);
        image.src = 'src/img/poub_daher_blanc-03'
        tabCell.id = 'btn'
        tabCell.appendChild(image)
        tabCell.classList.add('cellInvisible')
        tabCell.onclick = function(){
          var rowId = this.parentNode.rowIndex
          deleteKit(jsonData[rowId].value)
          alert("Bébé je t'aime fort et je te remercie d'avoir fait à manger.\n J'aimerai aussi te faire un bisous là maintenant si tu le veux bien aussi.")
        }
        tabCell.onmouseover = function(){
          this.style.background = "red"
        }
        tabCell.onmouseout = function(){
          this.style.background = null
        }

      }
      
      
      tr1.appendChild(tabCell)        
        
        //var rowSelected = tableDOM.getElementsByTagName('tr')[rowId];
        // msg = "L'OF sélectionné est : " + rowSelected.cells[0].innerHTML;
        // msg += '\nVous souhaitez modifier : ' + this.innerHTML;
        // msg += "\n" + this.cellIndex
        // msg += "\nL'ID moulage : " + jsonData[rowId].value
        // alert(msg);
      }
    
    tbody.appendChild(tr1)
  }
tableDOM.appendChild(tbody)
}