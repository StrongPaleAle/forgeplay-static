import '@splidejs/splide/css'
import './style.css';
import Splide from '@splidejs/splide';
import { formHandle } from './form';
import { alphaHandle } from './alpha';

if (document.getElementById('contact-form')){
    formHandle('contact-form');
}
if (document.getElementById('alpha-form')){
    alphaHandle('alpha-form');
}
if (document.getElementById('test-form')){
    alphaHandle('test-form');
}

if (document.body.classList.contains('home')){
    const homeLinks = document.querySelectorAll('.home-link');
    homeLinks.forEach(link => {
        link.classList.add('current');
        link.href = '/#home';
    });
}
if (window.location.hash) {
    let hash = window.location.hash;
    let target = document.querySelector(hash);
    if (target.classList.contains('dialog')){
        
        openDialog(target);
    }
}
const dialogTriggers = document.querySelectorAll('[data-dialog]');

dialogTriggers.forEach(triggerWrapper => {
    const triggers = triggerWrapper.querySelectorAll('.dialog-open');
    
    const target = triggerWrapper.dataset.dialog;
    //console.log(triggers.length);


    triggers.forEach(trigger => {
        //console.log(trigger);
        trigger.addEventListener('click', () => {
            //console.log('click');
            
            const dialog = document.getElementById(target);
            openDialog(dialog);

        });
    });
    
});

function openDialog(dialog){
    const dialogElements = 'input:not([disabled]), button:not([disabled])';
    const focusableElements = dialog.querySelectorAll(dialogElements);
    const toFocus = document.querySelector('h3 a[href="#' + dialog.id + '"]');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    //console.log(toFocus);

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
            closeDialog(dialog);

        }
    });
    setTimeout(function() {

        mountDialogGallery(dialog, toFocus);
    }, 200);
    
    dialog.querySelectorAll('.dialog-close').forEach(close => {
        close.addEventListener('click', () => {
            closeDialog(dialog, toFocus);
        });
    });
}

function mountDialogGallery(parent){
    var elms = parent.getElementsByClassName( 'splide' );

    for ( var i = 0; i < elms.length; i++ ) {
        
        const thisSplide = elms[i];

        if (thisSplide.classList.contains('is-initialized')){
            //console.log('splide already active');
            continue;
        } else{

            let sWidth = thisSplide.offsetWidth;
            thisSplide.style.setProperty("--max-slide", sWidth - 20 + 'px');
            // thisSplide.querySelectorAll('.portrait').forEach(video => {
            //     video.setAttribute('width', sWidth + 'px');
            //     video.addEventListener('click', () => {
            //         video.classList.toggle('play');
            //         video.paused ? video.play() : video.pause();
            //     });
                
            // })
            window.addEventListener('resize', () => {
                let sWidth = thisSplide.offsetWidth;
                thisSplide.style.setProperty("--max-w", sWidth - 20 + 'px');
                // thisSplide.querySelectorAll('.portrait').forEach(video => {
                //     video.setAttribute('width', sWidth + 'px');
                    
                    
                // })
            });
            //console.log('activation splide');
            const splide = new Splide( thisSplide, {
                type     : 'loop',
                focus    : 'center',
                autoWidth: true,
                gap: '1rem',
                breakpoints: {
                    640: { autoWidth: false, perPage: 1, gap: '0rem', type: 'slide' },
                },
            }  ).mount();

            splide.on( 'inactive', function (Slide) {
                // This will be executed.
                Slide.slide.querySelectorAll('video').forEach(video => {
                    video.pause();
                });
            } );


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
        //console.log('click');
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
		if(entry.isIntersecting) {
			// remove old active class
            const current = document.querySelector('.current');
            current ? current.classList.remove('current') : null;
			
			// get id of the intersecting section
			const id = entry.target.getAttribute('id');
            console.log(id);
			// find matching link & add appropriate class
			const newLink = document.querySelector(`[href="/#${id}"]`);

            newLink ? newLink.classList.add('current') : null;

            entry.target.classList.add('on-screen');
		}
	});
}
const getIn = (entries, observer) => {
	entries.forEach((entry) => {
		// verify the element is intersecting
		if(entry.isIntersecting) {
			
            entry.target.classList.add('on-screen');
		}
	});
}
// init the observer
const options = {
	rootMargin: "-25% 0px -25% 0px"
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

function closeDialog(dialog, toFocus){
    dialog.classList.remove('open');
    dialog.querySelectorAll('.splide__slide.is-active video').forEach(video => {
        video.pause();
    });
    window.location.hash = 'games';
    dialog.removeAttribute("tabindex");
    // Focus to the register button (the last focus before modal was opened)
    toFocus.focus();
    
}
