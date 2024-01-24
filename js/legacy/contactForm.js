export function contactHandle(formid){
    const form = document.getElementById(formid);
    //console.log(form);
    const formAcceptance = form.querySelector('.acceptance-checkbox');
    const submit = form.querySelector('button[type="submit"]');
    let isAccepted = false;
    formAcceptance.addEventListener('change', function(){
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
        

        const formattedFormData = {
            name: form.form_name.value,
            nickname: form.form_nickname.value,
            email: form.form_email.value,
            object: form.form_object.value,
            message: form.form_message.value,
            acceptance: isAccepted,
            time: performance.now() 
        }
        //postData(formattedFormData);
       console.log(formattedFormData);
    });
}