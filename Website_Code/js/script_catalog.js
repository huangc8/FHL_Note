$(document).ready(function() { 

	// overall
	var c_engs;	// current page
	var c_chap; // current chapter
	var s_engs; // selected engs
	var s_chap; // selected chapter
	var storage; // storage available
	var sav_history;
		
	start();
});

	function start(){
		catalogMain();
		initialize();
	}
	
	// main function for catalog page
	function catalogMain(){
		// read current engs & chap
		var line = window.location.search.substring(1);
		if(line != ""){
			var bc = line.split("&");
			c_engs = bc[0];
			s_engs = bc[0];
			c_chap = bc[1];
		}
	}
	
	// initialize
	function initialize(){
		// set buttons function
		document.getElementById("toBook").onclick = function() {openSelectPanel("b")}; 	// 書本
		document.getElementById("toChap").onclick = function() {openSelectPanel("c")}; 	// 章節
		document.getElementById("hs").onclick = function() {openSelectPanel("h")};		// 歷史
		document.getElementById("cn").onclick = function() {					   		// 取消	
			var tmp = c_engs + "&" + c_chap;
			goMainPage(tmp);
		};
		
		// set book list
		var bl = document.getElementById("book_list");
		var tt1 = document.createElement("h1");
		tt1.innerHTML = "舊約";
		bl.appendChild(tt1);
		for(i = 0; i < bibleData.length; i++){
			if(i == 39){
				var tt2 = document.createElement("h1");
				tt2.innerHTML = "新約";
				bl.appendChild(tt2);
			}
			var temp_num = document.createElement("li");
			temp_num.innerHTML = "<a id=" + bibleData[i][5] +" name=" + bibleData[i][0] + " onclick='bookSelected(this)' class='book'>" + bibleData[i][4] + "</a>";
			bl.appendChild(temp_num);
		}
		
		// set storage availability
		if(typeof(Storage) !== "undefined"){
			storage = true;
			loadHistory();
		}else{
			console.log("No local storage.");
		}
		
		// set title
		if(c_engs){
			document.getElementById("st").innerHTML = engsToTitle(c_engs) + " " + c_chap + "章";
		}
		
		// set chapter
		var n = getChapterNum(c_engs);
		openChapter(n);		
	}

	// save history
	function saveHistory(bc){
		if(storage){
			for(var i = sav_history.length; i--;) {
				if(sav_history[i] === bc) {
					sav_history.splice(i, 1);
				}
			}
			
			if(sav_history.length > 20){
				sav_history.shift();
			}
			sav_history.push(bc);
			localStorage.setItem("history", sav_history);
		}
	}
	
	// load history
	function loadHistory(){
		// load history to sav_history
		if(localStorage.getItem("history")){	
			var str = localStorage.getItem("history");
			sav_history = str.split(",");
		}else{
			sav_history = [];
		}
	}
		
	// a book is selected
	function bookSelected(obj){
		
		// record selected book
		s_engs = obj.id;
		
		// change title
		document.getElementById("st").innerHTML = obj.innerHTML;
		var n = parseInt(obj.name);

		openChapter(n);
		
		openSelectPanel("c");
	}	
	
	// a chapter is selected
	function chapSelected(obj){
		s_chap = obj.innerHTML;
		var tmp = s_engs + "&" + s_chap;
		goMainPage(tmp);
	}
	
	// a history is selected
	function historySelected(vn){
		goMainPage(sav_history[vn]);
	}
	
	// open different selection panel
	function openSelectPanel(typ){
		switch(typ){
			case "b":
				document.getElementById("book_list").style.display = "table";
				document.getElementById("num_list").style.display = "none";
				document.getElementById("hst_list").style.display = "none";
			break;
			case "c":
				document.getElementById("book_list").style.display = "none";
				document.getElementById("num_list").style.display = "table";
				document.getElementById("hst_list").style.display = "none";
			break;
			case "h":
				openHistory();
				document.getElementById("book_list").style.display = "none";
				document.getElementById("num_list").style.display = "none";
				document.getElementById("hst_list").style.display = "table";
			break;
		}
	}

	// open chapter 
	function openChapter(n){
		// create chapter list
		var nl = document.getElementById("num_list");
		nl.innerHTML = "";
		for(i = 0; i < n; i++){
			var temp_num = document.createElement("li");
			temp_num.style.cssText = 'textDecoration:none;color:black;font-size:x-large;-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;';
			temp_num.innerHTML = "<a onclick='chapSelected(this)'>" + (i+1) + "</a>";
			nl.appendChild(temp_num);
		}
	}
	
	// open history panel
	function openHistory(){
		var hl = document.getElementById("hst_list");
		hl.innerHTML = "";
		if(sav_history.length > 0){
			for(i = sav_history.length; i--;){
				var temp_hv = document.createElement("li");
				temp_hv.style.cssText = 'textDecoration:none;color:black;font-size:x-large;-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;';
				temp_hv.value = i;
				var str = sav_history[i].split("&");
				temp_hv.innerHTML = "<a onclick='historySelected(" + i + ")'>" + engsToTitle(str[0]) + " " + str[1] + "章</a>";
				hl.appendChild(temp_hv);
			}
		}else{
			var temp = document.createElement("li");
			temp.innerHTML = "No History";
			hl.appendChild(temp);
		}
	}
	
	// go to the main page
	function goMainPage(request){
		saveHistory(request);
		window.location.href = "index.html?" + request;
	}