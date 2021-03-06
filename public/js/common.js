"use strict";

let scroller = document.body,
	tween;

let gsapSet = (el, start = '50% bottom', end = 'top top', scrub = .8, pin, markers) => {
	return gsap.timeline({
		scrollTrigger: {
			trigger: el,
			scroller,
			start,
			end,
			scrub,
			pin,
			markers,
			// invalidateOnRefresh: true,
			defaults: {
				// ease: "power3",
				// overwrite: true
			}
		}
	})
}
AOS.init()
const JSCCommon = {
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[ document.body, document.querySelector('html') ].forEach(el => el.classList.toggle("fixed"));
			// $(".menu-item-has-children.active").removeClass("active")
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
			// $(".menu-item-has-children.active").removeClass("active")
		}

	},
	mobileMenu() {
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		// window.addEventListener('resize', () => {
		// 	if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		// }, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })
		let tabs = document.querySelectorAll('.' + tab);
		for (const item of tabs) {

			function setLine(el,) {
				let line = item.querySelector('.tabs__caption');
				if (line) {
					let w = el.offsetWidth;
					let h = el.offsetHeight;
					let y = el.offsetTop;
					let x = el.offsetLeft;
					line.style.setProperty('--line-h', `${h}px`);
					line.style.setProperty('--line-w', `${w}px`);
					line.style.setProperty('--line-y', `${y}px`);
					line.style.setProperty('--line-x', `${x}px`);
				}
			}
			window.addEventListener('resize', () => {
				setLine(item.querySelector(` .${tab}__btn.active`));
			}, { passive: true });
			setLine(item.querySelector(` .${tab}__btn.active`));

			$(item.querySelector('.' + tab + '__caption')).on('click', '.' + tab + '__btn:not(.active)', function (e) {
				setLine(this);
				$(this)
					.addClass('active').siblings().removeClass('active')
					.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
					.eq($(this).index()).fadeIn().addClass('active');

			});

		}
		$('.tabs__toggle').click(function () {
			$(this).toggleClass("active").next().slideToggle();
		})

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({ "mask": "+9(999)999-99-99", showMaskOnHover: false }).mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 



	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	let topNav = document.querySelector('.top-nav  ');
	// function setFixedNav() {
	// 	if (!topNav) return;
	// 	window.scrollY > 0
	// 		? topNav.classList.add('fixed')
	// 		: topNav.classList.remove('fixed');
	// }

	function whenResize() {
		// 	setFixedNav();
	}

	gsap.registerPlugin(ScrollTrigger);

	var t1 = gsapSet('.sJoin', 'top  top', '+=300%', 1.5, '.sJoin__inner');
	t1
		// .to(".sJoin svg", { scale: 1.5 })
		.to(".sJoin__inner .color-fill", { opacity: 0 })
		.to(".sJoin__inner .sJoin__head", { scale: 2 }, ">-.5")
		.to(".sJoin__inner :is(.img-animate, .sJoin__col)", { opacity: 1 }, ">-.5")
		.to(".sJoin__inner .border-fill", { opacity: 0 }, ">-.5")
		.to(".sJoin__inner .sJoin__head", { scale: 5 })
		.to(".sJoin__inner .sJoin__img-wrap", { x: '-50%' })
		.from(".sJoin__inner .section", { opacity: 0, y: '100%' }, ">-.5")
		.from(".sJoin__inner .section", { }, ">+.5")
	// .to(".sJoin .sJoin__head", { opacity: 0 },">-.5")
	// .to(".sJoin .sJoin__head", { opacity: 0 })

	let mainPage = document.querySelector(".main-page");
	if (mainPage) {
		let sections = document.querySelectorAll(".section--vh");
		let dots = document.createElement("div");
		dots.classList.add("dots-wrap");
		let count = 0;
		for (const ell of sections) {
			ell.setAttribute("data-section", `section-${count}`);
			let dot = document.createElement("div");
			dot.classList.add("dots-wrap__item");
			dot.setAttribute("data-link", `section-${count}`);
			dots.appendChild(dot);
			count++;

			dot.addEventListener("click", function () {
				let sec = this.dataset.link;
				let destination = $(`[data-section="${sec}"]`).offset().top;
				$('html, body').animate({ scrollTop: destination }, 0);
			})
		}
		mainPage.appendChild(dots);

	}





	let upY = '200';
	gsap.utils.toArray(".section--up").forEach(wow => {

		gsap.from(wow, {
			y: upY,
			scrollTrigger: {
				trigger: wow,
				start: "top bottom",
				end: "bottom bottom",
				scrub: 1,
				markers: true
			}
		})
	})




	gsap.utils.toArray(".section--vh").forEach(wow => {

		if (!topNav) return;
		let h = topNav.offsetHeight;
		// let h2 = document.querySelector(".dots-wrap").offsetHeight;

		function myfunction() {
			if (!wow.classList.contains("bg-dark")) {
				$(".top-nav").addClass("top-nav--light")
			}
			else {
				$(".top-nav").removeClass("top-nav--light")

			}
		};


		function myfunction3() {
			if (!wow.classList.contains("bg-dark")) {
				$(".top-nav").addClass("top-nav--light-mob")
			}
			else {
				$(".top-nav").removeClass("top-nav--light-mob")

			}
		};
 
		function myfunction2() {
			let sec = wow.dataset.section;
			// console.log(wow);
			console.log(sec);
			$(`.dots-wrap__item.active`).removeClass('active');
			$(`[data-link="${sec}"]`).addClass('active');
			if (wow.classList.contains("bg-white")) {
				$(".dots-wrap").addClass("dots-wrap--dark")
			}
			else {
				$(".dots-wrap").removeClass("dots-wrap--dark")
			}
		};

		const rect = wow.getBoundingClientRect();
		ScrollTrigger.create({
			scroller: scroller,
			trigger: wow,
			start: `top top+=${h / 2}`,
			end: `bottom-=${h / 2} top`,
			// markers: true,
			// toggleActions: "play none play none",
			onEnter: () => myfunction(),
			// onLeave: () => myfunction(),
			// onLeaveBack: () => myfunction(),
			onEnterBack: () => myfunction(),
			invalidateOnRefresh: true,
		});
		ScrollTrigger.create({
			scroller: scroller,
			trigger: wow,
			start: `top bottom`,
			end: `bottom top`,
			// markers: true,
			// toggleActions: "play none play none",
			onEnter: () => myfunction3(),
			// onLeave: () => myfunction(),
			// onLeaveBack: () => myfunction(),
			onEnterBack: () => myfunction3(),
			invalidateOnRefresh: true,
		});

		ScrollTrigger.create({
			scroller: scroller,
			trigger: wow,
			start: `top center`,
			end: `bottom center`,
			// markers: true,
			// toggleActions: "play none reverse none",
			onEnter: () => myfunction2(),
			// onLeave: () => myfunction2(),
			// onLeaveBack: () => myfunction2(),
			onEnterBack: () => myfunction2(),
			invalidateOnRefresh: true,
		});

	})



	// Запускаем функцию при прокрутке страницы
	window.addEventListener('scroll', function () {

	}, { passive: true });

	// А также запустим функцию сразу. А то вдруг, элемент изначально видно


	function setTopNavBg() {
		let bg = false;
		let section = document.querySelectorAll(".section");
		window.addEventListener('scroll', () => {

		}, { passive: true })

	}

	window.addEventListener('scroll', () => {
		// setFixedNav();
		// Visible(element);

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
		// Visible(element);
	}, { passive: true });

	whenResize();
	// Visible(element);


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	const swipersNews = new Swiper('.sNews__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true,
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 47,
			}
		}
	});
	const swiperValueProposition = new Swiper('.sValueProposition__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true,
		},
		breakpoints: {
			768: {
				spaceBetween: 46,
			}
		}
	});
	const swiperServiceSupport = new Swiper('.sServiceSupport__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true,
		},
		breakpoints: {
			768: {
				spaceBetween: 24,
			}
		}
	});
	const swiperPrinciples = new Swiper('.sPrinciples__slider--js', {
		slidesPerView: 'auto',
		// spaceBetween: 16,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true,
		},
		breakpoints: {
			768: {
				spaceBetween: 40,
			},
			1400: {
				spaceBetween: 70,
			}
		}
	});
	// const swiperPrinciples = new Swiper('.sPrinciples__slider--js', {
	// 	slidesPerView: 1,
	// 	grid: {
	// 		rows: 2,
	// 	},
	// 	// spaceBetween: 16,
	// 	scrollbar: {
	// 		el: '.swiper-scrollbar',
	// 		draggable: true,
	// 		hide: false,
	// 		snapOnRelease: true,
	// 	},
	// 	breakpoints: {
	// 		992: {
	// 			slidesPerView: 3,
	// 			spaceBetween: 77,
	// 		}
	// 	}
	// });
	const swipersNewsPressCenter = new Swiper('.sNews--PressCenter__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 47,
			}
		}
	});
	const swiperPublication = new Swiper('.sNews--Publication__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true,
		},
		// navigation: {
		// 	nextEl: ".swiper-button-next",
		// 	prevEl: ".swiper-button-prev",
		// },
		breakpoints: {
			768: {
				spaceBetween: 44,
			},
			1200:{
				spaceBetween: 96,
			}
		}
	});

	const swiperstabs = new Swiper('.tabs-slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		breakpoints: {
			992: {
				slidesPerView: 4
			}
		}
	});
	// const swiperExpertGlobal = new Swiper('.sExpert__slider-global--js', {
	// 	slidesPerView: 'auto',
	// 	spaceBetween: 0,

	// });
	const swiperExpertPagination = new Swiper('.sExpert__slider-pagination--js', {
		slidesPerView: 'auto',
		// spaceBetween: 8,
		// initialSlide: 1,
		// breakpoints: {
		// 	768: {
		// 		spaceBetween: 24,
		// 	}
		// }
	});
	const swiperExpert = new Swiper('.sExpert__slider--js', {
		slidesPerView: 'auto', 
		spaceBetween: 8,
		thumbs: {
			multipleActiveThumbs: false,
			swiper: swiperExpertPagination,
		},
		navigation: {
			nextEl: ".sExpert .swiper-button-next",
			prevEl: ".sExpert .swiper-button-prev",
		},
		// initialSlide: 1,
		breakpoints: {
			768: {
				spaceBetween: 24,
			}
		}
	});


	// modal window
	$('.menu').on("click", '.menu-item-has-children>a', function (e) {
		e.preventDefault();
		let self = $(this);
		self.parent().toggleClass('active')
			.siblings().removeClass('active');

	})

	$('.menu').on("click", '.menu-item-back', function () {
		let self = $(this);
		self.parents('.menu-item-has-children').removeClass('active');

	})








	const sContentSwiper = new Swiper('.sContent__slider--js', {
		slidesPerView: 1,
		spaceBetween: 40,
		// loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});





	
	

 

	

	const sSearchResultSwiper = new Swiper('.sSearchResult__slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		// centeredSlides: true,
		centerInsufficientSlides: true,
	});

	$('.category-filter__toggle').on('click', function () {
		$(this).hide;
		$('.category-filter__content').addClass('active');
	});
	$('.icon-close').on('click', function() {
		$('.category-filter__toggle').show;
		$('.category-filter__content').removeClass('active');
	});

	let customSelect = document.querySelectorAll('.custom-select--js');
	for (let item of customSelect) {
		const choices = new Choices(item, {
			searchChoices: false,
			searchEnabled: false,
			itemSelectText: '',
		});
	}

	$('.btn-aos-refresh').on('click', function() {
		$('.tabs__content.active', function() {

			AOS.refresh();
		})
	});


	// for (let item of mapArr) {
		// console.log(center);
		// var myMap;
		// ymaps.ready(init);
		
		// let center = item.dataset.center;
		// function init () {
		// 	myMap = new ymaps.Map(item, {
		// 			center: [55.76, 37.64],
		// 			zoom:10
		// 	});

		// 	myMap.behaviors.disable('scrollZoom');
		// 	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			// 		// ... отключаем перетаскивание карты
			// 		myMap.behaviors.disable('drag');
		// 	}
		// }
		// }
	let maps = document.querySelectorAll('.map');
	let index = 0;
	for (const map of maps) {
		// console.log(center);
		// Дождёмся загрузки API и готовности DOM.
		
		function init () {
			var myMap,  myPlacemark2;
			let mapCenter = map.dataset.center.split(','),
					markIcon = 'img/svg/mapMark.png';
			// console.log(mapCenter);
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map(`map-${index++}`, {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: mapCenter, // Москва
					zoom:10,
					
				});
				var myPlacemark = new ymaps.Placemark(mapCenter, {
					// Свойства.
					// Содержимое иконки, балуна и хинта.
					hintContent: '',
					balloonContent: '',
				}, {
					hideIconOnBalloonOpen: false,
					iconLayout: 'default#image',
					iconImageHref: markIcon,
					iconImageSize: [73, 83],
					iconImageOffset: [-36, 0]
				});
				console.log(myPlacemark2);
				myMap.geoObjects.add(myPlacemark);
				myMap.behaviors.disable('scrollZoom');
				//на мобильных устройствах... (проверяем по userAgent браузера)
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					// ... отключаем перетаскивание карты
					myMap.behaviors.disable('drag');
				}
			};
		ymaps.ready(init);
	}

	const swipersReviews = new Swiper('.sNews--Reviews__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 47,
			}
		}
	});

	// Get a reference to the file input element
	const inputElement = document.querySelector('input[type="file"]');

	// Create a FilePond instance
	const pond = FilePond.create(inputElement, {
		labelIdle: `Нажмите или перетащите  файлы в эту область. .rar .zip .doc .docx .pdf .jpg не более 10 мб`,
	});

	const sAdvantagesSwipers = new Swiper('.sAdvantages__slider--js', {
		slidesPerView: 1,
		spaceBetween: 16,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true,
		},
		breakpoints: {
			992: {
				slidesPerView: 2,
				spaceBetween: 69,
			}
		}
	});

	const sTariffsSwipers = new Swiper('.sTariffs__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 8,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true,
		},
		breakpoints: {
			992: {
				// slidesPerView: 2,
				spaceBetween: 0,
			}
		}
	});

	let sliderWrap = document.querySelector(".slider-hover");

	sliderWrap.addEventListener("mouseout", function(){ 
		if (this.classList.contains("show-arrow-hover")) {
			
			this.classList.remove("show-arrow-hover")
		} 
	}, { passive: true })

	sliderWrap.addEventListener("mousemove", function(event){
		const width = this.offsetWidth / 2; 
		const x = event.clientX; 
		this.classList.add("show-arrow-hover")
		 if(x > width) {
			this.classList.add("show-arrow-left")
			this.classList.remove("show-arrow-right")
			// document.documentElement.style.setProperty('--right-arrow', `${vh}px`);
			
		}
		else{
				this.classList.add("show-arrow-right")
				this.classList.remove("show-arrow-left")
			} 
	}, { passive: true })

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }