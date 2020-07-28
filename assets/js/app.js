$(function() {
	let scroll = $(this).scrollTop(),
		heightIntro = $('.intro').outerHeight(),
		heightHeader = $('.header').outerHeight(),
		heightWindow = $(window).height(),
		widthWindow = $(window).width();

	update(scroll, heightIntro, heightHeader);

	/* Header small height*/
	if (heightWindow <= 450) {
		$('.header').css('opacity','0');
	}

	/* Change the Orientation*/
	$(window).on("orientationchange",function(event){
		scroll = $(this).scrollTop();
		heightWindow = $(window).width();
		heightIntro = $('.intro').outerWidth();

  		if ((heightWindow <= 450) && (scroll < heightIntro)) {
			$('.header').css('opacity','0');
		}else {
			$('.header').css('opacity','1');
		}
	});

	/* Background video none */
	$(window).scroll(function(event) {
		scroll = $(this).scrollTop();
		heightIntro = $('.intro').outerHeight();

		update(scroll, heightIntro, heightHeader, heightWindow)
	});

	function update(scroll, heightIntro, heightHeader, heightWindow) {
			if (scroll > heightHeader) {
				$('.header').css('top','-100%');
				$('.header').css('zIndex','0');
			} else {
				$('.header').css('top','0');
				$('.header').css('zIndex','5');
				$('.header').removeClass('fixed');
			}

			if (scroll >= (heightIntro - heightHeader)) {
				fixedHeader();
			} else {
				hideHeader();
			}

			if ((scroll >= (heightIntro - heightHeader)) && (heightWindow <= 450)) {
				$('.header').css('opacity','1');
				fixedHeader();
			} else if (heightWindow <= 450) {
				$('.header').css('opacity','0');
				hideHeader();
			}

			if (scroll > heightIntro) {
				$('.intro__video').css('display', 'none');
			} else {
				$('.intro__video').css('display', 'block');
			}
		}

		function fixedHeader() {
			$('.header').addClass('fixed');
			$('.header.fixed').css('top','0');
			$('.header.fixed').css('zIndex','10');
		}

		function hideHeader() {
			$('.intro__video').css('display', 'block');
			$('.header.fixed').css('top','-100%');
			$('.header.fixed').css('zIndex','0');
		}

	/* Modal */
	const modalCall = $("[data-modal]");
	const modalClose = $("[data-close]");

	modalCall.on("click", function(event) {
		event.preventDefault();
		let $this = $(this);
		let modalId = $this.data('modal');
		
		$(modalId).addClass('show');
		$("body").addClass('no_scroll');

		setTimeout(function() {
			$(modalId).find('.modal__dialog').css({
				transform: 'rotateX(0)'
			});
		}, 200)
	}) 

	modalClose.on("click", function(event) {
		event.preventDefault();
		let $this = $(this),
			modalParent = $this.parents('.modal'),
			widthWindow = $(window).width(),
			data = $(this).data(),
			close = data.close;

		if ((widthWindow < 915) && (close == 'resume')) {
			modalMobile(modalParent);

		}else {
			modalMobile(modalParent);
			$("body").removeClass('no_scroll');
		}

			
	}) 

	function modalMobile(modalParent) {
		$(modalParent).find('.modal__dialog').css({
			transform: 'rotateX(90deg)'
		});

		setTimeout(function() {
			modalParent.removeClass('show');
		}, 200)
	}

	$(".modal").on("click", function(event) {
		let $this = $(this);

		$this.find('.modal__dialog').css({
			transform: 'rotateX(90deg)'
		});

		setTimeout(function() {
			$this.removeClass('show');
			$("body").removeClass('no_scroll');
		}, 200)
	}) 

	$(".modal__dialog").on("click", function(event) {
		event.stopPropagation();
	}) 

	/* Scroll */
	$('[data-scroll]').click(function(event) {
		event.preventDefault();

		let blockID = $(this).data('scroll'),
			blockOffSet = $(blockID).offset().top;
			heightHeader = $('.header').outerHeight();


			$('.header__burger,.nav').removeClass('active');
			$('body').removeClass('no_scroll');

		$('html,body').animate({
			scrollTop: blockOffSet
		}, 700);
	})

	/*Burger*/
	$('.header__burger').click(function(event) {
		event.preventDefault();

		$('.header__burger,.nav').toggleClass('active');
		$('body').toggleClass('no_scroll');
	});

	/* Animation */

	if (widthWindow < 1500) {
		$('.about__content,.hobby__content').removeAttr('data-aos');
	}

	AOS.init();

// You can also pass an optional settings object
// below listed default settings
	AOS.init({
	  // Global settings:
	  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	  initClassName: 'aos-init', // class applied after initialization
	  animatedClassName: 'aos-animate', // class applied on animation
	  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
	  

	  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	  offset: 450, // offset (in px) from the original trigger point
	  delay: 0, // values from 0 to 3000, with step 50ms
	  duration: 400, // values from 0 to 3000, with step 50ms
	  easing: 'ease', // default easing for AOS animations
	  once: false, // whether animation should happen only once - while scrolling down
	  mirror: false, // whether elements should animate out while scrolling past them
	  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

	});
}) 