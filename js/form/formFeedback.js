export function formFeedback(form, data){
    let formResult = form.querySelector('.form_feedback');
    formResult.innerHTML = '';

    let formFeedback = form.querySelector('.form_feedback_template').content.cloneNode(true);
    let feedbackBox = formFeedback.querySelector('.feedback-box');
    console.log(data);
    formFeedback.querySelector('.form_feedback_message').innerHTML = data.message;
    if (data.success) {
        feedbackBox.classList.add('success');
    } else {
        feedbackBox.classList.add('error');
        let list = form.querySelector('.error-list').content.cloneNode(true);
        data.errors.forEach(error => {
            let listItem = document.createElement('li');
            listItem.innerHTML = error;
            list.appendChild(listItem);
        });
        feedbackBox.appendChild(list);
    }

    formResult.appendChild(formFeedback);
}