(function(){
	var eventToFire = {};
	window.eventToFire = eventToFire;
	eventToFire.events = {};
	eventToFire.version = 4;
	eventToFire.registerEvent = function(eventName, callback, staticArgs){
		if(typeof eventName !== 'string') return false;
		if(typeof callback !== 'function' && typeof callback !== 'string') return false;
		if(typeof this.events[eventName] === 'undefined')	this.events[eventName] = [];
		this.events[eventName].push({"func":callback, "staticArgs":staticArgs});
		return true;
	};
	if(typeof ce7 !== "function"){
		var ce7_lut = [],ce7 = function(){
			if(typeof window.crypto==="object" && typeof window.crypto.getRandomValues==="function"){var rnd=window.crypto.getRandomValues(new Uint32Array(4)),d0=rnd[0],d1=rnd[1],d2=rnd[2],d3=rnd[3] }else{var d0 = Math.random()*0x100000000>>>0,d1 = Math.random()*0x100000000>>>0,d2 = Math.random()*0x100000000>>>0,d3 = Math.random()*0x100000000>>>0;}
			return ce7_lut[d0&0xff]+ce7_lut[d0>>8&0xff]+ce7_lut[d0>>16&0xff]+ce7_lut[d0>>24&0xff]+'-'+
			ce7_lut[d1&0xff]+ce7_lut[d1>>8&0xff]+'-'+ce7_lut[d1>>16&0x0f|0x40]+ce7_lut[d1>>24&0xff]+'-'+
			ce7_lut[d2&0x3f|0x80]+ce7_lut[d2>>8&0xff]+'-'+ce7_lut[d2>>16&0xff]+ce7_lut[d2>>24&0xff]+
			ce7_lut[d3&0xff]+ce7_lut[d3>>8&0xff]+ce7_lut[d3>>16&0xff]+ce7_lut[d3>>24&0xff];
		};for(var i=0; i<256; i++){ce7_lut[i] = (i<16?'0':'')+(i).toString(16);}
	}
	eventToFire.fireEvent = function(eventName){
		if(typeof eventName !== 'string') return false;
		var eventHandlersToCall = Object.keys(this.events).filter(function(v){var f=v.replace(/\./g, '\\\.'); if(f.indexOf('*')!==-1) f = f.split('*')[0]+".*"; return (new RegExp('^'+f+"$").test(eventName))}).sort(function(a,b){return (b===eventName)?1:(a===eventName)?-1:b.replace('*','').length-a.replace('*','').length;}),eventUID=ce7();
		if(eventHandlersToCall.length === 0) return false;
		for(var i=0; i<eventHandlersToCall.length;i++){
			for(var f=0; f<this.events[eventHandlersToCall[i]].length;f++){
				var func = this.events[eventHandlersToCall[i]][f]["func"];
				if(typeof func === "string") if(typeof window[func] === "function") func = window[func]; else continue;
				var args = [].slice.call(arguments, 1);
				args.push(this.events[eventHandlersToCall[i]][f]["staticArgs"]);
				func.apply({eventName:eventName,eventUID:eventUID,eventHandler:eventHandlersToCall[i],eventToFire:this},args);
			}
		}
		return true;
	};

	eventToFire.getAllEvent = function(){
		return this.events;
	};

	//compatibility playzool/shell
	window.registerEvent = function(eventName, callback, args){
		window.eventToFire.registerEvent(eventName, callback, args);
	}
	window.fireEvent = function(eventName,args){
		window.eventToFire.fireEvent(eventName,args);
	}
}())