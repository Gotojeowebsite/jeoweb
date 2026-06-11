;(function(){



/////////////////////////////////////
// var
	var C2FUNC = {
		updateCase			: "updateCase",
		createCase			: "createCase",
		flashcase			: "flashCase",
		destroyCase			: "destroyCase",
		isTuto				: "isTutoGameMain",
		fillCaseC2 			: "fillThisCaseWaitTimer",
		resetAllWaitTimer	: "resetAllWaitTimer"
	};

	var DIR_LOGIC = {"top":{x:0,y:-1,"r":"bottom"},"right":{x:1,y:0,"r":"left"},"bottom":{x:0,y:1,"r":"top"},"left":{x:-1,y:0,"r":"right"}};
/////////////////////////////////////

/////////////////////////////////////
// GAME MAIN
	
	var gameMain = function(){};
	gameMain.prototype.grid = [];
	gameMain.prototype.gridInfo = {};
	gameMain.prototype.lastCaseTouched = false;
	gameMain.prototype.needChange = false;
	gameMain.prototype.lvl_info = {};
	gameMain.prototype.lvl_map = [];
	gameMain.prototype.isInit = false;
	gameMain.prototype.ldMap;
	gameMain.prototype.timeOutToClear = [];
	gameMain.prototype.arrayPopRandom = [];

	gameMain.prototype.init = function(gridWidth,gridHeight,nbTypeOFCase,levelNumber,gameMode){
		if(this.isInit){return;}
		this.grid = [];
		this.lastCaseTouched = false;
		this.gridInfo.GRID_WIDTH = gridWidth;
		this.lvl_map = (this.ldMap[levelNumber-1])?this.ldMap[levelNumber-1]:this.ldMap[this.ldMap.length-1];
		this.gridInfo.GRID_HEIGHT = gridHeight;
		this.gridInfo.CASE_TYPE_NB = nbTypeOFCase;
		this.caseXStart = [3,4];
		this.gameMode = gameMode;
		this.clearAllTimeout();
		if(this.gameMode != "story"){
			//this.lvl_map = this.ldMap[this.ldMap.length-1];
			this.lvl_map = this.ldMap[randomIntFromInterval((this.ldMap.length-1)/2, this.ldMap.length-1)];
			//this.lvl_map = this.ldMap[0];
		}

		window.c = {};
		for(var i =0;i < 1000000;i++){
			var cc = randomIntFromInterval((this.ldMap.length-1)/2, this.ldMap.length-1);
			if(!window.c[cc]) window.c[cc] = 0;
			window.c[cc]++;
		}

		this.createGrid(gridWidth, gridHeight);
		this.fillGrid(nbTypeOFCase);

		this.isInit = true;
	};

	gameMain.prototype.setMap = function(map) {
		this.ldMap = map;
	};

	gameMain.prototype.createGrid = function(gridWidth,gridHeight) {
		for (var x = 0; x < gridWidth; x++) {
			this.grid.push([]);
			for (var y = 0; y < gridHeight; y++) {
				this.grid[x].push(new CaseGrid().create(x,y,this));
			};
		};
	};

	gameMain.prototype.fillGrid = function(nbTypeOFCase) {
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				if(y == 0){
					if(x == this.caseXStart[0] || x == this.caseXStart[1]){
						this.grid[x][y].type = 6; //start
					}
				}else{
					this.grid[x][y].type = 0;
				}
				this.grid[x][y].updateExitDir();
			};
		};

		this.applyLD();

		this.fillCase();
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				this.grid[x][y].createC2();
			};
		};		
	};

	gameMain.prototype.applyLD = function() {
		//set the starter
		var xStart = this.caseXStart[Math.floor(Math.random()*2)];
		if(c2_callFunction(C2FUNC.isTuto)){
			var xStart = this.caseXStart[0];
		}
		this.grid[xStart][0].isFilled = true;
		this.grid[xStart][0].updateExitDir();
		if(this.gameMode != "story"){
			this.grid[this.caseXStart[0]][0].isFilled = true;
			this.grid[this.caseXStart[0]][0].updateExitDir();
			this.grid[this.caseXStart[1]][0].isFilled = true;
			this.grid[this.caseXStart[1]][0].updateExitDir();
		}

		var c;
		for(var i =0; i < this.lvl_map.length;i++){
			c = this.lvl_map[i];

			this.grid[c.x][c.y].type = c.type;
			if(c.type == 0) this.grid[c.x][c.y].type = Math.floor(Math.random()*this.gridInfo.CASE_TYPE_NB+1);
			this.grid[c.x][c.y].updateExitDir();
			this.grid[c.x][c.y].setRandomAngle();
			if(typeof(c.angle) != "undefined") this.grid[c.x][c.y].setAngle(c.angle);
		};
		
		if(!c2_callFunction(C2FUNC.isTuto) && this.gameMode == "story"){
			this.createLd();
			for (var x = 0; x < this.grid.length; x++) {
				for (var y = 0; y < this.grid[x].length; y++) {
					this.grid[x][y].setRandomAngle();
				};
			};	
		}
		this.startRandomPop();
	};

	gameMain.prototype.updateAllCases = function() {
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				this.grid[x][y].update();
			};
		};
	};

	gameMain.prototype.turnCase = function(logicX,logicY) {
		if(logicX >= this.gridInfo.GRID_WIDTH){return;}
		if(logicX < 0){return;}
		if(logicY >= this.gridInfo.GRID_HEIGHT){return;}
		if(logicY < 0){return;}
		var caseGrid = this.grid[logicX][logicY];
		caseGrid.setAngle((caseGrid.angle+90)%360);
		this.fillCase();
	};

	gameMain.prototype.fillCase = function() {
		c2_callFunction(C2FUNC.resetAllWaitTimer);
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				if(y == 0 &&(x == this.caseXStart[0] || x == this.caseXStart[1])) continue;
				this.grid[x][y]._lastFilled = this.grid[x][y].isFilled;
				this.grid[x][y]._indent = 10000;
				this.grid[x][y].filled(false);
			};
		};
		if(this.grid[this.caseXStart[0]][0].isFilled){this.fillNeightbor(false, this.grid[this.caseXStart[0]][0],true);}
		if(this.grid[this.caseXStart[1]][0].isFilled){this.fillNeightbor(false, this.grid[this.caseXStart[1]][0],true);}
		
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				if(y == 0 &&(x == this.caseXStart[0] || x == this.caseXStart[1])) continue;
				if(!this.grid[x][y].isFilled) this.grid[x][y].update();
				this.grid[x][y]._indent = 10000;
				this.grid[x][y].filled(false);
			};
		};

		if(this.grid[this.caseXStart[0]][0].isFilled){this.fillNeightbor(true, this.grid[this.caseXStart[0]][0],true);}
		if(this.grid[this.caseXStart[1]][0].isFilled){this.fillNeightbor(true, this.grid[this.caseXStart[1]][0],true);}
	};

	gameMain.prototype.fillNeightbor = function(anim,caseGrid,force,indent,fromDir) {
		var indentI = (typeof(indent) == "undefined")?0:indent;
		if(caseGrid.isFilled && !force && (!anim || indentI >= caseGrid._indent)){return;}
		var fromDir = (typeof(fromDir) == "undefined")?"top":fromDir;
		var neighbor=false;

		caseGrid.filled(true);
		if(anim){
			caseGrid.fillItInC2(indentI, fromDir);
			if(!caseGrid._lastFilled) indentI ++;
			caseGrid._indent = indentI;
		}
		for(var i in DIR_LOGIC){
			if(caseGrid.exitDir[i]){
				neighbor = this.getNeighbor(caseGrid, DIR_LOGIC[i].x, DIR_LOGIC[i].y);
				if(neighbor && neighbor.exitDir[DIR_LOGIC[i].r]){
					this.fillNeightbor(anim,neighbor,false,indentI,DIR_LOGIC[i].r);
				}
			}
		}
	};

	gameMain.prototype.getNeighbor = function(caseGrid,logicX,logicY) {
		if(!caseGrid){return false}
		if(caseGrid.logicX + logicX >= this.gridInfo.GRID_WIDTH ||
			caseGrid.logicY + logicY >= this.gridInfo.GRID_HEIGHT ||
			caseGrid.logicX + logicX < 0 ||
			caseGrid.logicY + logicY < 0 ){return false;}
		var neighbor = this.grid[caseGrid.logicX + logicX][caseGrid.logicY + logicY];
		if(!neighbor){return false}
		return neighbor;
	};

	gameMain.prototype.isEnd = function() {
		if(! this.isInit){ return 0;}
		//if(c2_callFunction(C2FUNC.isTuto)){return 0;}
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				if(this.grid[x][y].type == 6){ continue; }
				if(this.grid[x][y].type == 0){ continue; }
				if(this.grid[x][y].type == -1){ continue; }
				if(!this.grid[x][y].isFilled){
					return 0;
				}
			};
		};
		return 1;
	};

	gameMain.prototype.createLd = function() {
		var base = (this.grid[this.caseXStart[0]][0].isFilled)?this.grid[this.caseXStart[0]][0]:this.grid[this.caseXStart[1]][0];
		//reset type
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				if(this.grid[x][y].type == 6){ continue; }
				if(this.grid[x][y].type == 0){ continue; }
				if(this.grid[x][y].type == -1){ continue; }
				this.grid[x][y].destroy();
				this.grid[x][y].type = -111;
			};
		};

		this.createLdNextCase(base,0);
		this.fillVoidCase();
	};

	gameMain.prototype.createLdNextCase = function(caseGrid) {
		var arrayNeighborNotTaked = [];
		var neighborFrom;
		//get neighbor
		for(var i in DIR_LOGIC){
			if(caseGrid.exitDir[i]){
				var neighbor = this.getNeighbor(caseGrid, DIR_LOGIC[i].x, DIR_LOGIC[i].y);
				if(neighbor && neighbor.exitDir[DIR_LOGIC[i].r]){
					neighborFrom = neighbor;
				}else if(neighbor && neighbor.type == -111){
					arrayNeighborNotTaked.push({n:neighbor,r:DIR_LOGIC[i].r});
				}
			}
		}

		var neighboreRandomTaked = Math.floor(Math.random()*arrayNeighborNotTaked.length);
		arrayNeighborNotTaked = shuffle(arrayNeighborNotTaked);

		for(var i in arrayNeighborNotTaked){
			var caseGridNew = arrayNeighborNotTaked[i].n;
			var neighborFromReverseDir = arrayNeighborNotTaked[i].r;
			if(caseGridNew.type != -111){
				//HERE
				if(caseGridNew.exitDir[neighborFromReverseDir]) continue;
				caseGrid.removeExitDir(DIR_LOGIC[neighborFromReverseDir].r);
				continue;
			}
			//new case
			var neighborCountNotTaked = 1;
			for(var i in DIR_LOGIC){
				var neighbor = this.getNeighbor(caseGridNew, DIR_LOGIC[i].x, DIR_LOGIC[i].y);
				if(neighbor && neighbor.type == -111){
					neighborCountNotTaked ++;
				}
			}

			var maxType = Math.max(2,neighborCountNotTaked);

			//set a new pipe
			caseGridNew.type = Math.floor((Math.random()*maxType)+1);
			if(neighborCountNotTaked == 1) caseGridNew.type = 5;
			caseGridNew.updateExitDir();
			caseGridNew.setRandomAngle();
			this.checkTypeCanBeHere(caseGridNew, neighborFromReverseDir);

			this.createLdNextCase(caseGridNew);
		}
	};

	gameMain.prototype.turnInGoodDir = function(caseGrid,fromDir) {
			for(var i =0;i < 4;i++){
				if(caseGrid.exitDir[fromDir] && this.checkIfExitDirIsPerfect(caseGrid,fromDir)){
					return true;
				}
				caseGrid.setAngle((caseGrid.angle+90)%360);
			}
			return false;
	};

	//can match both neighboor not created (type ==-111) AND case with good exitDir
	gameMain.prototype.checkIfExitDirIsGood = function(caseGrid) {
		for(var i in caseGrid.exitDir){
			if(!caseGrid.exitDir[i]){ continue;}
			var neighbor = this.getNeighbor(caseGrid, DIR_LOGIC[i].x, DIR_LOGIC[i].y);
			if(!neighbor){ return false; }
			if(neighbor && !neighbor.exitDir[DIR_LOGIC[i].r] && neighbor.type != -111){
				return false;
			}
		}
		return true;
	};

	//can match only with neighboor not created (type ==-111) OR fromDir
	gameMain.prototype.checkIfExitDirIsPerfect = function(caseGrid,fromDir) {
		for(var i in caseGrid.exitDir){
			if(!caseGrid.exitDir[i]){ continue;}
			if(i == fromDir){continue;}
			var neighbor = this.getNeighbor(caseGrid, DIR_LOGIC[i].x, DIR_LOGIC[i].y);
			if(!neighbor){ return false; }
			if(!neighbor.exitDir[DIR_LOGIC[i].r] || neighbor.type != -111){
				return false;
			}
		}
		return true;
	};

	gameMain.prototype.checkTypeCanBeHere = function(caseGrid,reverseDir) {
		//check if the pipe can be here (check if all "exit" can exist) and reduce the numbers of "exit" if necessary
		var countLoop = 0;
		while(!this.turnInGoodDir(caseGrid, reverseDir)){
			if(caseGrid.type == 1){
				if(countLoop == 0){
					caseGrid.type +=2;
				}else{
					caseGrid.type = 6; //type flower +1
				}
			}	
			countLoop++;
			caseGrid.type -= 1;
			caseGrid.updateExitDir();
			caseGrid.setRandomAngle();
			if(countLoop > 5){console.log("BIG PROBLEM: checkTypeCanBeHere",caseGrid);break;}
		}
	};

	gameMain.prototype.fillVoidCase = function() {
		var arrayToCheck = [];
		var arrayWait = [];
		var arrayNeighbor = [];
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				if(this.grid[x][y].type == -111)
					arrayToCheck.push(this.grid[x][y]);
			}
		}
		arrayToCheck = shuffle(arrayToCheck);
		while(arrayToCheck.length > 0){
			arrayWait = [];
			for(var i in arrayToCheck){
				arrayNeighbor = [];
				if(arrayToCheck[i].type != -111) continue

				for(var dir in DIR_LOGIC){
					var neighbor = this.getNeighbor(arrayToCheck[i], DIR_LOGIC[dir].x, DIR_LOGIC[dir].y);
					if(neighbor && neighbor.type >0 && neighbor.type <=5){
						arrayNeighbor.push({n:neighbor,r:DIR_LOGIC[dir].r});
					}
				}

				if(arrayNeighbor.length == 0){
					arrayWait.push(arrayToCheck[i])
				}
				else{
					var neighbor = arrayNeighbor[Math.floor(Math.random()*arrayNeighbor.length)];
					neighbor.n.addExitDir(neighbor.r);
					this.createLdNextCase(neighbor.n);
				}
			}
			arrayToCheck = arrayWait;
		}
	};

	gameMain.prototype.destroyCaseFiled = function(time_destroy) {
		var caseFlowerFiled = false;
		var caseFiled = [];
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				if(!this.grid[x][y].isFilled){continue;}
				if(this.grid[x][y].type == -111 || this.grid[x][y].type == 0 || this.grid[x][y].type == 6 || this.grid[x][y].type == -1){continue;}
				caseFiled.push(this.grid[x][y]);
				if(this.grid[x][y].type == 5){
					caseFlowerFiled = true;
				}
			};
		};
		if(!caseFlowerFiled){return false;}
		this.timeOutToClear = [];
		for(var i =0;i < caseFiled.length;i++){
			caseFiled[i].isFilled = false;
			caseFiled[i].destroy();
			caseFiled[i].type = Math.floor(Math.random()*this.gridInfo.CASE_TYPE_NB+1);
			caseFiled[i].updateExitDir();
			caseFiled[i].setRandomAngle();
			//caseFiled[i].createC2();
			this.timeOutToClear.push(setTimeout(caseFiled[i].createC2.bind(caseFiled[i]),(time_destroy+(30*time_destroy/100))*1000));
		}
		this.timeOutToClear.push(setTimeout(this.fillCase.bind(this),(time_destroy+(30*time_destroy/100))*1000));
	};

	gameMain.prototype.clearAllTimeout = function(){
		for(var i =0;i < this.timeOutToClear.length;i++){
			clearTimeout(this.timeOutToClear[i]);
		}
		this.timeOutToClear = [];
	}

	gameMain.prototype.maxPipeY = function() {
		var maxY = 0;
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				if(this.grid[x][y].type == -111 || this.grid[x][y].type == 0 || this.grid[x][y].type == 6 || this.grid[x][y].type == -1){continue;}
				maxY = (maxY > this.grid[x][y].logicY)?maxY:this.grid[x][y].logicY;
			};
		};
		return maxY;
	};

	gameMain.prototype.startRandomPop = function() {
		this.arrayPopRandom = [];
		var i =0;
		for (var x = 0; x < this.grid.length; x++) {
			for (var y = 0; y < this.grid[x].length; y++) {
				if(this.grid[x][y].type == -111 || this.grid[x][y].type == 0 || this.grid[x][y].type == 6 || this.grid[x][y].type == -1){continue;}
				this.arrayPopRandom.push(i++);
			};
		};
	};

	gameMain.prototype.getRandomPop = function() {
		return this.arrayPopRandom.splice(Math.floor(Math.random()*this.arrayPopRandom.length),1)[0];
	};
