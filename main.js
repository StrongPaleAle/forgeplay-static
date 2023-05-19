import '@splidejs/splide/css'
import './style.css';
import Splide from '@splidejs/splide';
import { formHandle } from './form';



formHandle('contact-form');

if (document.body.classList.contains('home')){
    const homeLinks = document.querySelectorAll('.home-link');
    homeLinks.forEach(link => {
        link.classList.add('current');
        link.href = '/#home';
    });
}
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
            setTimeout(function() {

                mountDialogGallery(dialog);
            }, 200);
            
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
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu__link');
const logoNav = document.querySelector('.logo-nav');
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.attributes['aria-expanded'].value = menuToggle.attributes['aria-expanded'].value === 'true' ? 'false' : 'true';
    logoNav.classList.toggle('active');
});
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('click');
        menu.classList.remove('open');
        menuToggle.classList.remove('active');
        logoNav.classList.remove('active');
        const current = document.querySelector('.menu__link.current');
        
        current ? current.classList.remove('current') : null;
        link.classList.add('current');
    });
});

// simple function to use for callback in the intersection observer
const changeNav = (entries, observer) => {
	entries.forEach((entry) => {
		// verify the element is intersecting
		if(entry.isIntersecting && entry.intersectionRatio >= 0.55) {
			// remove old active class
			document.querySelector('.current').classList.remove('current');
			// get id of the intersecting section
			var id = entry.target.getAttribute('id');
			// find matching link & add appropriate class
			var newLink = document.querySelector(`[href="/#${id}"]`).classList.add('current');
            entry.target.classList.add('on-screen');
		}
	});
}
const getIn = (entries, observer) => {
	entries.forEach((entry) => {
		// verify the element is intersecting
		if(entry.isIntersecting && entry.intersectionRatio >= 0.55) {
			
            entry.target.classList.add('on-screen');
		}
	});
}
// init the observer
const options = {
	threshold: 0.55
}

const observer = new IntersectionObserver(changeNav, options);
const elemObserver = new IntersectionObserver(getIn, options);
// target the elements to be observed
const sections = document.querySelectorAll('section.menu-section');
sections.forEach((section) => {
	observer.observe(section);
});

const showOnScroll = document.querySelectorAll('.show-on-scroll');
showOnScroll.forEach((ele) => {
    elemObserver.observe(ele);
});