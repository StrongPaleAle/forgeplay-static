import '@splidejs/splide/css'
import './style.css';
import Splide from '@splidejs/splide';
import { formHandle } from './form';



formHandle('contact-form');


const dialogTriggers = document.querySelectorAll('[data-dialog]');

dialogTriggers.forEach(triggerWrapper => {
    const triggers = triggerWrapper.querySelectorAll('.dialog-open');
    const defaultTrigger = triggerWrapper.querySelector('button.dialog-open');
    const target = triggerWrapper.dataset.dialog;
    //console.log(triggers.length);


    triggers.forEach(trigger => {
        //console.log(trigger);
        trigger.addEventListener('click', () => {
            //console.log('click');
            
            const dialog = document.getElementById(target);
            const dialogElements = 'input:not([disabled]), button:not([disabled])';
            const focusableElements = dialog.querySelectorAll(dialogElements);

            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            

            dialog.classList.add('open');
            dialog.setAttribute("tabindex", "-1");
            dialog.focus();
            
            dialog.addEventListener('keydown', (event) => {

                // handle TAB key
                if (event.key === "Tab") {
                    if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                    }
                }
                // handle ESCAPE key to close the modal
                if (event.key === "Escape" || event.key === "Esc") {
                    dialog.classList.remove('open');
                    dialog.removeAttribute("tabindex");
                    // Focus to the register button (the last focus before modal was opened)
                    defaultTrigger.focus();

                }
            });

            mountDialogGallery(dialog);

            dialog.querySelectorAll('.dialog-close').forEach(close => {
                close.addEventListener('click', () => {
                    dialog.classList.remove('open');
                    dialog.removeAttribute("tabindex");
                    defaultTrigger.focus();
                });
            });

        });
    });
    
});
function mountDialogGallery(parent){
    var elms = parent.getElementsByClassName( 'splide' );

    for ( var i = 0; i < elms.length; i++ ) {
        
        if (elms[i].classList.contains('is-initialized')){
            console.log('splide already active');
            continue;
        } else{
            console.log('activation splide');
            new Splide( elms[ i ], {
                type     : 'loop',
                focus    : 'center',
                autoWidth: true,
                gap: '1rem',
                breakpoints: {
                    640: { autoWidth: false, perPage: 1, gap: '0rem', type: 'slide' },
                },
            }  ).mount();
        }
        
    }
}
