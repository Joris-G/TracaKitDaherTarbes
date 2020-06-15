class Kit {
    constructor(refSap, desArticle, workOrder, shelfLifeDate, layUpLimDate, curingLimDate) {
        this.refSap = refSap
        this.desArticle = desArticle
        this.workOrder = workOrder
        this.shelfLifeDate = shelfLifeDate
        this.layUpLimDate = layUpLimDate
        this.curingLimDate = curingLimDate
        this.kitId = null
    }
    set refSap(ref){this._refSap = ref}
    get refSap(){return this._refSap}

    registerInBase(numOt, numMolding) {
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("txtHint").innerHTML = this.responseText;
          }
        };
        
        xmlhttp.open("GET",'../scriptPhp/BDDKitScript.php?of=' + this.workOrder + '&refSap=' + this.refSap + '&ot=' + numOt + '&dateDra=' + this.layUpLimDate.toISOString().slice(0, 19).replace('T', ' ') + '&datePol=' + this.curingLimDate.toISOString().slice(0, 19).replace('T', ' ') + '&date18=' + this.shelfLifeDate.toISOString().slice(0, 19).replace('T', ' '),true);
        xmlhttp.onload = () => {
          if (xmlhttp.status >= 200 && xmlhttp.status < 400){
            this.kitId= xmlhttp.responseText
          }
        }
        xmlhttp.send()

    }
    
}
function displayKitDate(date){
  var jour = date.getDate()
  var mois = date.getMonth()+1
  var annee = date.getFullYear()
  var heure = date.getHours()
  var minute = date.getMinutes()
  var formatDate = jour + '-' + mois + '-' + annee + ' à  ' + heure + ':' + minute
  console.log(formatDate)
  return formatDate
}
function expired(date){
  if(date < Date.now()){
    console.log('exp vrai')
    return true; 
  }else{
    console.log('exp faux')
    return false
  }
}
