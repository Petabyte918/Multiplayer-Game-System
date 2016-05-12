
//global vars:
var text;
var time;
var alienIcon;
var color = null;
var socket = io.connect('http://compute.cse.tamu.edu:10013');
var ready = [];
var menumusic;


function addPlayer(){
	time = game.time.now;
	text = game.add.text(game.world.centerX + 350, game.world.centerY + 200, 'Waiting for other player', { font: '25px Arial', fill: '#ffffff' });

	if(!ready[socket.id]){
		//console.log('fsdgafgafg  ' + socket.id);
		ready[socket.id] = true;
		socket.emit('add player');
	}

}

socket.on('start_game', function(){
menumusic.stop();
game.state.start('game');

});

socket.on('color',function(data){
     color = data; 
});

function goToRules(){
	game.state.start('rules');
};


var menuState = {

create: function () {
	menumusic = game.add.audio('menumusic');
	menumusic.restart();
//set background:
	var menuBack = game.add.tileSprite(0, 0, 1500, 750, 'background');	
	
	ready[socket.id] = false;
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.refresh();
	
	var nameLabel = game.add.text(80, 65, 'The Space Race', { font: 'bold 90px Arial', fill: '#ffffff' });
	
	//start button:
	var readyButton = game.add.button(game.world.centerX + 400, game.world.centerY + 100, 'start_button', addPlayer);
	
	//rules button:
	var rulesButton = game.add.button(game.world.centerX + 400, game.world.centerY - 100, 'rules_button', goToRules); //, this, 0, 11);


//Make alien:
	alienIcon = game.add.sprite(game.world.centerX + 125, game.world.centerY - 200, 'new_alien');
	var walking = alienIcon.animations.add('walk');
	walking.enableUpdate = true;
	alienIcon.animations.play('walk', 10, true);

//Make players:
	var redPlayer = game.add.sprite(215, 240, 'red_player');
	var bluePlayer = game.add.sprite(615, 440, 'dude');
	
	var redAnimate = redPlayer.animations.add('red_walk');
	var blueAnimate = bluePlayer.animations.add('blue_walk');
	
	redAnimate.enableUpdate = true;
	blueAnimate.enableUpdate = true;
	
	redPlayer.animations.play('red_walk', 5, true);
	bluePlayer.animations.play('blue_walk', 5, true);
	
//Make platforms:
	var plat1 = game.add.sprite(200, 300, 'platform_short');
	var plat2 = game.add.sprite(350, 400, 'platform');
	var plat3 = game.add.sprite(600, 500, 'platform_short');
	
//Make power-up balls:
	var yellow = game.add.sprite(413, 370, 'spike_power_up');
	var green = game.add.sprite(413, 370, 'alien_power_up');
	var orange = game.add.sprite(413,370, 'meteor_power_up');
	
	yellow.alpha = 0;
	orange.alpha = 0;
	
	var tween1 = game.add.tween(green).to( { alpha: 0 }, 1000, "Linear", true, 1000);
	var tween2 = game.add.tween(yellow).to( {alpha: 1 }, 1000, "Linear", true, 1000);
	var tween3 = game.add.tween(yellow).to( {alpha: 0 }, 1000, "Linear", true, 1000);
	var tween4 = game.add.tween(orange).to( {alpha: 1 }, 1000, "Linear", true, 1000);
	var tween5 = game.add.tween(orange).to( {alpha: 0 }, 1000, "Linear", true, 1000);
	var tween6 = game.add.tween(green).to( {alpha: 1 }, 1000, "Linear", true, 1000);
	
	tween1.chain(tween2);
	tween2.chain(tween3);
	tween3.chain(tween4);
	tween4.chain(tween5);
	tween5.chain(tween6);
	tween6.chain(tween1);
	
},

update: function(){
	alienIcon.y = game.input.mousePointer.y - 50;
	
	if(game.time.now > (time + 1000)){
		text.setText("Waiting for other player.");
	}
	if(game.time.now > (time + 2000)){
		text.setText("Waiting for other player..");
	}
	if(game.time.now > (time + 3000)){
		text.setText("Waiting for other player...");
	}
	
},

start: function () {
	game.state.start('game');
},

};
