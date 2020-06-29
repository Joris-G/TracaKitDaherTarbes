var loginInput = document.getElementById('login')
var btnSubmit = document.getElementById('submit')
loginInput.focus()
document.addEventListener('click', function(event){
    if(event.srcElement == btnSubmit){
        console.log('do button action')
    }else{
        loginInput.focus()
        console.log('focus on text')
    }
})

function loginAction(event){
    if(event.keyCode === 13){
        btnSubmit.click()
        console.log('coucou')
    }
}






/*
 * Nous sommes dans le scope global,
 * aussi l'objet `keys` est accessible partout
 * dans le code à travers tous les fichiers JavaScript.
*/
var keys = {};
/*
 * Étant dans le code global,
 * `window.onkeydown` est identique à `this.onkeydown`
 * lui même identique à `onkeydown`.
 * On associe ci-dessous la même fonction lorsqu'une
 * touche est appuyée, et lorsqu'une touche est relachée.
*/
onkeydown = onkeyup = function (e) {
    /*
     * Si `e` n'existe pas,
     * nous somme probablement dans un vieux IE.
     * On affecte alors `event` à `e`.
     */
    e = e || event;
    /*
     * Si `e.which` n'existe pas,
     * On affecte alors l'alternative `e.keyCode` à `e.which`.
     */
    e.which = e.which || e.keyCode;
    /*
     * Si la fonction courante est executée,
     * quand une touche est enfoncée,
     * `e.type === 'keydown'` renverra `true`
     * sinon elle renverra `false`.
     * Il suffit alors d'assigner chaque état
     * dans le tableau `keys` pour chaque
     * touche `e.keyCode`.
     */
    keys[e.which] = e.type === 'keydown';
    /*
     * Cette zone sera exécutée lorsque les touches
     * Ctrl (17), Alt (18) et E (69)
     * seront enfoncée en même temps
     * car l'objet `keys` vaudra alors :
     * {
     *  17: true,
     *  18: true,
     *  69: true
     * }
     */
    if (keys[17] && keys[18] && keys[69]) {
      /*
       * Affichera dans la console (F12, onglet console)
       * le texte « Ctrl + Alt + E ».
       */
      console.log('Ctrl + Alt + E');
      loginInput.innerText = 204292
      btnSubmit.click()
      
    }
}
/*
 * Si l'on clique dans le navigateur...
 */
onclick = function () {
    /*
     * ...alors que les touches
     * Ctrl (17), Alt (16) et E (69)
     * sont appuyées...
     */
    if (keys[17] && keys[16] && keys[69]) {
        /*
         * ...on affichera dans la console
         * le texte « Ctrl + Alt + E ».
         */
        console.log('Ctrl + Shift + E');
    }
}
// window.addEventListener('keydown',actionsSecretes(event))

// function actionsSecretes(event){
//     if(ke)
// }