export function alphaHandle(formid){
    const form = document.getElementById(formid);
    //console.log(form);
    const acceptance = form.querySelector('input#alpha_acceptance');
    const submit = form.querySelector('button[type="submit"]');
    let isAccepted = false;

    let formResult = document.getElementById('form_feedback');
    
    const feedbackTemplate = document.getElementById('form_feedback_template');

    
    

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
        const email = form.alpha_email.value;
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!regex.test(email)) {
            
            newFeedback(false, 'Please enter a valid gmail address');
            form.alpha_email.focus();
            return;
        } else {
        
        
            const formattedFormData = {
                email: email
            }
            postData(formattedFormData);
        //console.log(formattedFormData);
        }
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