/////////////////////////////////////

/////////////////////////////////////
// CaseGrid
	var CaseGrid = function(){};
	CaseGrid.id = 0;
	CaseGrid.prototype.create = function(logicX,logicY,gameMain) {
		this.gameMain = gameMain;
		this.id = CaseGrid.id++;
		this.logicX = logicX;
		this.logicY = logicY;
		this.isFilled = false;
		this.type = -1; // void,pipe_1,pipe_2,pipe_3,pipe_4,pipe_flower,pipe_start]
		this.angle = 0;
		this.exitDir = {"top":0,"bottom":0,"left":0,"right":0};
		return this;
	};

	CaseGrid.prototype.getBaseExitDir = function() {
		// [void,pipe_1,pipe_2,pipe_3,pipe_4,pipe_flower,pipe_start]
		var top 	= 	[0,0,1,1,1,0,0][this.type];
		var right 	=	[0,1,1,1,1,1,0][this.type];
		var bottom 	= 	[0,0,0,0,1,0,1][this.type];
		var left 	= 	[0,1,0,1,1,0,0][this.type];
		return {top:top,bottom:bottom,left:left,right:right};
	};

	CaseGrid.prototype.updateExitDir = function() {
		if(this.type <0){return;}
		this.angle = 0;
		var baseExit = this.getBaseExitDir();
		for(var i in this.exitDir){this.exitDir[i] = baseExit[i]};
		if(this.type == 6 && !this.isFilled){
			this.exitDir.bottom = 0;
		}
	};

	CaseGrid.prototype.setAngle = function(angle) {
		if(this.type == 6){return;} //pipe start
		var nbToTurn = (angle-this.angle)/90;
		nbToTurn = (nbToTurn<0)?(nbToTurn+4):nbToTurn;
		for(var i =0;i < nbToTurn;i++){
			this.turnIt();
		}
		this.angle = angle;
		this.update();
	};

	CaseGrid.prototype.setRandomAngle = function() {
		this.setAngle([0,90,180,270][Math.floor(Math.random()*4)]);
	};

	CaseGrid.prototype.updateAngleByDir = function() {
		var turnedCase = this.getBaseExitDir();
		this.angle = 0;
		for(var i=0;i < 4;i++){
			this.angle = (this.angle+90)%360;
			turnedCase = this.turnIt(true,turnedCase);
			if(compareExitDir(this.exitDir, turnedCase)){
				break;
			}
		}
	};

	CaseGrid.prototype.turnIt = function(apply,objBase) {
		var apply = (typeof(apply) == "undefined")?true:apply;
		var objBase = (typeof(objBase) == "undefined")?this.exitDir:objBase;

		var copyOfDir = JSON.parse(JSON.stringify(objBase));
		var copyOfDirToApply = JSON.parse(JSON.stringify(objBase));
		if(copyOfDir.top){
			copyOfDirToApply.right +=2;
		}
		if(copyOfDir.right){
			copyOfDirToApply.bottom +=2;
		}
		if(copyOfDir.bottom){
			copyOfDirToApply.left +=2;
		}
		if(copyOfDir.left){
			copyOfDirToApply.top +=2;
		}
		for(var i in copyOfDirToApply){copyOfDirToApply[i] = Math.max(0,Math.min(1,copyOfDirToApply[i]-1))};

		if(apply){
			for(var i in objBase){objBase[i] = copyOfDirToApply[i]};
		}
		return copyOfDirToApply;
	};
	
	CaseGrid.prototype.filled = function(bool,indent,fromDir) {
		var indent = (typeof(indent) == "undefined")?0:indent;
		var fromDir = (typeof(fromDir) == "undefined")?"top":fromDir;
		var update = false;
		if(this.isFilled != bool) update = true;
		this.isFilled = bool;
		//if(update) this.update();
	};

	CaseGrid.prototype.fillItInC2 = function(indent,fromDir) {
		c2_callFunction(C2FUNC.fillCaseC2,[this.logicX,this.logicY,indent,fromDir]);
	};

	CaseGrid.prototype.createC2 = function() {
		c2_callFunction(C2FUNC.createCase,[this.logicX,this.logicY,this.type,this.id,this.angle,((this.isFilled)?1:0)]);
	};

	CaseGrid.prototype.flashCase = function() {
		c2_callFunction(C2FUNC.flashcase,[this.logicX,this.logicY]);
	};

	CaseGrid.prototype.update = function() {
		c2_callFunction(C2FUNC.updateCase,[this.logicX,this.logicY,this.type,this.id,this.angle,((this.isFilled)?1:0)]);
	};

	CaseGrid.prototype.destroy = function() {
		this.type = 0;
		this.updateExitDir();
		this.destroyC2();
	};

	CaseGrid.prototype.destroyC2 = function() {
		c2_callFunction(C2FUNC.destroyCase,[this.logicX,this.logicY]);
	};

	CaseGrid.prototype.removeExitDir = function(dir) {
		this.exitDir[dir] = 0;
		switch(this.type){
			case 1: case 2: this.type = 5; break;
			case 3:
				if((this.exitDir.left && this.exitDir.right)||(this.exitDir.top && this.exitDir.bottom)){
					this.type = 1;
				}else{
					this.type = 2;
				}
			break;
			case 4: this.type = 3; break;
			default: console.log("PROBLEM de REMOVEDIR"); break;
		}

		this.updateAngleByDir();
	};

	CaseGrid.prototype.addExitDir = function(dir) {
		this.exitDir[dir] = 1;
		switch(this.type){
			case 1: case 2: this.type = 3; break;
			case 3: this.type = 4;break;
			case 5:
				if((this.exitDir.left && this.exitDir.right)||(this.exitDir.top && this.exitDir.bottom)){
					this.type = 1;
				}else{
					this.type = 2;
				}
			break;
			default: console.log("PROBLEM de ADDDIR"); break;
		}

		this.updateAngleByDir();
	};
/////////////////////////////////////

/////////////////////////////////////
// UTILS
	function shuffle(array) {
		var m = array.length, t, i;
		// While there remain elements to shuffle…
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

	function compareExitDir(exitDir1,exitDir2){
		if(exitDir1.right == exitDir2.right && 
		exitDir1.bottom == exitDir2.bottom &&
		exitDir1.left == exitDir2.left &&
		exitDir1.top == exitDir2.top){
			return true;
		}
		return false;
	}

	function randomIntFromInterval(min,max){
    	return Math.floor(Math.random()*(max-min+1)+min);
	}
/////////////////////////////////////

/////////////////////////////////////
// object
	if(typeof(window.playtouch) != "object"){ window.playtouch = {};}
	playtouch.gameMain = new gameMain();
/////////////////////////////////////

})();