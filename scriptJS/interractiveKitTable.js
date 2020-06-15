var thead = document.createElement('thead')
var tableKit = document.getElementById('tableKit')
var tbody = document.createElement('tbody')
var tfoot = document.createElement('tfoot')
var dateFictive = new Date(2099,1,1)
var date18LimTot = dateFictive
var dateDraLimTot = dateFictive
var datePolLimTot = dateFictive
var tfDate18
var tfDateDra
var tfDatePol

function createKitTable(){
    createHeader(tableKit)
    tableKit.appendChild(tbody)
    createFooter(tableKit)
}

function addRow(kit){
    
    var thisKit = [
        kit.refSap,
        kit.desArticle,
        kit.workOrder,
        kit.shelfLifeDate,
        kit.layUpLimDate,
        kit.curingLimDate
    ]
        expired(kit.curingLimDate)
        expired(kit.shelfLifeDate)
        expired(kit.layUpLimDate)

    var trKit = document.createElement('tr')//On créé la ligne du kit
    thisKit.forEach(element => {
        var tabCell = document.createElement("td")//On créé une cellule pour chaque valeur de kit       
        if(isValidDate(element)){
            tabCell.innerHTML = displayKitDate(element)
            if(expired(element)){
                alert("Le kit est périmé.\nVeuillez alerter un inspecteur qualité\n\nBientôt mail auto à l'inspecteur qualité")
                tabCell.style.background = 'rgb(230,0,50)'
                tabCell.style.borderRadius = '10px'
            }
        }else{
            tabCell.innerHTML = element//On rempli la cellule
        }
        
        trKit.appendChild(tabCell)
        });
    var tabCell = document.createElement("td")//On créé une cellule pour chaque valeur de kit
    var image = new Image(30,25);
    image.src = 'src/img/poub_daher_blanc-03'
    tabCell.id = 'btn'
    tabCell.appendChild(image)
    tabCell.classList.add('cellInvisible')
    tabCell.onclick = function(){
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.open("GET",'../scriptPhp/unvalidateKitScript.php?id=' + kit.kitId,true)
        xmlhttp.send()
        rowToDelete = this.parentNode//.parentNode
        rowToDelete.remove()
        idKitTable.splice(idKitTable.indexOf(kit.kitId), 1)
        updateGlobalDates(kit)
    }
    tabCell.onmouseover = function(){
        this.style.background = "red"
    }
    tabCell.onmouseout = function(){
        this.style.background = null
    }
    trKit.appendChild(tabCell)
    trKit.onmouseover = function(){
      var rowIdOverCell = this.rowIndex //var numéro de la ligne cliquée
      var overRow = tableKit.rows[rowIdOverCell]
      var cellToDisplay = overRow.cells[6]
      cellToDisplay.classList.remove('cellInvisible')
    }
    trKit.onmouseout = function(){
      var rowIdOverCell = this.rowIndex //var numéro de la ligne cliquée
      var overRow = tableKit.rows[rowIdOverCell]
      var cellToDisplay = overRow.cells[6]
      cellToDisplay.classList.add('cellInvisible')
    }
    tbody.appendChild(trKit)
}

function createHeader(tableDOM){
    tableDOM.appendChild(thead)
    var jsonHeader = ["Article", "Désignation", "Of", "Date péremption à -18°C", "Date limite de drapage", "Date limite de polymérisation"]

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
  var tr = document.createElement('tr')                 // On créé une ligne pour le header.
  for (var i = 0; i < jsonHeader.length; i++){
    var th = document.createElement("th")               //On  créé une cellule pour chaque valeur
     // TABLE HEADER.
    th.innerHTML = jsonHeader[i]
    tr.appendChild(th)                                  //On ajoute la cellule à la ligne
  }
  thead.appendChild(tr)                                 //On ajoute la ligne dans le header
}

function deleteRow(){

}
function updateGlobalDates(kit){
    if(idKitTable.length ==0 ){ //Si il n'y a plus de kit dans le tableau
        //tableKit.removeChild(tfoot)
        tfDate18.innerHTML = ""
        tfDateDra.innerHTML = ""
        tfDatePol.innerHTML = ""
        date18LimTot = dateFictive
        dateDraLimTot = dateFictive
        datePolLimTot = dateFictive
    }else{
        if(!tfoot.hasChildNodes()){//Si le footer n'existe pas
            createFooter(tableKit)
        }

        if(kit.shelfLifeDate < date18LimTot){date18LimTot = kit.shelfLifeDate}
        if(kit.layUpLimDate < dateDraLimTot){dateDraLimTot = kit.layUpLimDate}
        if(kit.curingLimDate < datePolLimTot){datePolLimTot = kit.curingLimDate}
        
        tfDate18.innerHTML = date18LimTot.getDate() + '-' + (date18LimTot.getMonth()+1) + '-' + date18LimTot.getFullYear() + ' à ' + date18LimTot.getHours() + ':' + date18LimTot.getMinutes();
        tfDateDra.innerHTML = dateDraLimTot.getDate() + '-' + (dateDraLimTot.getMonth()+1) + '-' + dateDraLimTot.getFullYear() + ' à ' + dateDraLimTot.getHours() + ':' + dateDraLimTot.getMinutes();
        tfDatePol.innerHTML = datePolLimTot.getDate() + '-' + (datePolLimTot.getMonth()+1) + '-' + datePolLimTot.getFullYear() + ' à ' + datePolLimTot.getHours() + ':' + datePolLimTot.getMinutes();
    }
}
function createFooter(tableDOM){
    var jsonFooter = ["Date péremption à -18°C", "Date limite de drapage", "Date limite de polymérisation"]
    tfoot.id = 'tfoot'
    var tr = document.createElement('tr')                 // On créé une ligne pour le footer.
    var thFooter = document.createElement('th')
    thFooter.setAttribute('colspan',3)
    thFooter.innerHTML = "Dates limites globales"
    tr.appendChild(thFooter)

    var tf = document.createElement("td")               //On  créé une cellule pour chaque valeur
    tf.innerHTML = jsonFooter[0]
    tf.id = 'tfDate18'
    tr.appendChild(tf)
                                      //On ajoute la cellule à la ligne
    tf = document.createElement("td")               //On  créé une cellule pour chaque valeur
    tf.innerHTML = jsonFooter[1]
    tf.id = 'tfDateDra'
    tr.appendChild(tf)
    tf = document.createElement("td")               //On  créé une cellule pour chaque valeur
    tf.innerHTML = jsonFooter[2]
    tf.id = 'tfDatePol'
    tr.appendChild(tf)
    tfoot.appendChild(tr)
    tableDOM.appendChild(tfoot)
    tfDate18 = document.getElementById('tfDate18')
    tfDateDra = document.getElementById('tfDateDra')
    tfDatePol = document.getElementById('tfDatePol')
}
function isValidDate(dateTest){
    var test = new Date(dateTest)
    return !isNaN(test.getDate());
}