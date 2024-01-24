
import {formHandle} from './index.js';
export function alphaHandle(formId){
    const form = document.getElementById(formId);
    const games = [];
    const formGames = form.querySelector('.games-fieldset');
    const formGamesChecks = formGames.querySelectorAll('input[type="checkbox"]');
    formGamesChecks.forEach(function(checkbox){
        checkbox.addEventListener('change', function(){
            if(this.checked){
                this.parentNode.classList.add('checked');
                games.push(this.value);
            } else {
                this.parentNode.classList.remove('checked');
                games.splice(games.indexOf(this.value), 1);
            }
            if(games.length < 2){
                console.log('not maxed out');
                formGames.classList.remove('maxed-out');
            } else {
                formGames.classList.add('maxed-out');
            }
        });
    });
    const testModel = {
        nickname: 'test_nickname',
        email: 'test_email',
        games
        
    }
    formHandle(formId, testModel, 'handle_alpha.php');
    
}