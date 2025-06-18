/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () =>{
   const header = document.getElementById('header')
   // Add a class if the bottom offset is greater than 50 of the viewport
   this.scrollY >= 50 ? header.classList.add('shadow-header') 
                      : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== SWIPER POPULAR ===============*/
const swiperPopular = new Swiper('.popular__swiper', {
   loop: true,
   grabCursor: true,
   slidesPerView: 'auto',
   centeredSlides: 'auto',
})

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
   // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						     : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'top',
   distance: '60px',
   duration: 2500,
   delay: 300,
   // reset: true, // Animations repeat
})
// ==== Slide Show Utility Function Start ==== //
function startSlideshow(selector, displayStyle, interval) {
  const items = document.querySelectorAll(selector);
  let index = 0;
  setInterval(() => {
    items.forEach((el, i) => el.style.display = i === index ? displayStyle : 'none');
    index = (index + 1) % items.length;
  }, interval);
  // Show first item immediately
  items.forEach((el, i) => el.style.display = i === 0 ? displayStyle : 'none');
}
// ==== Recipe Slide Show  ==== //
startSlideshow('.recipe-content', 'flex', 5000);

startSlideshow('.home', 'flex', 5000);

startSlideshow('.contact__image img', 'block', 4000);

sr.reveal(`.home__data, .popular__container, .footer`)
sr.reveal(`.home__board`, {delay: 700, distance: '100px', origin: 'right'})
sr.reveal(`.home__pizza`, {delay: 1400, distance: '100px', origin: 'bottom', rotate:{z: -90}})
sr.reveal(`.home__ingredient`, {delay: 2000, interval: 100})
sr.reveal(`.about__data, .recipe__list, .contact__data`, {origin: 'right'})
sr.reveal(`.about__img, .recipe__img, .contact__image`, {origin: 'left'})
sr.reveal(`.products__card`, {interval: 100})


  document.getElementById("whatsappForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.querySelector(".input.name").value.trim();
    const phone = document.querySelector(".input.phone").value.trim();
    const email = document.querySelector(".input.email").value.trim();
    const message = document.querySelector(".message").value.trim();

    // Optional: Validate inputs here

    // WhatsApp number (with country code, no '+' sign)
    const whatsappNumber = "919182714776"; // Replace with your number

    // Construct message
    const whatsappMessage = `Hello, I'm ${name}.\nMobile: ${phone}\nEmail: ${email}\nMessage: ${message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp link
    window.open(whatsappURL, "_blank");
  });





// ==== Slide Show Utility Function Start ==== //
function startSlideshow(selector, displayStyle, interval) {
  const items = document.querySelectorAll(selector);
  let index = 0;
  setInterval(() => {
    items.forEach((el, i) => el.style.display = i === index ? displayStyle : 'none');
    index = (index + 1) % items.length;
  }, interval);
  // Show first item immediately
  items.forEach((el, i) => el.style.display = i === 0 ? displayStyle : 'none');
}

// ==== Contact Slide Show ==== //
// startSlideshow('.contact-left-section img', 'block', 3000);
// ==== Recipe Slide Show  ==== //
// startSlideshow('.recipe-content', 'flex', 5000);
// ==== Home Slide Show ==== //
startSlideshow('.home__data p', 'flex', 3000);
startSlideshow('.home__data h1', 'flex', 3000);
startSlideshow('.home__sticker-1', 'flex', 3000);
startSlideshow('.home__sticker-2', 'flex', 3000);
startSlideshow('.home__images', 'flex', 3000);
// ==== Popular Slide Show  ==== //
// startSlideshow('.popular__card img', 'flex', 5000);

// ==== Slide Show Utility Function End ==== //


    const swiper = new Swiper('.popular__swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      // spaceBetween: 30,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });


/*=============== Navbar Start ===============*/
// Navigation Menu Toggle and Active Link

    // const navMenu = document.getElementById('nav-menu'),
    //       navToggle = document.getElementById('nav-toggle'),
    //       navClose = document.getElementById('nav-close');

    // navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
    // navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));

    // document.querySelectorAll('.nav__link').forEach(link =>
    //   link.addEventListener('click', () => navMenu.classList.remove('show-menu'))
    // );

    // window.addEventListener('scroll', () => {
    //   const header = document.getElementById('header');
    //   header.classList.toggle('shadow-header', scrollY >= 50);

    //   const sections = document.querySelectorAll('section[id]');
    //   sections.forEach(section => {
    //     const sectionTop = section.offsetTop - 60;
    //     const sectionHeight = section.offsetHeight;
    //     const sectionId = section.getAttribute('id');
    //     const link = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);
        
    //     if (link) {
    //       if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
    //         document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active-link'));
    //         link.classList.add('active-link');
    //       }
    //     }
    //   });
    // });
/*=============== Navbar End ===============*/