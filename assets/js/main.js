/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
   // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						     : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'top',
   distance: '60px',
   duration: 2500,
   delay: 300,
   reset: true, // Animations repeat
})
sr.reveal(`.home__container, .popular__container, .footer`)
// sr.reveal(`.home_pizza_board`, {delay: 700, distance: '100px', origin: 'right'})
// sr.reveal(`.home__pizza`, {delay: 1400, distance: '100px', origin: 'bottom', rotate:{z: -90}})
sr.reveal(`.about__data, .recipe__list, .contact__data`, {origin: 'right'})
sr.reveal(`.about__img, .recipe__img, .contact__image`, {origin: 'left'})
sr.reveal(`.products__card`, {interval: 100})



// form submission to WhatsApp start
// This script handles form submission to WhatsApp
// Ensure you have a form with id "whatsappForm" and inputs with classes "input
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
// form submission to WhatsApp end

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
startSlideshow('.contact__image img', 'block', 4000);
// ==== Recipe Slide Show  ==== //
startSlideshow('.recipe-content', 'flex', 5000);
// ==== Home Slide Show ==== //
startSlideshow('.home__data p', 'flex', 3000);
startSlideshow('.home__data h1', 'flex', 3000);
startSlideshow('.home__sticker-1', 'flex', 3000);
startSlideshow('.home__sticker-2', 'flex', 3000);
startSlideshow('.home__images', 'flex', 3000);
// ==== Popular Slide Show  ==== //
// startSlideshow('.popular__card img', 'flex', 5000);

// ==== Slide Show Utility Function End ==== //

// /*=============== SWIPER POPULAR START ===============*/
// Initialize Swiper for the popular section
/*=============== SWIPER POPULAR ===============*/
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
// /*=============== SWIPER POPULAR END ===============*/