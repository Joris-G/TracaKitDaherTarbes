<form id="divScan">
    <textarea class='hidden' id='kitInput' onkeypress="return scanAction(event)"></textarea>
    <input type="button" id="btnScan" value="SCAN ACTIF"></button>
</form>
    <div id="printable" style="display: none;">

        <table id="tableauRecap">
            <thead>
                <tr>
                    <th>Référence kit</th>
                    <th>Numéro d'OF</th>
                    <th>Date de péremption à -18°C</th>
                    <th>Date limite de drapage</th>
                    <th>Date limite polymérisation</th>
                    <th class="deleteLine" id="deleteLine">Supprimer</th>
                </tr>
            </thead>

            <tbody id="tbody"></tbody>

            <tfoot>
                <tr>
                    <th colspan="2" scope="row">Dates limites globales</th>
                    <td id="tfDate18"></td>
                    <td id="tfDateDra"></td>
                    <td id="tfDatePol"></td>
                </tr>
            </tfoot>
        </table>

        <!-- Ajouter un kit en manuel -->
        <form>
            <div class="title">Ajout manuel d'un kit</div>
            <div class="lblInput">
                <label for="desArticle">Article</label>
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

        <input id="impression" name="impression" type="button" onclick="imprimer_page('tableauRecap','OT098525')" value="Imprimer cette page" />
    </div>

    
