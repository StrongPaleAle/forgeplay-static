export function alphaHandle(formid){
    const form = document.getElementById(formid);
    //console.log(form);
    const formGames = form.querySelector('.games-fieldset');
    const formGamesChecks = formGames.querySelectorAll('input[type="checkbox"]');
    



    const acceptance = form.querySelector('input#test_acceptance');
    const submit = form.querySelector('button[type="submit"]');
    let isAccepted = false;

    let formResult = document.getElementById('form_feedback');
    
    const feedbackTemplate = document.getElementById('form_feedback_template');

    formGamesChecks.forEach(function(checkbox){
        checkbox.addEventListener('change', function(){
            if(this.checked){
                this.parentNode.classList.add('checked');
            } else {
                this.parentNode.classList.remove('checked');
            }
            const checked = formGames.querySelectorAll('input[type="checkbox"]:checked');
            if(checked.length < 2){
                console.log('not maxed out');
                formGames.classList.remove('maxed-out');
            } else {
                formGames.classList.add('maxed-out');
            }
        });
    });
    

    acceptance.addEventListener('change', function(){
        //console.log('acceptance');
        if(this.checked){
            submit.removeAttribute('disabled');
            isAccepted = true;
        } else {
            submit.setAttribute('disabled', 'disabled');
            isAccepted = false;
        }
    });

    
    submit.addEventListener('click', function(event){
        event.preventDefault();
        if(!isAccepted){
            return;
        }
        const nickname = form.test_nickname.value;
        const email = form.test_email.value;
        const gamesChecked = formGames.querySelectorAll('input[type="checkbox"]:checked');
        const games = [];
        gamesChecked.forEach(function(game){
            games.push(game.value);
         });
        
        const formattedFormData = {
            nickname: nickname,
            email: email,
            games: games,
            acceptance: isAccepted
        }
        postData(formattedFormData);
        
    });

    function newFeedback(isSuccess, message){
        formResult.innerHTML = '';
        let formFeedback = feedbackTemplate.content.cloneNode(true);
        let feedbackBox = formFeedback.querySelector('.feedback-box');
        if(isSuccess){
            feedbackBox.classList.add('success');
        } else {
            feedbackBox.classList.add('error');
        }
        formFeedback.querySelector('.form_feedback_message').innerHTML = message;
        formResult.appendChild(formFeedback);
    }

    async function postData(formattedFormData){
        
        const response = await fetch(
            'handle_alphatest.php',
            {
                method: 'POST',
                
                body: JSON.stringify(formattedFormData)
            }
        );
        const data = await response.json();
        //console.log(data);
        
        newFeedback(data.success, data.message);
        
    }
}