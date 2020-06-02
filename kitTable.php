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
            <div>
                <label for="pickerDate18">Date de péremption à -18°C</label>
                <input id="pickerDate18" type="datetime-local" name="pickerDate18">
            </div>
            <div>
                <label for="pickerDateDra">Date limite de drapage</label>
                <input id="pickerDateDra" type="datetime-local" name="pickerDateDra">
            </div>
            <div>
                <label for="pickerDatePol">Date limite de polymérisation</label>
                <input id="pickerDatePol" type="datetime-local" name="pickerDatePol">
            </div>
        </form>

        <input id="impression" name="impression" type="button" onclick="imprimer_page('tableauRecap','OT098525')" value="Imprimer cette page" />
    </div>

    
