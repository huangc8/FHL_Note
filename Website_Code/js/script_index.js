$(document).ready(function() { 

	// overall
	var c_engs;	// current book
	var c_chap; // current chapter	
		
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
	
	function engsToChineses(book){
		switch(book){
			case "Ge": return "創";
			break;
			case "Ex": return "出";
			break;
			case "Le": return "利";
			break;
			case "Nu": return "民";
			break;
			case "De": return "申";
			break;
			case "Jos": return "書";
			break;
			case "Jud": return "士";
			break;
			case "Ru": return "得";
			break;
			case "1Sa": return "撒上";
			break;
			case "2Sa": return "撒下";
			break;
			case "1Ki": return "王上";
			break;
			case "2Ki": return "王下";
			break;
			case "1Ch": return "代上";
			break; 
			case "2Ch": return "代下";
			break;
			case "Ezr": return "拉";
			break;
			case "Ne": return "尼";
			break;
			case "Es": return "斯";
			break;
			case "Job": return "伯";
			break;
			case "Ps": return "詩";
			break;
			case "Pr": return "箴";
			break;
			case "Ec": return "傳";
			break;
			case "So": return "歌";
			break;
			case "Isa": return "賽";
			break;
			case "Jer": return "耶";
			break;
			case "La": return "哀";
			break;
			case "Eze": return "結";
			break;
			case "Da": return "但";
			break;
			case "Ho": return "何";
			break;
			case "Joe": return "珥";
			break;
			case "Am": return "摩";
			break;
			case "Ob": return "俄";
			break;
			case "Jon": return "拿";
			break;
			case "Mic": return "彌";
			break;
			case "Na": return "鴻";
			break;
			case "Hab": return "哈";
			break;
			case "Zep": return "番";
			break;
			case "Hag": return "該";
			break;
			case "Zec": return "亞";
			break;
			case "Mal": return "瑪";
			break;
			case "Mt": return "太";
			break;
			case "Mr": return "可";
			break;
			case "Lu": return "路";
			break;
			case "Joh": return "約";
			break;
			case "Ac": return "徒";
			break;
			case "Ro": return "羅";
			break;
			case "1Co": return "林前";
			break;
			case "2Co": return "林後";
			break;
			case "Ga": return "加";
			break;
			case "Eph": return "弗";
			break;
			case "Php": return "腓";
			break;
			case "Col": return "西";
			break;
			case "1Th": return "帖前";
			break;
			case "2Th": return "帖後";
			break;
			case "1Ti": return "提前";
			break;
			case "2Ti": return "提後";
			break;
			case "Tit": return "多";
			break;
			case "Phm": return "門";
			break;
			case "Heb": return "來";
			break;
			case "Jas": return "雅";
			break;
			case "1Pe": return "彼前";
			break;
			case "2Pe": return "彼後";
			break;
			case "1Jo": return "約壹";
			break;
			case "2Jo": return "約貳";
			break;
			case "3Jo": return "約參";
			break;
			case "Jude": return "猶";
			break;
			case "Re": return "啟";
			break;
		}
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
			var request = url + "?chineses=" + engsToChineses(c_engs) + "&chap=" + c_chap + "&sec=0&version=nstrunv&strong=0&gb=0";
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
	
	// go to the main page
	function goCatalogPage(){
		window.location.href = "catalog.html?" + c_engs + "&" + c_chap;
	}