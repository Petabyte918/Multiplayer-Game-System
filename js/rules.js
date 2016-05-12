
//global variables:
var bluePlayer2;

function bouncing (v) {
	return Math.sin(v * Math.PI) * 0.75;
}

/* function faceLeft(){
	bluePlayer2.play('left');
}

function faceRight(){
	bluePlayer2.play('right');
} */

var rulesState = {
	
	create: function (){
		
		//set starry background
		var rulesBack = game.add.tileSprite(0, 0, 1500, 750, 'background');
		
		//make text etc for instructions
		var nameLabel = game.add.text(50,50, 'The Rules', { font: '45px Arial', fill: '#ffffff' });
		
		var tip = game.add.text(550, 70, 'Tip: Press the \'F\' key to go into fullscreen mode!', { font: '20px Arial', fill: '#ffffff' });
		
		var instructs1 = game.add.text(400, 175, "1. Make it to the other side before your opponent does!", {font: '25px Arial', fill: '#ffffff' });
		var instructs2 = game.add.text(400, 400, "2. Use the left and right arrow keys to move left and right.", { font: '25px Arial', fill: '#ffffff' });
		var instructs3 = game.add.text(400, 525, "3. Use the up arrow to jump.", { font: '25px Arial', fill: '#ffffff' });
		
		//Scenario for Rule 1:
		var redPlayer = game.add.sprite(600, 265, 'red_player');
		var bluePlayer = game.add.sprite(550, 240, 'dude');
		var endPlatform = game.add.sprite(1050, 290, 'platform_short');
		var miniPlat1 = game.add.sprite(725, 305, 'platform_short');
		var miniPlat2 = game.add.sprite(875, 295, 'platform_short');
		var miniPlat3 = game.add.sprite(400, 255, 'platform_short');
		var midPlatform = game.add.sprite(500, 325, 'platform');
		
		redPlayer.animations.add('left', [4, 5, 6], 5, true);
        bluePlayer.animations.add('right', [0, 1, 2], 5, true);
		
		redPlayer.play('left');
		bluePlayer.play('right');
		
		var moveBlue = game.add.tween(bluePlayer);
		var jump = game.add.tween(bluePlayer);
		var moveRed = game.add.tween(redPlayer);
		
		moveRed.to( { x: 525 }, 2000);
		moveBlue.to( { x: 1075 }, 3000);
		jump.to( { y: 215 }, 1000, bouncing, true, 0, Number.MAX_VALUE, 0);
		
		moveBlue.start();
		moveRed.start();
		
		//Scenario for Rule 2:
		bluePlayer2 = game.add.sprite(700, 450, 'dude');
		bluePlayer2.animations.add('left', [4, 5, 6], 5, true);
		bluePlayer2.animations.add('right', [0, 1, 2], 5, true);
		bluePlayer2.play('left');
		
		var moveBlue2Left = game.add.tween(bluePlayer2);
		var moveBlue2Right = game.add.tween(bluePlayer2);
		moveBlue2Left.to( { x: 600 }, 2000);
		moveBlue2Right.to( { x: 900 }, 2000);
		
		moveBlue2Left.chain(moveBlue2Right);
		moveBlue2Right.chain(moveBlue2Left);
		
		moveBlue2Left.onComplete.add(function(){
			bluePlayer2.play('right');
		}, this); 
		moveBlue2Right.onComplete.add(function(){
			bluePlayer2.play('left');
		}, this);
		
		moveBlue2Left.start();
		
		//Scenario for Rule 3:
		var redPlayer2 = game.add.sprite(700, 650, 'red_player', 3);
		//redPlayer2.animations.add('center', 
		
		var redJumpUp = game.add.tween(redPlayer2);
		var redJumpDown = game.add.tween(redPlayer2);
		
		redJumpUp.to( { y: 565 }, 1500, Phaser.Easing.Bounce.In);
		redJumpDown.to( { y: 650 }, 1500, Phaser.Easing.Bounce.Out);
		
		redJumpUp.chain(redJumpDown);
		redJumpDown.chain(redJumpUp);
		
		redJumpUp.start();
		
		var back_button = game.add.button(0, 600, 'back_button', function(){
			game.state.start('menu');
		});
		var next_button = game.add.button(1300, 600, 'next_button', function(){
			game.state.start('rules2');
		});
	}
	
};