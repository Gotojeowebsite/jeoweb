;(function(){
	window.ISO639_1TOISO639_2T = {/*specific cases -> */"locale_ISO639_1":"locale_ISO639_2T","fil":"fil","tw":"zh2","vn":"vie",/* <- specific cases*/"af":"afr","am":"amh","ar":"ara","as":"asm","az":"aze","be":"bel","bg":"bul","bn":"ben","bo":"bod","bs":"bos","ca":"cat","cs":"ces","cy":"cym","da":"dan","de":"deu","dv":"div","el":"ell","en":"eng","es":"spa","et":"est","eu":"eus","fa":"fas","fi":"fin","fo":"fao","fr":"fra","gd":"gla","gl":"glg","gn":"grn","gu":"guj","he":"heb","hi":"hin","hr":"hrv","hu":"hun","hy":"hye","id":"ind","is":"isl","it":"ita","ja":"jpn","ka":"kat","kk":"kaz","km":"khm","kn":"kan","ko":"kor","ks":"kas","la":"lat","lo":"lao","lt":"lit","lv":"lav","mi":"mri","mk":"mkd","ml":"mal","mn":"mon","mr":"mar","ms":"msa","mt":"mlt","my":"mya","nb":"nob","ne":"nep","nl":"nld","nn":"nno","no":"nor","or":"ori","pa":"pan","pl":"pol","pt":"por","rm":"roh","ro":"ron","ru":"rus","sa":"san","sd":"snd","si":"sin","sk":"slk","sl":"slv","so":"som","sq":"sqi","sr":"srp","sv":"swe","sw":"swa","ta":"tam","te":"tel","tg":"tgk","th":"tha","tk":"tuk","tn":"tsn","tr":"tur","ts":"tso","tt":"tat","uk":"ukr","ur":"urd","uz":"uzb","vi":"vie","xh":"xho","yi":"yid","zh":"zho","zu":"zul"}
	
	var LOCALE_DEFAULT = 'en';
	window.isoLang = {};
	
	isoLang.getFirstLanguage = function(){
		if(typeof(navigator) == "undefined") return ISO639_1TOISO639_2T[LOCALE_DEFAULT];
		if(typeof(navigator.languages) == "undefined") return ISO639_1TOISO639_2T[LOCALE_DEFAULT];
		if(navigator.languages.length <= 0) return ISO639_1TOISO639_2T[LOCALE_DEFAULT];
	
		return ISO639_1TOISO639_2T[navigator.languages[0]] || ISO639_1TOISO639_2T[navigator.languages[0].split(/-/)[0]] || ISO639_1TOISO639_2T[LOCALE_DEFAULT];
	}
	
	isoLang.getGoodLanguage = function(languageSupported){
		if(typeof(navigator) == "undefined") return ISO639_1TOISO639_2T[LOCALE_DEFAULT];
		if(typeof(navigator.languages) == "undefined") return ISO639_1TOISO639_2T[LOCALE_DEFAULT];
		var arrayLanguage = navigator.languages;
		if(navigator.languages.length <= 0) {
			arrayLanguage.push(navigator.language.split(/-/)[0]);
		}
		if(navigator.languages.length <= 0) {return ISO639_1TOISO639_2T[LOCALE_DEFAULT];}
	
		languageSupported = languageSupported.split(",");
		// force 2 letters
		languageSupported = languageSupported.map(function(a){return isoLang.get2LettersLangWith3Letters(a)});
		for(var i =0;i < navigator.languages.length;i++){
			for(var y =0;y < languageSupported.length;y++){
				if(languageSupported[y] === navigator.languages[i] || languageSupported[y] === navigator.languages[i].split(/-/)[0]){
					return ISO639_1TOISO639_2T[navigator.languages[i]] || ISO639_1TOISO639_2T[navigator.languages[i].split(/-/)[0]] || ISO639_1TOISO639_2T[LOCALE_DEFAULT];
				}
			}
		}
		return ISO639_1TOISO639_2T[LOCALE_DEFAULT];
	}
	
	isoLang.get2LettersLangWith3Letters = function(lang){
		for(var i in ISO639_1TOISO639_2T){
			if(lang == ISO639_1TOISO639_2T[i]){
				return i;
			}
			if(lang == i){return i;}
		}
		return LOCALE_DEFAULT;
	}
	
	isoLang.getDefaultLang = function(){ return LOCALE_DEFAULT;}
	
})();
	