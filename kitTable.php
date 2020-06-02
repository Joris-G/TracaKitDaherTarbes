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
        <OBJECT ID="WebBrowser" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>
        <input id="impression" name="impression" type="button" onclick="imprimer_page('tableauRecap','OT098525')" value="Imprimer cette page" />
    </div>

    
