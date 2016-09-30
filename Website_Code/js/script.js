$(function() { 
<!-- json part -->
	var xmlhttp = new XMLHttpRequest();
	var url = "http://bible.fhl.net/json/qb.php";
	
	xmlhttp.onreadystatechange=function() {
		if (this.readyState == 4 && this.status == 200) {
			parseResponse(this.responseText);
		}
	}

	var request = url + "?chineses=林前&chap=13&sec=0&version=nstrunv&strong=0&gb=0";

	xmlhttp.open("GET", request, true);
	xmlhttp.send();

	function parseResponse(response) {
		obj = JSON.parse(response);
		var count = obj.record_count;
		document.getElementById("t").innerHTML = obj.record[0].chineses + obj.record[0].chap;
		for(i=0; i < count; i++){
			add("button", obj.record[i].chap, obj.record[i].bible_text);
		}
		
		//document.getElementById("ct").innerHTML = response;
	}
	
	function add(typ, nm, val) {
		var element = document.createElement("input");
		element.type = typ;
		element.name = nm;
		element.value = val;
		element.onclick = function() {
			
		};
		
		var pg = document.getElementById("ct");
		pg.appendChild(element);
	}
	
<!-- json part end -->
	
<!-- header part -->
	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('header').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();
		
		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;

		// If they scrolled down and are past the navbar, add class .header-hide.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('.header').removeClass('header-show').addClass('header-hide');
			$('#central').removeClass('link-show').addClass('link-hide');
			$('#link_01').removeClass('link-show').addClass('link-hide');
			$('#link_02').removeClass('link-show').addClass('link-hide');
			$('#link_03').removeClass('link-show').addClass('link-hide');
			$('#link_04').removeClass('link-show').addClass('link-hide');
			document.getElementById("check").checked = false;
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.header').removeClass('header-hide').addClass('header-show');
				$('#central').removeClass('link-hide').addClass('link-show');
				$('#link_01').removeClass('link-hide').addClass('link-show');
				$('#link_02').removeClass('link-hide').addClass('link-show');
				$('#link_03').removeClass('link-hide').addClass('link-show');
				$('#link_04').removeClass('link-hide').addClass('link-show');
			}
		}
		
		lastScrollTop = st;
	}
	<!-- header part end -->
});