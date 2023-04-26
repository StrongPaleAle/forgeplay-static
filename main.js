import './style.css';


const dialogTriggers = document.querySelectorAll('[data-dialog]');

dialogTriggers.forEach(triggerWrapper => {
    const triggers = triggerWrapper.querySelectorAll('.dialog-open');
    
    const target = triggerWrapper.dataset.dialog;
    console.log(triggers.length);
    triggers.forEach(trigger => {
        console.log(trigger);
        trigger.addEventListener('click', () => {
            console.log('click');
            
            const dialog = document.getElementById('game-1');
            dialog.classList.add('open');

            dialog.querySelectorAll('.dialog-close').forEach(close => {
                close.addEventListener('click', () => {
                    dialog.classList.remove('open');
                });
            });

        });
    });
    
});