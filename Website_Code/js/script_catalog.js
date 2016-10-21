$(document).ready(function() { 

	// overall
	var c_engs;	// current page
	var c_chap; // current chapter
	var s_engs; // selected engs
	var s_chap; // selected chapter
		
	start();
});

	function start(){
		initialize();
		catalogMain();
	}
	
	// initialize
	function initialize(){
		// set button function
		document.getElementById("toBook").onclick = function() {openBookSelect()};
		document.getElementById("toChap").onclick = function() {openChapSelect()};
		document.getElementById("cn").onclick = function() {
			var tmp = c_engs + "&" + c_chap;
			goMainPage(tmp);
		};
	}
	
	// main function for catalog page
	function catalogMain(){
		// read current engs & chap
		var line = window.location.search.substring(1);
		if(line != ""){
			var bc = line.split("&");
			c_engs = bc[0];
			c_chap = bc[1];
		}
	}
	
	// a book is selected
	function bookSelected(obj){
		
		// record selected book
		s_engs = obj.id;
		
		// change title
		document.getElementById("st").innerHTML = obj.innerHTML;

		// create chapter list
		var n = parseInt(obj.name);
		var nl = document.getElementById("num_list");
		nl.innerHTML = "";
		for(i = 0; i < n; i++){
			var temp_num = document.createElement("li");
			temp_num.style.cssText = 'textDecoration:none;color:black;font-size:x-large;-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;';
			temp_num.click( function(){
				chapSelected(this);
			});
			temp_num.innerHTML = "<a onclick='chapSelected(this)'>" + (i+1) + "</a>";
			nl.appendChild(temp_num);
		}
		
		openChapSelect();
	}	
	
	// a chapter is selected
	function chapSelected(obj){
		s_chap = obj.innerHTML;
		var tmp = s_engs + "&" + s_chap;
		goMainPage(tmp);
	}
	
	// open book select panel
	function openBookSelect(){
		document.getElementById("book_list").style.display = "table";
		document.getElementById("num_list").style.display = "none";
	}	

	// open chap select panel
	function openChapSelect(){
		document.getElementById("book_list").style.display = "none";
		document.getElementById("num_list").style.display = "table";
	}

	// go to the main page
	function goMainPage(request){
		window.location.href = "index.html?" + request;
	}