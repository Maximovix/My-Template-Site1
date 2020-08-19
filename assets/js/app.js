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

		noLock();

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
			$('.button__return').addClass('active');
		} else {
			hideHeader();
			$('.button__return').removeClass('active');
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

	/* Scroll */
	let scrollUnlock = true;
	$('[data-scroll]').click(function(event) {
		event.preventDefault();

		let blockID = $(this).data('scroll'),
			blockOffSet = $(blockID).offset().top;
			heightHeader = $('.header').outerHeight();

		scrollUnlock = false;
		noLock();

		$('.nav__item').removeClass('active');

		$('html,body').animate({
			scrollTop: blockOffSet,
		}, 700,
			(function() {
				scrollUnlock = true;
			}) // Функция выполняющаяся после завершения анимации.
		);
	})

	/* Arrow Scroll */
	$('.intro__arrow').click(function(event) {
		event.preventDefault();

		let blockOffSetAbout = $('#about').offset().top;

		$('html,body').animate({
			scrollTop: blockOffSetAbout,
		}, 700);
	});

	/*Active Nav*/
	$('.nav__item').click(function(event) {
		event.preventDefault();

		$('.nav__item').removeClass('active');

		$(this).addClass('active');
	});

	$('.close-modal').click(function(event) {
		event.preventDefault();

		$('.nav__item').removeClass('active');
		checkNav();
	});

	$(window).scroll(function(event) {
		event.preventDefault();
		
		checkNav();
	})

	function checkNav() {
		let scroll = $(this).scrollTop(),
			offsetAbout = $('.about').offset().top,
			offsetHobby = $('.hobby').offset().top,
			offsetAims = $('.aims').offset().top,
			offsetWorks = $('.works').offset().top,
			offsetWrite = ($('.write').offset().top) - 100,
			offsetIntro = $('.intro').offset().top;

		if(scrollUnlock) {
			if(scroll < offsetAbout) {
				$('.nav__item').removeClass('active');
			} else if ((scroll >= offsetAbout) && (offsetHobby > scroll)) {
				$('.nav__item').removeClass('active');
				$('#nav-about').addClass('active');
			} else if ((scroll >= offsetHobby) && (offsetAims > scroll)) {
				$('.nav__item').removeClass('active');
				$('#nav-hobby').addClass('active');
			} else if ((scroll >= offsetAims) && (offsetWorks > scroll)) {
				$('.nav__item').removeClass('active');
				$('#nav-aims').addClass('active');
			} else if ((scroll >= offsetWorks) && (offsetWrite > scroll)) {
				$('.nav__item').removeClass('active');
				$('#nav-works').addClass('active');
			} else if (scroll >= offsetWrite) {
				$('.nav__item').removeClass('active');
				$('#nav-write').addClass('active');
			} else {
				$('.nav__item').removeClass('active');
			}
		}
	}

	/*Burger*/
	$('.header__burger').click(function(event) {
		event.preventDefault();


		if ($('.header__burger').hasClass('active')) {
			noLock();
		} else {
			$('body').addClass('lock');
			$('.header__burger,.nav').addClass('active');
		}
	});

	function noLock() {
		$('.header__burger,.nav').removeClass('active');
		$('body').removeClass('lock');
	}

	/* Line-Scroll */
	$(window).scroll(function(event) {
		event.preventDefault();

		checkLineWidth();
	});

	function checkLineWidth(params) {
		let	heightIntro = $('.intro').outerHeight(),
			scroll = $(this).scrollTop(),
			heightFull = $(document).outerHeight(true) - heightIntro,
			lineScrollWidth = (scroll / heightFull) * 100;

			if (scroll >= heightIntro) {

				$('.line__scroll').css({
					width: lineScrollWidth + '%'
				});
			}
	}

	checkLineWidth();

	/* Arrow Return */
	$('.arrow__return').click(function(event) {
		event.preventDefault();

		$('html,body').animate({
			scrollTop: 0,
		}, 700);
	});
}) 