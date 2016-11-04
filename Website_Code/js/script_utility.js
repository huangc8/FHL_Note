
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

// tranlate from engs to chineses
function engsToChineses(book){
	var b = findBook(book);
	return bibleData[b][3];
}

// tranlate from engs to chinese title	
function engsToTitle(book){
	var b = findBook(book);
	return bibleData[b][4];
}

// get chapter number
function getChapterNum(book){
	var b = findBook(book);
	return bibleData[b][0];
}

// find the book data index
function findBook(book){
	for(i = 0; i < bibleData.length; i++){
		if(book === bibleData[i][5]){
			return i;
		}
	}
}

// bible book data
const bibleData = [
[50, "Gen", "Genesis", "創", "創世記", "Ge"],
[40, "Ex", "Exodus", "出", "出埃及記", "Ex"],
[27, "Lev", "Leviticus", "利", "利未記", "Le"],
[36, "Num", "Numbers", "民", "民數記", "Nu"],
[34,"Deut","Deuteronomy","申","申命記","De"],
[24,"Josh","Joshua","書","約書亞記","Jos"],
[21,"Judg","Judges","士","士師記","Jud"],
[4,"Ruth","Ruth","得","路得記","Ru"],
[31,"1 Sam","First Samuel","撒上","撒母耳記上","1Sa"],
[24,"2 Sam","Second Samuel","撒下","撒母耳記下","2Sa"],
[22,"1 Kin","First Kings","王上","列王紀上","1Ki"],
[25,"2 Kin","Second Kings","王下","列王紀下","2Ki"],
[29,"1 Chr","First Chronicles","代上","歷代志上","1Ch"],
[36,"2 Chr","Second Chronicles","代下","歷代志下","2Ch"],
[10,"Ezra","Ezra","拉","以斯拉記","Ezr"],
[13,"Neh","Nehemiah","尼","尼希米記","Ne"],
[10,"Esth","Esther","斯","以斯帖記","Es"],
[42,"Job","Job","伯","約伯記","Job"],
[150,"Ps","Psalms","詩","詩篇","Ps"],
[31,"Prov","Proverbs","箴","箴言","Pr"],
[12,"Eccl","Ecclesiastes","傳","傳道書","Ec"],
[8,"Song","Song of Solomon","歌","雅歌","So"],
[66,"Is","Isaiah","賽","以賽亞書","Isa"],
[52,"Jer","Jeremiah","耶","耶利米書","Jer"],
[5,"Lam","Lamentations","哀","耶利米哀歌","La"],
[48,"Ezek","Ezekiel","結","以西結書","Eze"],
[12,"Dan","Daniel","但","但以理書","Da"],
[14,"Hos","Hosea","何","何西阿書","Ho"],
[3,"Joel","Joel","珥","約珥書","Joe"],
[9,"Amos","Amos","摩","阿摩司書","Am"],
[1,"Obad","Obadiah","俄","俄巴底亞書","Ob"],
[4,"Jon","Jonah","拿","約拿書","Jon"],
[7,"Mic","Micah","彌","彌迦書","Mic"],
[3,"Nah","Nahum","鴻","那鴻書","Na"],
[3,"Hab","Habakkuk","哈","哈巴谷書","Hab"],
[3,"Zeph","Zephaniah","番","西番雅書","Zep"],
[2,"Hag","Haggai","該","哈該書","Hag"],
[14,"Zech","Zechariah","亞","撒迦利亞書","Zec"],
[4,"Mal","Malachi","瑪","瑪拉基書","Mal"],
[28,"Matt","Matthew","太","馬太福音","Mt"],
[16,"Mark","Mark","可","馬可福音","Mr"],
[24,"Luke","Luke","路","路加福音","Lu"],
[21,"John","John","約","約翰福音","Joh"],
[28,"Acts","Acts","徒","使徒行傳","Ac"],
[16,"Rom","Romans","羅","羅馬書","Ro"],
[16,"1 Cor","First Corinthians","林前","哥林多前書","1Co"],
[13,"2 Cor","Second Corinthians","林後","哥林多後書","2Co"],
[6,"Gal","Galatians","加","加拉太書","Ga"],
[6,"Eph","Ephesians","弗","以弗所書","Eph"],
[4,"Phil","Philippians","腓","腓立比書","Php"],
[4,"Col","Colossians","西","歌羅西書","Col"],
[5,"1 Thess","First Thessalonians","帖前","帖撒羅尼迦前書","1Th"],
[3,"2 Thess","Second Thessalonians","帖後","帖撒羅尼迦後書","2Th"],
[6,"1 Tim","First Timothy","提前","提摩太前書","1Ti"],
[4,"2 Tim","Second Timothy","提後","提摩太後書","2Ti"],
[3,"Titus","Titus","多","提多書","Tit"],
[1,"Philem","Philemon","門","腓利門書","Phm"],
[13,"Heb","Hebrews","來","希伯來書","Heb"],
[5,"James","James","雅","雅各書","Jas"],
[5,"1 Pet","First Peter","彼前","彼得前書","1Pe"],
[3,"2 Pet","Second Peter","彼後","彼得後書","2Pe"],
[5,"1 John","First John","約一","約翰一書","1Jo"],
[1,"2 John","Second John","約二","約翰二書","2Jo"],
[1,"3 John","Third John","約三","約翰三書","3Jo"],
[1,"Jude","Jude","猶","猶大書","Jude"],
[22,"Rev","Revelation","啟","啟示錄","Re"]
]; 