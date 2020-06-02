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
                    return acc + '<option value="' + option.toolSap + '">' + option.label + '</option>';
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
class LaunchScan{
    
    constructor($select)  {
        this.$select = $select;
        this.onChange = this.onChange.bind(this);
        this.$select.addEventListener('change', this.onChange);
    }

    onChange(e){
        let divRecap = document.getElementById('toolChoiced');
        var liste;
        
        
        liste = document.getElementById("tool");
        toolSap = liste.options[liste.selectedIndex].value;
        //divRecap.innerHTML = `Outillage : ${toolSap}`;
        $inputKit.focus();
        
    }
}

let $selectProgram = document.querySelectorAll('.programs');
let $selectTool = document.querySelectorAll('.tools');


$selectProgram.forEach(function ($select){
    new LinkedSelectTools($select);
});

$selectTool.forEach(function ($select){
    new LaunchScan($select);
});
