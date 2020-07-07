var username = document.getElementById('username').innerHTML
//var matricule = document.getElementById('matricule').innerHTML
var btnPrintUser = document.getElementById('print')
var btnPrintAllUsers = document.getElementById('printAll')
var qrCodeDOM = document.getElementById("qrcode")
/*var qrCode = new QRCode(qrCodeDOM,{
    text: matricule,
    width: 80,
    height: 80,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel : QRCode.CorrectLevel.L 
})
*/
var printWindow
var divContent = document.getElementById('content')

class User{
    constructor(lastname,surname,role){
        this.lastname = lastname
        this.surname = surname
        this.role = role
    }
}
function getUser(matricule){
    var xmlhttprequest = new XMLHttpRequest()
    xmlhttprequest.open("GET",'../scriptPhp/getUserScript.php?matricule=' + matricule,true);
    xmlhttprequest.send()
    xmlhttprequest.onload = () => {
        var result = JSON.parse(xmlhttprequest.responseText)
        console.log(result)
        var user = new User(result['NOM'],result['PRENOM'],result['ROLE'])
        console.log(user)
        return user
    }
}
/*btnPrintUser.addEventListener('click', function(){
    var nodeToCopy = document.getElementById('qrcode')
    printWindow = window.open('../public/printUserQrCode.php',"QRCode",true)
    printWindow.onload = function(){
        var divContent = printWindow.document.getElementById('content')
        var divName = printWindow.document.getElementById('name')
        divName.innerHTML = username
        divContent.appendChild(nodeToCopy)
    }
})
var btnPrintAll = document.createElement('button')
btnPrintAllUsers.addEventListener('click', function(){
    //test Role
    var role = document.getElementById('role').innerHTML
    console.log(role)
    if(role == "Admin"){
        if(btnPrintAll.innerHTML == ''){      
            btnPrintAll.innerHTML='Imprimer'
            btnPrintAll.addEventListener('click',printAll)
            divContent.appendChild(btnPrintAll)
            divContent.style.flexDirection = 'column'
            divContent.style.textAlign = 'center'
            displayAllUsers(404)
        }
    }
})

function displayAllUsers(teamNumber){
    var tableOfUsers = document.createElement('table')
    var oHeader = document.createElement('thead'), 
        oBody = document.createElement('tbody')

    //Creation header
    var headerElements = ["NOM", "PRENOM", "MATRICULE", "ROLE"]
    for (var index = 0; index < (headerElements.length+1); index++) {
        var newCell = document.createElement('th')
        if(index<headerElements.length){
            var cellValue = headerElements[index]
            newCell.innerHTML = cellValue
        }else{
            var caseAcocher = document.createElement('input')
            caseAcocher.setAttribute("type", "checkbox")
            caseAcocher.id='cocheTout'
            newCell.appendChild(caseAcocher)
            caseAcocher.addEventListener('click', function(){
                var toutesLesCoches = document.querySelectorAll('.coche')              
                toutesLesCoches.forEach(function(currentValue, currentIndex, listObj){
                    currentValue.checked = caseAcocher.checked  
                },'myThisArg')
            })
        }
        oHeader.appendChild(newCell)
    }
    //Ajout des valeurs au tBody
    var dataCells= []
    var xmlHttRequest = new XMLHttpRequest()
    xmlHttRequest.open("GET",'../scriptPhp/showUsersScript.php?team=' + teamNumber,true);
    xmlHttRequest.send()
    xmlHttRequest.onload = () => {
        if (xmlHttRequest.status >= 200 && xmlHttRequest.status < 400){
            dataCells = JSON.parse(xmlHttRequest.responseText)
            //On créé une ligne pour chaque élément du tableau
            for(var i=0; i<dataCells.length;i++){
                var trUser = document.createElement('tr')
                //On créé une cellule pour chaque valeur
                for(var y=0;y<(headerElements.length+1);y++){
                    var tdUser = document.createElement('td')
                    if(y<headerElements.length){
                        tdUser.innerHTML = dataCells[i][headerElements[y]]
                    }else{
                        var caseAcocher = document.createElement('input')
                        caseAcocher.setAttribute("type", "checkbox")
                        caseAcocher.classList.add('coche')
                        tdUser.appendChild(caseAcocher)
                    }
                    trUser.appendChild(tdUser)
                }
                oBody.appendChild(trUser)
            }
            tableOfUsers.appendChild(oHeader)
            tableOfUsers.appendChild(oBody)
            divContent.appendChild(tableOfUsers)
        }

    }  
}
// new QRCode(document.getElementById("qrcode"), {text : matricule,width:128,height:128});
//qrCode.makeCode(matricule)

var user = new User("GRANGIER","Joris", "Admin")
user.displayUser()

var divScan = document.getElementById('divScan')

// var scanner = new Html5Qrcode(divScan,false)
// scanner.

function printAll(){
    var arrayOfUsersParam = []
    var selectedUsers = document.querySelectorAll('.coche')
    selectedUsers.forEach(function(currentValue, currentIndex, listObj){
        if(currentValue.checked == true){
            var ligneComplete = currentValue.parentNode.parentNode
            var matricule = ligneComplete.childNodes[2].innerHTML
            var NomPrenom = ligneComplete.childNodes[0].innerHTML + ' ' + ligneComplete.childNodes[1].innerHTML
            arrayOfUsersParam.push([matricule,NomPrenom])
        }  
    },this)
    mywindow = window.open("../public/printAllUserSheet.php","Impression de tous les utilisateurs sélectionnés")
    mywindow.onload = function() {
        arrayOfUsersParam.forEach(function(currentValue, currentIndex, listObj){
            var matricule = currentValue[0]
            var nameOfUser = currentValue[1]
            var divNom = document.createElement('div')
            divNom.innerHTML = nameOfUser
            divNom.classList.add('name')
            var divQrCode = document.createElement('div')
            divQrCode.classList.add('qrCode')
            new QRCode(divQrCode,{
                text: matricule,
                width: 100,
                height: 100,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel : QRCode.CorrectLevel.L 
            })
            var divContent = mywindow.document.getElementById('divContent')
            var divUser = document.createElement('div')
            divUser.classList.add('user')
            divUser.appendChild(divNom)
            divUser.appendChild(divQrCode)
            divContent.appendChild(divUser)
        })
        
        
    }
}*/