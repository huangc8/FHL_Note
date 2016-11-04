$(document).ready(function() { 

	// overall
	var c_engs;	// current book
	var c_chap; // current chapter	
	
	
	// verse
	var c_verse; // current verse
	var c_sec; 	// verse section
	
	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('header').outerHeight();
	
	start();
	
	// scroll function
	$(window).scroll(function(event){
		didScroll = true;
	});
	
	// for scroll function
	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);
	
	// action react to scroll 
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
			hideSideOptions();
			document.getElementById("check").checked = false;
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.header').removeClass('header-hide').addClass('header-show');
				if($('.footer').css('bottom') != "0px"){
					showSideOptions(); // whether show side bar depend on whether header is shown
				}
			}
		}
		
		lastScrollTop = st;
	}
});

	function start(){
		initialize();
		indexMain();
		
	}
	
	// initialize
	function initialize(){
		document.getElementById("cat").onclick = function() {goCatalogPage()};
		document.getElementById("t1").onclick = function() {goToolPage()};
		document.getElementById("t2").onclick = function() {goToolPage()};
		document.getElementById("t3").onclick = function() {goToolPage()};
		document.getElementById("t4").onclick = function() {goToolPage()};
		document.getElementById("t5").onclick = function() {goToolPage()};
	}
	
	// main function for main page
	function indexMain(){
		var line = window.location.search.substring(1);
		if(line != ""){
			var bc = line.split("&");
			c_engs = bc[0];
			c_chap = bc[1];
		}else{
			c_engs = "1Co";
			c_chap = "13";
		}
		loadVerse();
	}
	
	// load verse to the main page
	function loadVerse(response){
		if(typeof response == "undefined"){
			var url = "http://bible.fhl.net/json/qb.php";
			var request = url + "?chineses=" + engsToChineses(c_engs) + "&chap=" + c_chap + "&sec=0&version=nstrunv&strong=0&gb=0";
			sendJSONRequest(request, "lv");
		}else{
			var obj = JSON.parse(response);
			var count = obj.record_count;
			document.getElementById("t").innerHTML = engsToTitle(c_engs) + " " + c_chap + "章"; 
			for(i=0; i < count; i++){
				addVerse(obj.record[i].sec, obj.record[i].bible_text);
			}
			//document.getElementById("ct").innerHTML = response;
		}
	}
	
	// add verse to main page paragraph
	function addVerse(sec, bt){
		var temp_verse = document.createElement("a");
		temp_verse.value = sec;
		temp_verse.innerHTML = bt;
		temp_verse.style.cssText = 'textDecoration:none;color:black;font-size:x-large;-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;';
		temp_verse.addEventListener('click', function(){
			clickVerse(this);
		});
		document.getElementById("verses").appendChild(temp_verse);
	}
	
	// click on a verse
	function clickVerse(obj){
		
		// different 
		if(typeof c_verse == "undefined" || c_verse.value != obj.value){
			if(typeof c_verse != "undefined"){
				c_verse.style.textDecoration = "none";
			}
			showFooter();
			obj.style.textDecoration = "underline";
			c_verse = obj;
		}else{ // same
			if($('.footer').css('bottom') == "0px"){
				hideFooter();
				obj.style.textDecoration = "none";
			}else{
				showFooter();
				obj.style.textDecoration = "underline";
			}
		}
		
		c_sec = obj.value;
	}
	
	// hide the footer bar
	function hideFooter(){
		$('.footer').removeClass('footer-show').addClass('footer-hide');
		if($('.header').css('top') == "0px"){
			showSideOptions(); // whether show side bar depend on whether header is shown
		}
	}
	
	// show the footer bar
	function showFooter(){
		$('.footer').removeClass('footer-hide').addClass('footer-show');
		hideSideOptions();
	}
	
	// hide sideOptions bar
	function hideSideOptions(){
		$('#sideOptions-central').removeClass('sideOptions-show').addClass('sideOptions-hide');
		$('#side_01').removeClass('sideOptions-show').addClass('sideOptions-hide');
		$('#side_02').removeClass('sideOptions-show').addClass('sideOptions-hide');
		$('#side_03').removeClass('sideOptions-show').addClass('sideOptions-hide');
		$('#side_04').removeClass('sideOptions-show').addClass('sideOptions-hide');
	}
	
	// show sideOptions bar
	function showSideOptions(){
		$('#sideOptions-central').removeClass('sideOptions-hide').addClass('sideOptions-show');
		$('#side_01').removeClass('sideOptions-hide').addClass('sideOptions-show');
		$('#side_02').removeClass('sideOptions-hide').addClass('sideOptions-show');
		$('#side_03').removeClass('sideOptions-hide').addClass('sideOptions-show');
		$('#side_04').removeClass('sideOptions-hide').addClass('sideOptions-show');	
	}
	
	// go to the tool page
	function goToolPage(){
		window.location.href = "tool.html?" + c_engs + "&" + c_chap + "&" + c_sec;
	}
	
	// go to the main page
	function goCatalogPage(){
		window.location.href = "catalog.html?" + c_engs + "&" + c_chap;
	}