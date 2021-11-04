$(function () {

	let overlay = $('#overlay'); // пoдлoжкa, дoлжнa быть oднa нa стрaнице
		open__modal = $('.open__modal'); // все ссылки, кoтoрые будут oткрывaть oкнa
		close = $('.modal__close, #overlay'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
		modal = $('.modal__div'); // все скрытые мoдaльные oкнa

		f = $('.serv__fridge');			// холодос
		w = $('.serv__washing');		// стиралка
		s = $('.serv__stove');			// плита
		d = $('.serv__dishwasher');		// посудомойка
		o = $('.serv__oven');			// духовка
		c = $('.serv__coffeemaker');	// кофемашина

		servBtn = $('.serv__item-btn');	// кнопки в блоках услуг

		schemeItems = $('.scheme__item');	//	блоки в секции scheme
		advantagesItem = $('.advantages__item');	// блоки в секции advantages


		/*	Появление блоков serv__item	*/

	[f, w, s].map(function(item){	// задаём css свойства каждому блоку из массива
		item.css({right: '-200%'});
	});

	[d, o, c].map(function(item){
		item.css({left: '-200%'});
	});
		
	function scrollServAppearance(){		// Функция появления блоков
		if ($(window).scrollTop() > 200) {
				f.css({
					display: 'block'
				})
				.animate({
					right: 0
				}, 1000, function(){
					servBtn.fadeIn(1000);
				});
				
				w.css({
					display: 'block'
				})
				.animate({
					right: 0
				}, 1200, function(){
					servBtn.fadeIn(1000);
				});
				
				s.css({
					display: 'block'
				})
				.animate({
					right: 0
				}, 1400, function(){
					servBtn.fadeIn(1000);
				});
				
				d.css({
					display: 'block'
				})
				.animate({
					display: 'block',
					left: 0
				}, 1400, function(){
					servBtn.fadeIn(1000);
				});
				
				o.css({
					display: 'block'
				})
				.animate({
					display: 'block',
					left: 0
				}, 1200, function(){
					servBtn.fadeIn(1000);
				});
				
				c.css({
					display: 'block'
				})
				.animate({
					display: 'block',
					left: 0
				}, 1000, function(){
					servBtn.fadeIn(1000);
				});
		}
	}
	scrollServAppearance();			// Вызываем 1 раз после загрузки/обновления страницы.
	$(document).on("scroll", scrollServAppearance);	// Вызываем при скролле


		/*	Появление блоков scheme__item	*/

	function scrollSchemeAppearence(){
		if ($(window).scrollTop() > 1200){
			schemeItems.fadeIn(1500);			
		}
	}
	scrollSchemeAppearence()
	$(document).on("scroll", scrollSchemeAppearence);


		/*	Появление блоков advantages__item	*/

		function scrollАdvantagesAppearence(){
			if ($(window).scrollTop() > 2100){
				advantagesItem.fadeIn(1500);			
			}
		}
		scrollАdvantagesAppearence()
		$(document).on("scroll", scrollАdvantagesAppearence);
	

		/*	Перемещение по странице через меню	*/

	$("#menu").on("click", "a", function (event){
		event.preventDefault();
		let id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html')
			.animate({ opacity: 0 }, 600)
			.animate({ scrollTop: top }, 0)
			.animate({ opacity: 1 }, 600)
		if (document.documentElement.clientWidth < 800) {
			$('.menu ul').fadeOut();
		}
	});


		/*	Скрываем/показываем меню бургера	*/

	$('.header__btn-menu').on('click', function(){
		$('.menu ul').slideToggle();
	});


		/*	Модальное окно. Открытие/закрытие. */

	open__modal.click(function(event){ // лoвим клик пo ссылке с клaссoм open__modal
		event.preventDefault(); // вырубaем стaндaртнoе пoведение
		overlay.fadeIn(400, //пoкaзывaем oверлэй
			function () { // пoсле oкoнчaния пoкaзывaния oверлэя
				$('#modal1') // берем стрoку с селектoрoм и делaем из нее jquery oбъект
					.css('display', 'block')
					.animate({ opacity: 1, top: '30%' }, 300) // плaвнo пoкaзывaем
			});
	});

	close.click(function(){ // лoвим клик пo крестику или oверлэю
		modal.animate({ opacity: 0, top: '0%' }, 300, // плaвнo прячем
			function () { // пoсле этoгo
				$(this).css('display', 'none')
				overlay.fadeOut(400) // прячем пoдлoжку
			}
		)
	});


		/*	Отправка заявки через форму	*/

	$("form")
		.submit(function(){
			let th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize()
			})
				.done(function(){

					if ($(overlay).css('display') == "block") {
						modal.animate({ opacity: 0, top: '0%' }, 300,
							function () {
								$(this).css('display', 'none')
								$('#modal2')
									.css('display', 'block')
									.animate({ opacity: 1 }, 400)
							}
						);
					}
					else if ($(overlay).css('display') == "none") {
						overlay.fadeIn(400, //пoкaзывaем oверлэй
							function () {
								$('#modal2')
									.css('display', 'block')
									.animate({ opacity: 1 }, 400) // плaвнo пoкaзывaем
							});
					}

					setTimeout(function(){
						th.trigger("reset");
					}, 1000);

				});
			return false;
		});

});
