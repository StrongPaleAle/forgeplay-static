export function formHandle(formid){
    const form = document.getElementById(formid);
    //console.log(form);
    const acceptance = form.querySelector('input#form_acceptance');
    const submit = form.querySelector('button[type="submit"]');

    acceptance.addEventListener('change', function(){
        console.log('acceptance');
        if(this.checked){
            submit.removeAttribute('disabled');
        } else {
            submit.setAttribute('disabled', 'disabled');
        }
    });

    
    submit.addEventListener('click', function(event){
        event.preventDefault();
        /*
        * There is no shortcut like with 'new FormData(this)', we need
        * to construct the form-object ourselves. We are creating a regular
        * object instead of a FormData-object. `this` refers to the form,
        * we could also write: form.username.value and form.favorite_number.value
        */
        const formattedFormData = {
            name: form.form_name.value,
            nickname: form.form_nickname.value,
            email: form.form_email.value,
            object: form.form_object.value,
            message: form.form_message.value,
            time: performance.now() 
        }
        postData(formattedFormData);
       console.log(formattedFormData);
    });

    async function postData(formattedFormData){
        /**
         * The request is still 'POST' but the $_GET variable
         * will get values too: 'name' and 'favorite_color'
         */
        const response = await fetch(
            'handle_form.php',
            {
                method: 'POST',
                /*
                * We also need to stringify the values, turn the
                * JavaScript object to a single string that is accepted
                * as JSON. So we are sending one string that contains
                * all our values
                */
                body: JSON.stringify(formattedFormData)
            }
        );
        const data = await response.text();
        console.log(data);
    }
}