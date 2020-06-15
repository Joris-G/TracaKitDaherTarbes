<form id="divScan">
    <textarea class='hidden' id='kitInput' onkeypress="return scanAction(event)"></textarea>
    <input type="button" id="btnScan" value="SCAN ACTIF"></button>
</form>
<!-- Ajouter un kit en manuel -->
<form id ="divManu">
            <div class="title2">Ajout manuel d'un kit</div>
            <div class="lblInput">
                <label for="articleSap">Article SAP</label>
                <input id="articleSap" type="text" name="articleSap">
            </div>
            <div class="lblInput">
                <label for="desArticle">Désignation Kit</label>
                <input id="desArticle" type="text" name="desArticle">
            </div>
            <div class="lblInput">
                <label for="workOrder">Numéro d'OF</label>
                <input id="workOrder" type="text" name="workOrder">
            </div>
            <div class="lblInput">
                <label for="pickerDate18">Date de péremption à -18°C</label>
                <input id="pickerDate18" type="datetime-local" name="pickerDate18">
            </div>
            <div class="lblInput">
                <label for="pickerDateDra">Date limite de drapage</label>
                <input id="pickerDateDra" type="datetime-local" name="pickerDateDra">
            </div>
            <div class="lblInput">
                <label for="pickerDatePol">Date limite de polymérisation</label>
                <input id="pickerDatePol" type="datetime-local" name="pickerDatePol">
            </div>
            <div class="lblInput">
                <input id="btnAddKitManualMode" type="button" name="btnAddKit" value="AJOUTER">
            </div>
        </form>
    <div class="kitTable" id="printable" style="display: none;">
        <table id="tableKit">
            <tbody id="tbody"></tbody>
        </table>
        <input id="impression" name="impression" type="button" onclick="imprimer_page('tableauRecap','OT098525')" value="Imprimer cette page" />
    </div>

    
