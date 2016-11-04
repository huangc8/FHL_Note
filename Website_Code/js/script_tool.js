$(document).ready(function() { 

	// overall
	var c_engs;	// current page
	var c_chap; // current chapter
	var c_sec;	// current section
		
	start();
});

	function start(){
		toolMain();
		initialize();
	}
	
	// main function for catalog page
	function toolMain(){
		// read current engs & chap
		var line = window.location.search.substring(1);
		if(line != ""){
			var bc = line.split("&");
			c_engs = bc[0];
			c_chap = bc[1];
			c_sec = bc[2];
		}else{
			c_engs = "1Co";
			c_chap = "13";
			c_sec = "13";
		}
		loadVerse();
	}
	
	// initialize
	function initialize(){
		document.getElementById("cn").onclick = function() {	// 取消	
			var tmp = c_engs + "&" + c_chap;
			goMainPage(tmp);
		};
	}
	
	// load verse to the tool page
	function loadVerse(response){
		if(typeof response == "undefined"){
			var url = "http://bible.fhl.net/json/qb.php";
			var request = url + "?chineses=" + engsToChineses(c_engs) + "&chap=" + c_chap + "&sec=" + c_sec + "&version=nstrunv&strong=0&gb=0";
			sendJSONRequest(request, "lv");
		}else{
			var obj = JSON.parse(response);
			var count = obj.record_count;
			document.getElementById("vt").innerHTML = engsToTitle(c_engs) + " " + c_chap + "章" + c_sec + "節"; 
			document.getElementById("v").innerHTML = obj.record[0].bible_text;
			//document.getElementById("ct").innerHTML = response;
		}
	}
	
		// go to the main page
	function goMainPage(request){
		window.location.href = "index.html?" + request;
	}