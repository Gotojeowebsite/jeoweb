;(function(){
	var PLIBS_VERSION = "1.5.7";
	var PLIBS_TAG = "PLib";
/*********************************************
			Event To Fire
*********************************************/
	if(typeof window.eventToFire === "undefined"){
		var eventToFire = {};

		eventToFire.events = {};
		eventToFire.registerEvent = function(eventName, callback, staticArgs){
			if(typeof(eventName) != 'string') return false;
			if(typeof(callback) != 'function' && typeof(callback) != 'string') return false;
			if(typeof(this.events[eventName]) == 'undefined')	this.events[eventName] = [];
			this.events[eventName].push({"func":callback, "staticArgs":staticArgs});
			return true;
		};
		eventToFire.fireEvent = function(eventName){
			if(typeof(eventName) != 'string') return false;
			if(typeof(this.events[eventName]) == 'undefined') return false;
			for(var i =0; i < this.events[eventName].length;i++){
				var func = this.events[eventName][i]["func"];
				if(typeof func === "string") if(typeof window[func] === "function") func = window[func]; else continue;
				var args = [].slice.call(arguments, 1);
				args.push(this.events[eventName][i]["staticArgs"]);
				func.apply(this,args);
			}
			return true;
		};
		eventToFire.getAllEvent = function(){
			return this.events;
		};

		window.eventToFire = eventToFire;

		//compatibility playzool/shell
		window.registerEvent = function(eventName, callback, args){
			window.eventToFire.registerEvent(eventName, callback, args);
		}
		window.fireEvent = function(eventName,args){
			window.eventToFire.fireEvent(eventName,args);
		}
	}

/*********************************************
			Base converter
*********************************************/
	/*********************************************
				var
	*********************************************/
	var baseConverter = {};
	baseConverter.version = "1.0.2";
	/*********************************************
				function
	*********************************************/
	baseConverter.IntToBase = function(value, base){
		value = parseInt(value);
		var neg = (value<0); value=Math.abs(value);
		return (base>9 && value<10) ? parseInt((value).toString(base)) * (neg ? -1 : 1) : (neg ? "-" : "") + (value).toString(base);
	};
	
	baseConverter.baseToInt = function(value, base){
		if(isNaN(value)){
			var neg = (typeof value[0] !== "undefined" && value[0] === "-");
			return parseInt(value.slice(neg ? 1 : 0), base) * (neg ? -1 : 1);
		}
		return parseInt(value, base);
	};
	
/*********************************************
		Predeterminist Random by seed
*********************************************/
	/*********************************************
				seed Object
	*********************************************/
		/*********************************************
				var
		*********************************************/
		var Seed = function(){
			this.availableEngine = {
				 anonymous:{
					 name:"anonymous"
					,customInit:function(){}
					,getAutoSeed:function(){
						return parseInt(Math.random()*233280);
					}
					,checkSeed:function(val){	//int only, lower than 233280
						if(isNaN(val)) return this.getAutoSeed();
						val = Math.round(parseInt(val));
						if(val>233280) return val%233280;
						return val;
					}
					,getNextValue:function(){
						return (this.value * 9301 + 49297) % 233280;
					 }
					,grow:function(step){
						if(typeof step !== "number" || step%1 !== 0) step = 1;
						while(step) {	this.value = this.getNextValue(); step--; this.step++;	}
					 }
					,random:function(max, min){
						max = max || 1;
						min = min || 0;
						return min + (this.value / 233280) * (max - min);
					 }
				}
				,alea:{
					 name:"alea"
					,customInit:function(){
						this.m = new function() {
							var n = 4022871197;
							return function(r) {
								for(var f, t, s, u = 0, e = 0.02519603282416938; u < r.length; u++)
								s = r.charCodeAt(u), f = (e * (n += s) - (n*e|0)),
								n = 4294967296 * ((t = f * (e*n|0)) - (t|0)) + (t|0);
								return (n|0) * 2.3283064365386963e-10;
							};
						}();
						this.a = this.m(" "); this.b = this.m(" "); this.c = this.m(" "); this.y=0;
						this.a -= this.m(this.initialValue), this.b -= this.m(this.initialValue), this.c -= this.m(this.initialValue);
						this.a < 0 && this.a++, this.b < 0 && this.b++, this.c < 0 && this.c++;
					}
					,getAutoSeed:function(){
						return +new Date() + Math.random();
					}
					,checkSeed:function(val){	//tostring
						return val+"";
					}
					,getNextValue:function(){
						var y = this.value * 2.3283064365386963e-10 + this.a * 2091639, a = this.b, b = this.c;
						var value = y|0;
						var c = y - value;
						return c;
					 }
					,grow:function(step){
						if(typeof step !== "number" || step%1 !== 0) step = 1;
						while(step){	
							this.y = this.value * 2.3283064365386963e-10 + this.a * 2091639; 
							this.a = this.b, this.b = this.c;
							this.value = this.y|0;
							this.c = this.y - this.value;
							step--;
							this.step++;
						}
					 }
					,random:function(max, min){
						max = max || 1;
						min = min || 0;
						return min + this.c * (max - min);
					 }
				}
			}
		};
		/*********************************************
					function
		*********************************************/
		Seed.prototype.checkEngine = function(engine) {
			if(typeof engine !== "string" || typeof this.availableEngine[engine] !== "object") return (typeof seedsField !== "undefined" && typeof seedsField.DEFAULT_PRNG_ENGINE !== "undefined") ? seedsField.DEFAULT_PRNG_ENGINE : "anonymous";
			return engine;
		};
		
		Seed.prototype.init = function(seedInitialValue, label, engine) {
			this.engine = this.checkEngine(engine);
			this.initialValue = this.availableEngine[this.engine].checkSeed.apply(this, arguments);
			this.value = (typeof this.initialValue === "number") ? this.initialValue : 1;
			this.step = 0;
			this.label = (typeof label === "string") ? label : "";
			this.availableEngine[this.engine].customInit.apply(this, arguments);
			if(this.label !== "") window.eventToFire.fireEvent("c2:seed_" + this.label + ":init");
			window.eventToFire.fireEvent("c2:seed:init", this);
			return this;
		};
		
		Seed.prototype.getAutoSeed = function() {
			return this.availableEngine[this.engine].getAutoSeed.apply(this, arguments);
		};
		
		Seed.prototype.grow = function(step){
			if(typeof step !== "number" || step%1 !== 0) step = 1;
			//while(step) {	this.value = this.getNextValue(); step--;	}
			this.availableEngine[this.engine].grow.apply(this, arguments);
			if(this.label !== "") window.eventToFire.fireEvent("c2:seed_" + this.label + ":grow", step);
			window.eventToFire.fireEvent("c2:seed:grow", this, step);
			return this;
		};
		
		Seed.prototype.getNextValue = function(){
			return this.availableEngine[this.engine].getNextValue.apply(this, arguments);
			// return (this.value * 9301 + 49297) % 233280;
			// return this.value * 16807 % 2147483647;
		};
		
		Seed.prototype.random = function(max, min, grow){
			if(typeof grow !== "boolean") grow = true;
			if(grow) this.grow();
			var ret = this.availableEngine[this.engine].random.apply(this, arguments);
			// var ret = min + (this.value / 233280) * (max - min);
			// var rnd = this.value / 2147483647, ret = min + rnd * (max - min);
			if(this.label !== "") window.eventToFire.fireEvent("c2:seed_" + this.label + ":random", ret, max, min); 
			window.eventToFire.fireEvent("c2:seed:random", this, ret, max, min);
			return ret;
		};

	/*********************************************
				var
	*********************************************/
	var seedsField = {}
	seedsField.DEFAULT_SEED_NAME = "_defaultSeed";
	seedsField.DEFAULT_PRNG_ENGINE = "anonymous";
	seedsField.version = "1.0.0";
	seedsField.seeds = {};
	/*********************************************
				function
	*********************************************/	
	seedsField.plant = function(seedName, initialValue, engine){
		// if(typeof initialValue !== "number") initialValue = Math.random()*1000000000;
		// if(initialValue%1 !== 0) initialValue = Math.round(initialValue);
		var newSeed = (new Seed()).init(initialValue, seedName, engine);
		if(typeof seedName === "string"){
			this.seeds[seedName] = newSeed;
			window.eventToFire.fireEvent("c2:seedsField:plant", seedName);
			window.eventToFire.fireEvent("c2:seedsField:plant_" + seedName);
		}
		return newSeed;
	};
	
	seedsField.getPlantedSeeds = function(as){
		var toRet = Object.keys(this.seeds);
		if(typeof as !== "string") as = "array";
		switch(as.toLowerCase()){
			case "string":	return toRet.join(',');	break;
			case "json":	return JSON.stringify(toRet);	break;
			default:	return toRet;	break;
		}
	};
	
	seedsField.getAvailableEngines = function(as){
		var toRet = Object.keys((new Seed()).availableEngine);
		if(typeof as !== "string") as = "array";
		switch(as.toLowerCase()){
			case "string":	return toRet.join(',');	break;
			case "json":	return JSON.stringify(toRet);	break;
			default:	return toRet;	break;
		}
	};
	
	seedsField.getSeedStep = function(seedName, defaultRet){
		if(typeof defaultRet === "undefined") defaultRet = false;
		if(typeof seedName !== "string") seedName = this.DEFAULT_SEED_NAME;
		if(typeof this.seeds[seedName] === "undefined") return defaultRet;
		return this.seeds[seedName].step;
	};
	
	seedsField.getSeedInitialValue = function(seedName, defaultRet){
		if(typeof defaultRet === "undefined") defaultRet = false;
		if(typeof seedName !== "string") seedName = this.DEFAULT_SEED_NAME;
		if(typeof this.seeds[seedName] === "undefined") return defaultRet;
		return this.seeds[seedName].initialValue;
	};
	
	seedsField.getSeedCurrentValue = function(seedName, defaultRet){
		if(typeof defaultRet === "undefined") defaultRet = false;
		if(typeof seedName !== "string") seedName = this.DEFAULT_SEED_NAME;
		if(typeof this.seeds[seedName] === "undefined") return defaultRet;
		return this.seeds[seedName].value;
	};
	
	seedsField.getSeedNextValue = function(seedName, defaultRet){
		if(typeof defaultRet === "undefined") defaultRet = false;
		if(typeof seedName !== "string" || seedName === "") seedName = this.DEFAULT_SEED_NAME;
		if(typeof this.seeds[seedName] === "undefined") return defaultRet;
		return this.seeds[seedName].getNextValue();
	};
	
	seedsField.getPrediction = function(seedName, max, min, defaultRet){
		return (typeof seedName === "undefined" || typeof this.seeds[seedName] === "undefined") ? ((typeof defaultRet !== 'undefined') ? defaultRet : false) : (new Seed()).init(this.seeds[seedName].initialValue, undefined, this.seeds[seedName].engine).grow(this.seeds[seedName].step).random(max, min, defaultRet);
	};
	
	seedsField.random = function(seedName, max, min, defaultRet, grow){
		if(typeof defaultRet === "undefined") defaultRet = false;
		if(typeof seedName !== "string" || seedName === "") seedName = this.DEFAULT_SEED_NAME;
		if(typeof this.seeds[seedName] === "undefined") return defaultRet;
		var ret = this.seeds[seedName].random(max, min, grow);
		return ret;
	};
	
	seedsField.getSeedRandomAt = function(seedInitialValue, engine, step, max, min, defaultRet){
		if(typeof defaultRet === "undefined") defaultRet = false;
		if(typeof step !== "number" || step%1 !== 0) step = 0;
		return (new Seed()).init(seedInitialValue, undefined, engine).grow(step).random(max, min);
	};
	
	seedsField.plant(seedsField.DEFAULT_SEED_NAME, undefined, seedsField.DEFAULT_PRNG_ENGINE);
	
/*********************************************
			Version check
*********************************************/
	/*********************************************
				var
	*********************************************/
	var versionChecker = {};
	versionChecker.version = "1.0.1";
	/*********************************************
				function
	*********************************************/
	versionChecker.versionStrToNum = function(str_vers){
		if(typeof str_vers === "undefined") return 0;
		if(typeof str_vers !== "string") str_vers += "";
		var versionSplitted = str_vers.split(".");
		if(versionSplitted.length > 3)  return 0;
		while(versionSplitted.length < 3)  versionSplitted.push(0);
		return versionSplitted[0] * 1000000 + versionSplitted[1] * 1000 + versionSplitted[2] * 1;
	};
	versionChecker.isVersionMin = function(str_vers, min, inclusive){
		if(typeof inclusive !== "boolean") inclusive = true;
		var versionToCheck = this.versionStrToNum(str_vers);
		switch(typeof min){ case "undefined": min = 1; break; case "string": min = this.versionStrToNum(min); break; case "number": break; default: return false; break; }
		return (versionToCheck > min || (inclusive && versionToCheck == min));
	};

/*********************************************
			Array wait For Function
*********************************************/
	/*********************************************
				var
	*********************************************/
	var arrayWaitForFunction = function(){};
	arrayWaitForFunction.prototype.version = "1.1.2";
	arrayWaitForFunction.prototype.tag = "W4F";
	arrayWaitForFunction.prototype.array = [];
	arrayWaitForFunction.prototype.id = 0;
	/*********************************************
				function
	*********************************************/
	arrayWaitForFunction.prototype.update = function(dt){
		for (var i = 0; i < this.array.length; i++) {
			this.array[i].time -= dt;
		};
		this.checkArrayEndOfTime();
	};

	arrayWaitForFunction.prototype.waitForFunction = function(timeToWait,callback,param,persistentLevel){
		//NaN is the only things not equal to itself in javascript
		param = (Number(param) !== Number(param) || param === " ")?param:Number(param);
		this.array.push({
			time:timeToWait,
			callback:callback,
			param:param,
			id:this.id,
			persistentLevel:((typeof(persistentLevel) === "undefined")?0:persistentLevel)
		});
		return this.id++;
	};

	arrayWaitForFunction.prototype.checkArrayEndOfTime = function(){
		var toDestroy;
		for (var i = 0; i < this.array.length; i++) {
			if(this.array[i].time <= 0){
				toDestroy = this.array.splice(i,1)[0];
				break;
			}
		};

		if(typeof(toDestroy) != 'undefined'){
			c2_callFunction(toDestroy.callback,[toDestroy.param], PLIBS_TAG+":"+this.__proto__.tag);
			this.checkArrayEndOfTime();
		}
	};

	arrayWaitForFunction.prototype.clearArrayWait = function(persistentLevel){
		var persistentLevel = ((typeof(persistentLevel) === "undefined")?0:persistentLevel);
		for (var i = this.array.length - 1; i >= 0; i--) {
			if(this.array[i].persistentLevel <= persistentLevel){
				this.array.splice(i,1)[0];
			}
		};
		// this.array = [];
	};

	arrayWaitForFunction.prototype.stopWaitById = function(id){
		for (var i = 0; i < this.array.length; i++) {
			if(this.array[i].id == id){
				this.array.splice(i,1);
				break;
			}
		};
	};

	arrayWaitForFunction.prototype.getTimeUntilEndOf = function(id, defaultTime){
		if(typeof defaultTime === "undefined") defaultTime = -1;
		for (var i = 0; i < this.array.length; i++) {
			if(this.array[i].id == id){
				return this.array[i].time
				break;
			}
		};
		return defaultTime;
	};

	arrayWaitForFunction.prototype.addTimeById = function(id, timeToAdd){
		for (var i = 0; i < this.array.length; i++) {
			if(this.array[i].id == id){
				this.array[i].time += timeToAdd;
				return this.array[i].time;
			}
		};
		return -1;
	};

	arrayWaitForFunction.prototype.startWaitNowById = function(id){
		var toDestroy;
		for (var i = 0; i < this.array.length; i++) {
			if(this.array[i].id == id){
				toDestroy = this.array.splice(i,1)[0];
				break;
			}
		};
		if(typeof(toDestroy) != 'undefined'){
			c2_callFunction(toDestroy.callback,[toDestroy.param], PLIBS_TAG+":"+this.__proto__.tag);
		}
	};

/*********************************************
			Non Finite State Machine
*********************************************/
	/*********************************************
				var
	*********************************************/
	var nfsm = function(){};
	nfsm.prototype.version = "1.0.4";
	nfsm.prototype.tag = "NFSM";
	nfsm.prototype.currentState = "default";
	nfsm.prototype.nextState = "";
	/*********************************************
				function
	*********************************************/
	nfsm.prototype.setCurrentState = function(currentState){
		this.currentState = ""+currentState;
		window.eventToFire.fireEvent("c2:nfsm:setCurrentState",currentState);
	};

	nfsm.prototype.setNext = function(nextState){
		this.nextState = ""+nextState;
		window.eventToFire.fireEvent("c2:nfsm:setNext",nextState);
	};

	nfsm.prototype.next = function(state){
		if(state == undefined || state == ""){
			if(this.nextState == undefined || this.nextState == ""){
				console.error("no next state","next State is required");
				return;
			}
		}else{
			this.setNext(state);
		}
		state = this.nextState;
		var beforeExitActualState = c2_callFunction("beforeExit_"+this.currentState,[this.currentState,state,{current:this.currentState,nextState:state}], PLIBS_TAG+":"+this.__proto__.tag);
		var beforeEnterNextState = c2_callFunction("beforeEnter_"+state,[this.currentState,state,{current:this.currentState,nextState:state,beforeExitResult:beforeExitActualState}], PLIBS_TAG+":"+this.__proto__.tag);
		window.eventToFire.fireEvent("c2:nfsm:nextRequest",{current:this.currentState,current:this.currentState,beforeExit:beforeExitActualState,beforeEnter:beforeEnterNextState}, PLIBS_TAG+":"+this.__proto__.tag);
		if(beforeExitActualState == 0 && beforeEnterNextState == 0){
			c2_callFunction("onExit_"+this.currentState,[this.currentState,state,{current:this.currentState,next:this.nextState}], PLIBS_TAG+":"+this.__proto__.tag);
			var previousState = this.currentState;
			this.currentState = state;
			this.nextState = "";
			window.eventToFire.fireEvent("c2:nfsm:nextSucceed",{previous:this.previousState,current:this.currentState});
			c2_callFunction("onEnter_"+this.currentState,[this.currentState,previousState,{current:this.currentState,previous:previousState}], PLIBS_TAG+":"+this.__proto__.tag);
		}else{
			window.eventToFire.fireEvent("c2:nfsm:nextFailed",{current:this.currentState, rejected:state, next:this.nextState});
			c2_callFunction("onFailExit_"+this.currentState,[this.currentState,state,beforeExitActualState,beforeEnterNextState,{current:this.currentState,nextState:state,beforeExitActualState:beforeExitActualState,beforeEnterNextState:beforeEnterNextState}], PLIBS_TAG+":"+this.__proto__.tag);
			c2_callFunction("onFailEnter_"+state,[this.currentState,state,beforeExitActualState,beforeEnterNextState,{current:this.currentState,nextState:state,beforeExitActualState:beforeExitActualState,beforeEnterNextState:beforeEnterNextState}], PLIBS_TAG+":"+this.__proto__.tag);
		}
		window.eventToFire.fireEvent("c2:nfsm:next", state);
	};

/*********************************************
			Shell Time Notifier
*********************************************/
	/*********************************************
				var
	*********************************************/
	var timeNotifier = function(){};
	timeNotifier.prototype.saveKey = "timeNotifier";
	timeNotifier.prototype.version = "1.0.4";
	timeNotifier.prototype.tag = "TN";
	timeNotifier.prototype.state = {
		ACTIVE			: "active",
		PENDING			: "pending",
		UNACTIVE		: "unactive"
	};
	timeNotifier.prototype.arrayNotif = {};
	/*********************************************
				function
	*********************************************/
	timeNotifier.prototype.init = function() {
		this.load();
		this.checkNotif();
	};
	
	timeNotifier.prototype.getCompressedStr = function(obj) {
		var toRet = {};
		for(var anAC in obj){
			if(!obj.hasOwnProperty(anAC)) continue;
			toRet[anAC] = {};
			if(obj[anAC]["count"] !== 0) toRet[anAC]["c"] = obj[anAC]["count"];
			toRet[anAC]["s"] = baseConverter.IntToBase(obj[anAC]["timeStart"], 36);
			if(obj[anAC]["lastAck"] > -1) toRet[anAC]["a"] = baseConverter.IntToBase(Math.max(0, obj[anAC]["timeStart"] - obj[anAC]["lastAck"]), 36);
			if(obj[anAC]["time"] !== 86400) toRet[anAC]["t"] = baseConverter.IntToBase(obj[anAC]["time"], 36);
			if(obj[anAC]["timeEnd"] - obj[anAC]["time"] * 1000 !== obj[anAC]["timeStart"]) toRet[anAC]["d"] = baseConverter.IntToBase(Math.max(0, obj[anAC]["timeEnd"] - obj[anAC]["timeStart"]), 36);
			if(obj[anAC]["message"] !== "") toRet[anAC]["m"] = obj[anAC]["message"];
			if(obj[anAC]["state"] !== this.state.ACTIVE) toRet[anAC]["e"] = (obj[anAC]["state"] === this.state.UNACTIVE) ? 0 : 1;
		}
		return JSON.stringify(toRet);
	};

	timeNotifier.prototype.getUnCompressedObj = function(objStr) {
		var toRet = {};
		if(typeof objStr === "object"){ obj = objStr; }else{ try{	var obj = JSON.parse(objStr);	}catch(e){	return toRet;	} }
		for(var anAC in obj){
			if(!obj.hasOwnProperty(anAC)) continue;
			if(typeof obj[anAC]["name"] !== "undefined"){ toRet[anAC] = Object.assign({}, obj[anAC]); continue;	}
			toRet[anAC] = {"name":anAC};
			toRet[anAC]["time"] = (typeof obj[anAC]["t"] === "undefined") ? 86400 : baseConverter.baseToInt(obj[anAC]["t"], 36);
			toRet[anAC]["state"] = (typeof obj[anAC]["e"] === "undefined") ? this.state.ACTIVE : ((obj[anAC]["e"] == 0) ? this.state.UNACTIVE : this.state.PENDING);
			toRet[anAC]["message"] = (typeof obj[anAC]["m"] === "undefined") ? "" : obj[anAC]["m"];
			toRet[anAC]["timeStart"] = baseConverter.baseToInt(obj[anAC]["s"], 36);
			toRet[anAC]["lastAck"] = (typeof obj[anAC]["a"] === "undefined") ? -1 : toRet[anAC]["timeStart"] - baseConverter.baseToInt(obj[anAC]["a"], 36);
			toRet[anAC]["timeEnd"] = (typeof obj[anAC]["d"] === "undefined") ? toRet[anAC]["timeStart"] + toRet[anAC]["time"]*1000 : toRet[anAC]["timeStart"] + baseConverter.baseToInt(obj[anAC]["d"], 36);
			toRet[anAC]["count"] = (typeof obj[anAC]["c"] === "undefined") ? 0 : obj[anAC]["c"];
		}
		return toRet;
	};
	
	timeNotifier.prototype.load = function() {
		this.arrayNotif = this.getUnCompressedObj(c2_callFunction("readCustomData",[this.saveKey,"{}"], PLIBS_TAG+":"+this.__proto__.tag));
		window.eventToFire.fireEvent("c2:timeNotifier:load");
	};

	timeNotifier.prototype.save = function() {
		var count = 0;
		for(var i in this.arrayNotif){count++;break;}
		if(count == 0){return;}
		c2_callFunction("writeCustomData",[this.saveKey,this.getCompressedStr(this.arrayNotif),""], PLIBS_TAG+":"+this.__proto__.tag);
		window.eventToFire.fireEvent("c2:timeNotifier:save");
	};

	timeNotifier.prototype.set = function(eventName, eventTime, eventMessage,notifyDevice,notifMessage,notifTitle) {
		if(typeof this.arrayNotif[eventName] === "undefined"){this.arrayNotif[eventName] = {count:0,lastAck:-1};}
		this.arrayNotif[eventName].state		= this.state.ACTIVE;
		this.arrayNotif[eventName].name			= eventName;
		this.arrayNotif[eventName].time			= eventTime;
		this.arrayNotif[eventName].message		= eventMessage;
		this.arrayNotif[eventName].timeStart	= Date.now();
		this.arrayNotif[eventName].timeEnd		= Date.now() + eventTime*1000;
		this.save();
		if(notifyDevice){
			window.eventToFire.fireEvent("c2:timeNotifier:onSetNotification",this.arrayNotif[eventName],notifMessage,notifTitle);
		}
		window.eventToFire.fireEvent("c2:timeNotifier:set", eventName, eventTime, eventMessage,notifyDevice,notifMessage,notifTitle);
	};

	timeNotifier.prototype.ack = function(eventName) {
		if(typeof this.arrayNotif[eventName] === "undefined"){return;}
		if(this.arrayNotif[eventName].state != this.state.PENDING){return;}
		this.arrayNotif[eventName].count ++;
		this.arrayNotif[eventName].state = this.state.UNACTIVE;
		this.arrayNotif[eventName].lastAck = Date.now();
		this.save();
		window.eventToFire.fireEvent("c2:timeNotifier:ack", eventName);
	};

	timeNotifier.prototype.cancel = function(eventName) {
		if(typeof this.arrayNotif[eventName] === "undefined")	return false;
		this.arrayNotif[eventName].state = this.state.UNACTIVE;
		this.save();
		window.eventToFire.fireEvent("c2:timeNotifier:cancel", eventName);
		return true;
	};

	timeNotifier.prototype.get = function(eventName) {
		if(typeof this.arrayNotif[eventName] === "undefined")	return 0;
		return JSON.stringify(this.arrayNotif[eventName]);
	};

	timeNotifier.prototype.getValue = function(eventName, key, defaultRet) {
		if(typeof defaultRet === "undefined") defaultRet = -1;
		if(typeof this.arrayNotif[eventName] === "undefined" || typeof key === "undefined" || typeof this.arrayNotif[eventName][key] === "undefined") return defaultRet;
		return this.arrayNotif[eventName][key];
	};

	timeNotifier.prototype.getAll = function() {
		return JSON.stringify(this.arrayNotif);
	};

	timeNotifier.prototype.exist = function(eventName) {
		return (typeof this.arrayNotif[eventName] !== "undefined");
	};

	timeNotifier.prototype.checkNotifByName = function(eventName) {
		if(typeof this.arrayNotif[eventName] === "undefined"){return;}
		if(this.arrayNotif[eventName].state == this.state.UNACTIVE){return;}
		if(Date.now() < this.arrayNotif[eventName].timeEnd){ return;}
		
		this.arrayNotif[eventName].state = this.state.PENDING;
		c2_callFunction("timeNotifier_onNotification",[eventName,this.arrayNotif[eventName].eventMessage,JSON.stringify(this.arrayNotif[eventName])], PLIBS_TAG+":"+this.__proto__.tag);
		this.save();
		window.eventToFire.fireEvent("c2:timeNotifier:onNotification",this.arrayNotif[eventName]);
		window.eventToFire.fireEvent("c2:timeNotifier:"+eventName,this.arrayNotif[eventName]);
	};

	timeNotifier.prototype.checkNotif = function() {
		for(var i in this.arrayNotif){
			this.checkNotifByName(i);
		}
	};

	timeNotifier.prototype.getSecondBySpecificTime = function(hours,minutes,seconds) {
		var d = new Date();
		d.setHours(hours,minutes,seconds)
		if(d.getTime() - Date.now() < 0){
			d.setHours(hours+24)
		}
		return d.getTime();
	};
	
	timeNotifier.prototype.toHHMMSS = function(seconds){
		var sec_num = parseInt(seconds, 10);
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    return hours+':'+minutes+':'+seconds;
	}

/*********************************************
			Leaderboards
*********************************************/
	/*********************************************
				var
	*********************************************/
	var leaderboard = function(){
		this.capableToDisplayLeaderboard = false;
	};
	leaderboard.prototype.version = "1.0.2";
	leaderboard.prototype.tag = "LB";
	/*********************************************
				function
	*********************************************/
	leaderboard.prototype.init = function() {
		window.eventToFire.registerEvent("leaderboard:onSubmitScoreSucceeded", function(result){	c2_callFunction("leaderboard_onSubmitScoreSucceeded", [], PLIBS_TAG+":"+this.__proto__.tag);	});
		window.eventToFire.registerEvent("leaderboard:onSubmitScoreFailed", function(result){	c2_callFunction("leaderboard_onSubmitScoreFailed", [], PLIBS_TAG+":"+this.__proto__.tag);	});
		var that = this;
		window.eventToFire.registerEvent("leaderboard:ICanDisplayLeaderboard", function(result){	if(typeof result !== "boolean") result=true; that.capableToDisplayLeaderboard = result;	});
		window.eventToFire.fireEvent("c2:leaderboard:init");
	};

	leaderboard.prototype.canDisplayLeaderboard = function() {
		return (this.capableToDisplayLeaderboard) ? 1 : 0;
	};
	
	leaderboard.prototype.submitScore = function(leaderboard, score) {
		//temp workaround
		score = parseInt(score);
		if(typeof leaderboard !== "string" || typeof score === "undefined") return 0;
		window.eventToFire.fireEvent("c2:leaderboard:submitScore", leaderboard, score);
		return 1;
	};

	leaderboard.prototype.showLeaderboard = function(leaderboard, canFallback) {
		if(typeof canFallback === "number") canFallback = (canFallback != 0);
		if(typeof canFallback !== "boolean") canFallback = true;
		//if(typeof leaderboard !== "string") return (canFallback) ? this.showLeaderboards({fallback:true, fallbackFrom:leaderboard}) : 0;
		window.eventToFire.fireEvent("c2:leaderboard:showLeaderboard", leaderboard, canFallback);
		return 1;
	};
	
	leaderboard.prototype.showLeaderboards = function() {
		window.eventToFire.fireEvent("c2:leaderboard:showLeaderboards"); 
		return 1;
	};
	
/*********************************************
			Achievements
*********************************************/
	/*********************************************
				var
	*********************************************/
	var achievement = function(){};
	achievement.prototype.saveKey = "achievement";
	achievement.prototype.version = "1.1.1";
	achievement.prototype.tag = "AC";
	achievement.prototype.state = {
		HIDDEN			: "HIDDEN",
		REVEALED		: "REVEALED",
		UNLOCKED		: "UNLOCKED"
	};
	achievement.prototype.type = {
		STANDARD		: "STANDARD",
		INCREMENTAL		: "INCREMENTAL"
	};
	achievement.prototype.arrayAchievement = {};
	/*********************************************
				function
	*********************************************/
	achievement.prototype.init = function() {
		this.load();

		var funcCallC2 = function(obj,stepsIncremented){
			c2_callFunction("achievement_onNotification",[
				obj.achievement_code,
				stepsIncremented,
				obj.currentStep,
				obj.achievement_steps,
				JSON.stringify(obj),
				obj.previousStep
			], PLIBS_TAG+":"+this.__proto__.tag);
		};

		window.eventToFire.registerEvent("c2:achievement:unlock", funcCallC2);
		window.eventToFire.registerEvent("c2:achievement:increment", funcCallC2);
	};

	achievement.prototype.getCompressedStr = function(obj) {
		var toRet = {};
		for(var anAC in obj){
			if(!obj.hasOwnProperty(anAC)) continue;
			toRet[anAC] = {};
			if( obj[anAC]["currentStep"] > 0 && obj[anAC]["achievement_state"] !== this.state.UNLOCKED) toRet[anAC]["s"] = baseConverter.IntToBase(obj[anAC]["currentStep"], 36);
			if(!obj[anAC]["seen"]) toRet[anAC]["e"] = 0;
			if( obj[anAC]["achievement_type"] === this.type.INCREMENTAL) toRet[anAC]["m"] = baseConverter.IntToBase(obj[anAC]["achievement_steps"], 36);
			if( obj[anAC]["achievement_state"] !== this.state.REVEALED) toRet[anAC]["a"] = ((obj[anAC]["achievement_state"] === this.state.HIDDEN) ? 0 : 1);
		}
		return JSON.stringify(toRet);
	};

	achievement.prototype.getUnCompressedObj = function(objStr) {
		var toRet = {};
		if(typeof objStr === "object"){ obj = objStr; }else{ try{	var obj = JSON.parse(objStr);	}catch(e){	return toRet;	} }
		for(var anAC in obj){
			if(!obj.hasOwnProperty(anAC)) continue;
			if(typeof obj[anAC]["achievement_code"] !== "undefined"){ toRet[anAC] = Object.assign({}, obj[anAC]); continue;	}
			toRet[anAC] = {"achievement_code":anAC};
			toRet[anAC]["seen"] = (typeof obj[anAC]["e"] === "undefined");
			toRet[anAC]["achievement_type"] = (typeof obj[anAC]["m"] === "undefined") ? this.type.STANDARD : this.type.INCREMENTAL;
			toRet[anAC]["achievement_steps"] = (typeof obj[anAC]["m"] === "undefined") ? 1 : baseConverter.baseToInt(obj[anAC]["m"], 36);
			toRet[anAC]["achievement_state"] = (typeof obj[anAC]["a"] === "undefined") ? this.state.REVEALED : ((obj[anAC]["a"] > 0) ? this.state.UNLOCKED : this.state.HIDDEN);
			toRet[anAC]["currentStep"] = (typeof obj[anAC]["s"] !== "undefined") ? baseConverter.baseToInt(obj[anAC]["s"], 36) : ((toRet[anAC]["achievement_state"] === this.state.UNLOCKED) ? toRet[anAC]["achievement_steps"] : 0);
		}
		return toRet;
	};
	
	achievement.prototype.load = function() {
		this.arrayAchievement = this.getUnCompressedObj(c2_callFunction("readCustomData",[this.saveKey,"{}"], PLIBS_TAG+":"+this.__proto__.tag));
	};

	achievement.prototype.save = function() {
		var count = 0;
		for(var i in this.arrayAchievement){count++;break;}
		if(count == 0){return;}
		c2_callFunction("writeCustomData",[this.saveKey, this.getCompressedStr(this.arrayAchievement), ""], PLIBS_TAG+":"+this.__proto__.tag);
		window.eventToFire.fireEvent("c2:achievement:save");
	};

	achievement.prototype.show = function() {
		window.eventToFire.fireEvent("c2:achievement:show");
	};

	achievement.prototype.register = function(achievement_code,achievement_step,achievement_obj) {
		if(typeof this.arrayAchievement[achievement_code] !== "undefined"){return window.eventToFire.fireEvent("c2:achievement:register", this.arrayAchievement[achievement_code]);}
		var achievement_obj = (achievement_obj || {});
		if(typeof(achievement_obj) == "string"){ achievement_obj = JSON.parse(achievement_obj);}
		this.arrayAchievement[achievement_code] = new achievementObj().create(
			achievement_code, 
			achievement_step, 
			(achievement_obj["achievement_state"] || this.state.REVEALED), 
			(achievement_obj["achievement_type"] || ((achievement_step ==1)?this.type.STANDARD:this.type.INCREMENTAL))
		);
		this.save();
		window.eventToFire.fireEvent("c2:achievement:register", this.arrayAchievement[achievement_code]);
	};

	achievement.prototype.unlock = function(achievement_code) {
		if(!this.arrayAchievement[achievement_code]){return;}
		var acObj = this.arrayAchievement[achievement_code];
		if(acObj.achievement_type != this.type.STANDARD){return;}
		if(acObj.currentStep >= acObj.achievement_steps){return;}
		acObj.previousStep = parseInt(acObj.currentStep);
		acObj.currentStep = acObj.achievement_steps;
		acObj.seen = false;
		acObj.achievement_state = this.state.UNLOCKED;
		this.save();
		window.eventToFire.fireEvent("c2:achievement:unlock", acObj,1);
	};

	achievement.prototype.increment = function(achievement_code,stepsToIncrement) {
		if(!this.arrayAchievement[achievement_code]){return;}
		var acObj = this.arrayAchievement[achievement_code];
		if(acObj.achievement_type != this.type.INCREMENTAL){return;}
		if(acObj.currentStep >= acObj.achievement_steps){return;}
		acObj.previousStep = parseInt(acObj.currentStep);
		acObj.currentStep += stepsToIncrement;

		acObj.currentStep = Math.min(acObj.currentStep , acObj.achievement_steps);
		if(acObj.currentStep == acObj.achievement_steps){
			acObj.seen = false;
			acObj.achievement_state = this.state.UNLOCKED;
		}
		this.save();
		window.eventToFire.fireEvent("c2:achievement:increment", acObj,stepsToIncrement);
	};

	achievement.prototype.get = function(achievement_code,key) {
		if(typeof(achievement_code) != "undefined" && typeof(key) != "undefined"){
			if(typeof(this.arrayAchievement[achievement_code]) == "undefined"){return -1;}
			if(typeof(this.arrayAchievement[achievement_code][key]) == "undefined"){return -1;}
			return this.arrayAchievement[achievement_code][key];
		}else if(typeof(achievement_code) != "undefined"){
			if(typeof(this.arrayAchievement[achievement_code]) == "undefined"){return -1;}
			return JSON.stringify(this.arrayAchievement[achievement_code]);
		}else{
			return JSON.stringify(this.arrayAchievement);
		}
	};

	achievement.prototype.getUnSeen = function() {
		var ret = {};
		for(var i in this.arrayAchievement){
			if(!this.arrayAchievement[i].seen){
				ret[i] = this.arrayAchievement[i];
			}
		}
		return JSON.stringify(ret);
	};

	achievement.prototype.getUnSeenCount = function() {
		var count = 0;
		for(var i in this.arrayAchievement){
			if(!this.arrayAchievement[i].seen){
				count++;
			}
		}
		return count;
	};

	achievement.prototype.markAsSeenSpecific = function(achievement_code) {
		if(!this.arrayAchievement[achievement_code]){return;}
		this.arrayAchievement[achievement_code].seen = true;
		this.save();
		window.eventToFire.fireEvent("c2:achievement:markAsSeen", this.arrayAchievement[achievement_code]);
	};

	achievement.prototype.markAsSeen = function(achievement_code) {
		for(var i in this.arrayAchievement){
			this.markAsSeenSpecific(i);
		}
	};

	achievement.prototype.reveal = function(achievement_code) {
		if(!this.arrayAchievement[achievement_code]){return;}
		this.arrayAchievement[achievement_code].achievement_state = this.state.REVEALED;
		this.save();
		window.eventToFire.fireEvent("c2:achievement:reveal", this.arrayAchievement[achievement_code]);
	};

	/*********************************************
				achievementObj
	*********************************************/
		/*********************************************
				var
		*********************************************/
		var achievementObj = function(){};
		/*********************************************
					function
		*********************************************/
		achievementObj.prototype.create = function(code, step, state, type) {
			this.currentStep = 0;
			this.seen = true;
			this.achievement_code = code;
			this.achievement_type = type; //achievement.type
			this.achievement_steps = step; 
			this.achievement_state = state; //achievement.state
			return this;
		};

/*********************************************
				Playtouch object
*********************************************/
	if(typeof(window.playtouch) != "object"){ window.playtouch = {};}
	playtouch.arrayWaitForFunction = new arrayWaitForFunction();
	playtouch.leaderboard = new leaderboard();
	playtouch.nfsm = new nfsm();
	playtouch.timeNotifier = new timeNotifier();
	playtouch.achievement = new achievement();
	playtouch.versionChecker = versionChecker;
	playtouch.baseConverter = baseConverter;
	playtouch.seedsField = seedsField;
	playtouch.PLIBS_VERSION = PLIBS_VERSION;
})();