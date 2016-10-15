$(document).ready(function() { 

	// overall
	var c_page;	// current page
	var s_engs; /// selected engs
	var s_chap; // selected chap
	
	// verse
	var c_verse; // current verse
	
	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('header').outerHeight();
	
	start();
	
	// scroll function
	$(window).scroll(function(event){
		if(c_page == "index.html"){
			didScroll = true;
		}
	});
	
	// for scroll function
	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);
	
});

	function start(){
		var path = window.location.pathname;
		var page = path.split("/").pop();
		c_page = page;
		
		switch(page){
			// main page
			case "index.html":
				indexMain();
			break;
			// catalog page
			case "catalog.html":
				catalogMain();
			break;
			default:
				console.log("Error: no such page");
		}
	}
	
	// initialize
	function initial(){
		
	}
	
	// main function for main page
	function indexMain(){
		loadVerse();
	}
	
	// main function for catalog page
	function catalogMain(){
		
	}
	
	// change between book and section
	function catalogSelectChange(){
		console.log("Hi");
	}
	
	// a book is selected
	function bookSelected(obj){
		s_chap = obj.id;
		document.getElementById("book_list").style.display = "none";
		var n = parseInt(obj.name);
		var ls = document.getElementById("num_list");
		for(i = 0; i < n; i++){
			var temp_num = document.createElement("li");
			temp_num.innerHTML = i;
			temp_num.style.cssText = 'textDecoration:none;color:black;font-size:x-large;-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;';
			temp_num.onclick = chapSelected;
			ls.appendChild(temp_num);
		}
	}	
	
	// a chapter is selected
	function chapSelected(obj){
		
	}
	
	// send JSON request, type: lv-load_verse
	function sendJSONRequest(request, type){
		var xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange=function() {
			if (this.readyState == 4 && this.status == 200) {
				parseJSONResponse(this.responseText, type);
			}
		}

		xmlhttp.open("GET", request, true);
		xmlhttp.send();
	}
	
	// parse JSON response
	function parseJSONResponse(response, type) {
		switch(type){
			case "lv": 
				loadVerse(response);
				break;
			default:
				console.log("parseJSONResponse Error: 404 switch statment");
		}
	}
	
	// load verse to the main page
	function loadVerse(response){
		if(typeof response == "undefined"){
			var url = "http://bible.fhl.net/json/qb.php";
			var request = url + "?chineses=林前&chap=13&sec=0&version=nstrunv&strong=0&gb=0";
			sendJSONRequest(request, "lv");
		}else{
			var obj = JSON.parse(response);
			var count = obj.record_count;
			document.getElementById("t").innerHTML = obj.record[0].chineses + obj.record[0].chap;
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