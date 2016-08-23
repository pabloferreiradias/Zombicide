var heroImg = new Image();
var heroSprite;
var stage;

function init() {

	stage = new createjs.Stage("mainCanvas");
	createjs.Ticker.addEventListener("tick", handleTick);

	var mission = loadMission("mission1");

	drawMap(mission);

	var hero = newHero();

	var inicio = stage.getChildByName('start');
	var heroSprite = stage.getChildByName('hero');

	console.log(inicio.x);
	console.log(heroSprite);

	//heroSprite.x = inicio.x;
	//heroSprite.y = inicio.y;


}

function handleTick(event) {
     stage.update();
 }

function drawMap(mission){

	for (var i = 1; i <= mission.streets.length; i++) {
		x = mission.streets[i-1].x;
		y = mission.streets[i-1].y;
		w = mission.streets[i-1].width;
		h = mission.streets[i-1].heigth;
		start = mission.streets[i-1].is_start;
		goal = mission.streets[i-1].is_goal;
		this['street'+i] = new createjs.Shape();
		this['street'+i].graphics.beginStroke("#000").beginFill("#bbb").drawRect(0, 0, w, h);
		this['street'+i].x = x;
		this['street'+i].y = y;
		this['street'+i].name = 'street'+i;
		if (start == 1) this['street'+i].name = 'start';
		if (goal == 1) this['street'+i].name = 'goal';
		stage.addChild(this['street'+i]);
	};

	for (var i = 1; i <= mission.rooms.length; i++) {
		x = mission.rooms[i-1].x;
		y = mission.rooms[i-1].y;
		w = mission.rooms[i-1].width;
		h = mission.rooms[i-1].heigth;
		start = mission.rooms[i-1].is_start;
		goal = mission.rooms[i-1].is_goal;
		this['room'+i] = new createjs.Shape();
		this['room'+i].graphics.beginStroke("red").beginFill("blue").drawRect(0, 0, w, h);
		this['room'+i].x = x;
		this['room'+i].y = y;
		this['room'+i].name = 'room'+i;
		if (start == 1) this['room'+i].name = 'start';
		if (goal == 1) this['room'+i].name = 'goal';
		stage.addChild(this['room'+i]);
	};

}

function newHero(){
	
	heroImg.onload = handleImageHero;
	heroImg.src = "img/survivor/handgun/idle.png";

	var inventario = [];

	var hero = {
			//sprite: sprite,
			//sprite_sheet: sprite_sheet,
		    x: 0,
		    y: 0,
		    rotation: 0,
		    xp: 0,
		    acoes: 3,
		    ferimentos: 0,
		    equipamentoAtivo1: '',
		    equipamentoAtivo2: '',
		    inventario: inventario
		};

	return hero;
}

function handleImageHero(e){
	var frameData = {
		images: [heroImg],
        frames: {width:63, height:54},
        animations: {
            idle:[0,19,"idle"]
        }
	};

	var spriteSheet = new createjs.SpriteSheet(frameData);

	heroSprite = new createjs.Sprite(spriteSheet, "idle");
	heroSprite.gotoAndPlay("idle");

	heroSprite.x = 0;
	heroSprite.y = 0;
	heroSprite.name = "heroSprite";

	stage.addChild(heroSprite);
	stage.update();
}
