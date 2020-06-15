class LinkedSelectTools{
    
    constructor($select)  {
        this.$select = $select;
        this.onChange = this.onChange.bind(this);
        this.$target = document.querySelector(this.$select.dataset.target);
        this.$placeHolder = this.$target.firstElementChild;
        this.$select.addEventListener('change', this.onChange);
    }

    onChange(e){
        let request = new XMLHttpRequest();
        request.open('GET', this.$select.dataset.source.replace('$prog', e.target.value),true);
        //console.log(request.open('GET', this.$select.dataset.source.replace('$prog', e.target.value),true));
        request.onload = () => {
            if (request.status >= 200 && request.status < 400){
                var data = JSON.parse(request.responseText);
                console.log(data);
                let options = data.reduce(function (acc, option){
                    return acc + '<option id= "' + option.numberOfPart + '" value="' + option.toolSap + '">' + option.label + '</option>';
                },'');

                this.$target.innerHTML = options;
                this.$target.insertBefore(this.$placeHolder,this.$target.firstChild);
                this.$target.selectedIndex =0;
                this.$target.style.display = null;
                let toolStyleVisible = document.getElementById('tool');
                toolStyleVisible.style.display = 'inline-block';
            }else{}
        };
        
        request.onerror = function(){
            alert('Impossible de charger la liste on error');
        };
        request.send();
    }
}
var toolSap;
var divToolChoice = document.getElementById("toolChoice")
class LaunchScan{
    
    constructor($select)  {
        this.$select = $select;
        this.onChange = this.onChange.bind(this);
        this.$select.addEventListener('change', this.onChange);
    }

    onChange(e){
        var liste = document.getElementById("tool")
        toolSap = liste.options[liste.selectedIndex].value
        numberOfPart = liste.options[liste.selectedIndex].id
        divMoldingTool.innerHTML = "Outillage : OT0" + toolSap
        switch (document.getElementById("title").innerText){
            case 'Editer un moulage existant':
                editTool(idMoldingToEdit, toolSap)
                divToolChoice.style.display='none'
                displayEditingMolding()
                break
            case 'Nouveau moulage':
                divToolChoice.style.display = 'none'
                divScan.style.display = 'block'
                divManu.style.display = 'inline-block'
                $inputKit.focus()
                break
            default:
        }

        
        
        
    }
}

let $selectProgram = document.querySelectorAll('.programs')
let $selectTool = document.querySelectorAll('.tools')


$selectProgram.forEach(function ($select){
    new LinkedSelectTools($select)
})

$selectTool.forEach(function ($select){
    new LaunchScan($select)
})

function editTool(moldingId,newTool){
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    }   
    xmlhttp.open("GET",'../scriptPhp/editToolScript.php?id=' + moldingId + '&tool=' + newTool ,true);
        xmlhttp.onload = () => {
            if (xmlhttp.status >= 200 && xmlhttp.status < 400){
            }
        }
    xmlhttp.send()

}