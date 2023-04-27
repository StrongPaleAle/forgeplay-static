import '@splidejs/splide/css'
import './style.css';
import Splide from '@splidejs/splide';

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

var elms = document.getElementsByClassName( 'splide' );

for ( var i = 0; i < elms.length; i++ ) {
    console.log('activate' + elms[i]);
  new Splide( elms[ i ], {
    type     : 'loop',
    focus    : 'center',
    autoWidth: true,
  }  ).mount();
}