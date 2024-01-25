import { formPostData } from './formPostData';
import { formFeedback } from './formFeedback';

export function formHandle(formid, model, handler){
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
        if(!isAccepted){
            //console.log('not accepted');
            return;
        }

        const formattedFormData = {acceptance: isAccepted, time: performance.now()}
        for (const [key, value] of Object.entries(model)){
            let fieldValue = form[value] ? form[value].value : value;
            formattedFormData[key] = fieldValue
        }
        //postData(formattedFormData);
       //console.log(formattedFormData);
       formPostData(formattedFormData, handler).then((data) => {
            //console.log(data);
            formFeedback(form, data);
        });
    });

    
}