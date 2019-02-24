var overlay = document.querySelector(".overlay");
var modal = document.querySelectorAll(".modal");
var closeButton = document.querySelectorAll(".modal__close");

// Блок с картой
var mapLink = document.querySelector(".contacts__map-link");
var mapModal = document.querySelector(".modal-map");
if (typeof (mapModal) != "undefined" && mapModal !== null) {
	mapLink.addEventListener("click", function (evt) {
		evt.preventDefault();
		mapModal.classList.add("modal--show");
		overlay.classList.add("overlay--show");
	});
}

// Блок contacts/feedback
var contactsButton = document.querySelector(".contacts__link");
var feedbackModal = document.querySelector(".feedback");
if (typeof (feedbackModal) != "undefined" && feedbackModal !== null) {
	var feedbackForm = feedbackModal.querySelector(".feedback__form");
	var feedbackInputs = feedbackForm.querySelectorAll(".feedback__input");
	var feedbackName = feedbackModal.querySelector("[name=name]");
	var feedbackEmail = feedbackModal.querySelector("[name=email]");

	contactsButton.addEventListener("click", function (evt) {
		evt.preventDefault();
		feedbackModal.classList.add("modal--show");
		overlay.classList.add("overlay--show");
		feedbackName.focus();
	});

	feedbackForm.addEventListener("submit", function (evt) {
		if (!feedbackName.value || !feedbackEmail.value) {
			evt.preventDefault();
			feedbackModal.classList.remove("modal--error");
			feedbackModal.offsetWidth = feedbackModal.offsetWidth;
			feedbackModal.classList.add("modal--error");

			if (!feedbackName.value) {
				feedbackName.classList.remove("feedback__input--error");
				feedbackName.offsetWidth = feedbackName.offsetWidth;
				feedbackName.classList.add("feedback__input--error");
			}

			if (!feedbackEmail.value) {
				feedbackEmail.classList.remove("feedback__input--error");
				feedbackEmail.offsetWidth = feedbackEmail.offsetWidth;
				feedbackEmail.classList.add("feedback__input--error");
			}
		}
	});
}

// Закрытие модальнх окон при нажатии на крестик
var closeButtonArray = Array.prototype.slice.call(document.querySelectorAll(".modal__close"));
if (typeof (closeButtonArray) != "undefined" && closeButtonArray !== null && closeButtonArray.length !== 0) {
	closeButtonArray.forEach(function (button, n) {
		button.addEventListener("click", function (evt) {
			modalClosing();
		});
	});
}

// Механизм закрытия модальных окон при нажатии на esc
window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		modalClosing();
	}
});

// Механизм закрытия модальных окон при нажатии на overlay
overlay.addEventListener("click", function (evt) {
	evt.preventDefault();
	modalClosing();
});

var modalClosing = function () {
	for (var i = 0; i < modal.length; i++) {
		if (modal[i].classList.contains("modal--show")) {
			modal[i].classList.remove("modal--show");
		}
		modal[i].classList.remove("modal--error");
	}
	if (overlay.classList.contains("overlay--show")) {
		overlay.classList.remove("overlay--show");
	}
}

var slides = document.querySelectorAll(".promo-slider__item");
if (typeof (slides) != "undefined" && slides !== null && slides.length !== 0) {

	var sliderContainer = document.querySelector(".promo-slider__list");
	var sliderToggles = document.querySelectorAll(".slider-toggles__button");
	var sliderCurrentIndex = 0;
	var sliderTimer = 6000;

	var sliderInit = function () {
		if (!(slides[0].classList.contains('promo-slider__item--show')) || !(sliderToggles[0].classList.contains('slider-toggles__button--current'))) {
			slides[0].classList.add('promo-slider__item--show');
			sliderToggles[0].classList.add('slider-toggles__button--current');
		}
		sliderCurrentIndex = 0;
	}
	sliderInit();

	var changeSlide = function (index) {
		sliderCurrentIndex = index;
		console.log(index);
		for (var j = 0; j < slides.length; j++) {
			if (j == sliderCurrentIndex) {
				slides[j].classList.add("promo-slider__item--show");
				sliderToggles[j].classList.add("slider-toggles__button--current");
			} else {
				slides[j].classList.remove("promo-slider__item--show");
				sliderToggles[j].classList.remove("slider-toggles__button--current");
			}
		}
	}

	var sliderPlay = function () {
		if (sliderCurrentIndex < slides.length - 1) {
			sliderCurrentIndex++;
		} else {
			sliderCurrentIndex = 0;
		}
		changeSlide(sliderCurrentIndex);
	}

	var startSliderPlay = setInterval(sliderPlay, sliderTimer);

	sliderContainer.onmouseover = function () {
		clearInterval(startSliderPlay);
	}

	sliderContainer.onmouseout = function () {
		startSliderPlay = setInterval(sliderPlay, sliderTimer)
	}

	var moveIndex = function (slideToggle, index) {
		slideToggle.addEventListener("click", function (evt) {
			evt.preventDefault();
			changeSlide(index);
			clearInterval(startSliderPlay);
		});
	}

	for (var i = 0; i < sliderToggles.length; i++) {
		moveIndex(sliderToggles[i], i);
	}
}

// Блок services
var servicesList = document.querySelectorAll(".services-list__item");
if (typeof (servicesList) != "undefined" && servicesList !== null && servicesList.length !== 0) {
	var servicesTabs = document.querySelectorAll(".services-tab__link");
	var servicesCurrentIndex = 0;

	var servicesInit = function () {
		servicesTabs[servicesCurrentIndex].classList.add("services-tab__link--current");
		servicesList[servicesCurrentIndex].classList.add("services-list__item--show");
	}

	servicesInit();

	var changeServiceSlide = function (index) {
		for (var i = 0; i < servicesTabs.length; i++) {
			if (i == index) {
				servicesTabs[i].classList.add("services-tab__link--current");
				servicesList[i].classList.add("services-list__item--show");

			} else {
				servicesTabs[i].classList.remove("services-tab__link--current");
				servicesList[i].classList.remove("services-list__item--show");
			}
		}
	}

	var moveTabIndex = function (index, tab) {
		tab.addEventListener("click", function (evt) {
			evt.preventDefault();
			servicesCurrentIndex = index;
			changeServiceSlide(servicesCurrentIndex);
		});
	}

	for (var i = 0; i < servicesTabs.length; i++) {
		moveTabIndex(i, servicesTabs[i]);
	}
}
