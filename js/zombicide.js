var hero;
var canvas;
var stage;
var mission;

var clickX;
var clickY;

var playersTurn = false;
var zombiesTurn = false;
var boardTurn = false;

function init() {
	canvas = document.getElementById("mainCanvas");
	stage = new createjs.Stage(canvas);

	createjs.Touch.enable(stage);
	// stage.addEventListener("stagemousedown", handleMouseDown);

	mission = loadMission("mission1");

	manifest = [
		{src: "survivor/handgun/idle.png", id: "hero"}
	];

	drawMap();

	loader = new createjs.LoadQueue(true);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest, true, "../img/");

}

function handleComplete() {
	//examples.hideDistractor();

	heroHeight = 54;
	heroWidth = 63;

	var spriteSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("hero")],
			"frames": {"regX": 0, "height": heroHeight, "count": 20, "regY": 0, "width": heroWidth},
			"animations": {
				"idle": [0, 19, "idle"]
			}
		});

	heroSprite = new createjs.Sprite(spriteSheet, "idle");
	heroSprite.y = mission.yGoal - (heroHeight/2);
	heroSprite.x = mission.xGoal - (heroWidth/2);

	hero = newHero(heroSprite);

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);

	playersTurn = true;
	playTurn();
}

function newHero(heroSprite){

	var inventario = [];
	var hero = {
			sprite: heroSprite,
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

	stage.addChild(hero.sprite);

	return hero;
}

function drawMap(){

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

function playTurn(){
	if (playTurn) {
		canvas.onclick = handleMouseDown;
		console.log(clickX + " X " + clickY);
	};
}

function handleMouseDown(event) {
	canvas.onclick = null;
	clickX = stage.mouseX;
	clickY = stage.mouseY;
}

function tick(event) {
	stage.update(event);
}

