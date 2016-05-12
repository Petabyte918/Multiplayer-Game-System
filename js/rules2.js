
//global variables:
var redPlayer, bluePlayer;

/* function faceLeft(){
 	bluePlayer.play('left');
	redPlayer.play('stand'); 
}

function faceStay(){
 	bluePlayer.play('stay');
	redPlayer.play('push'); 
} */

var rules2State = {
	
	create: function (){
		//set starry background
		var rulesBack = game.add.tileSprite(0, 0, 1500, 750, 'background');
		
		//make text etc for instructions
		var nameLabel = game.add.text(50,50, 'The Rules', { font: '45px Arial', fill: '#ffffff' });
		
		var instructs4 = game.add.text(400, 150, "4. When your opponent is close by, use the spacebar to push them!", {font: '25px Arial', fill: '#ffffff' });
		var instructs5 = game.add.text(400, 325, "5. Collect power-ups to give you an advantage over your opponent.", { font: '25px Arial', fill: '#ffffff' });
		var instructs6 = game.add.text(400, 500, "6. If you fall or get hit, you will restart on your starting platform.", { font: '25px Arial', fill: '#ffffff' });
		
		//Scenario 4:
		redPlayer = game.add.sprite(685, 225, 'red_player', 3); //facing right
		bluePlayer = game.add.sprite(900, 225, 'dude', 4); //facing left
		
		redPlayer.animations.add('push', [9], 5, true);
		redPlayer.animations.add('stand', [0], 5, true);
		
		bluePlayer.animations.add('left', [4, 5, 6, 7], 5, true);
        bluePlayer.animations.add('stay', [5], 5, true);
		
		bluePlayer.play('left');
		
		var moveBlue = game.add.tween(bluePlayer);
		var pushBlue = game.add.tween(bluePlayer);
		moveBlue.to( { x: 750 }, 1200);
		pushBlue.to( { x: 900 }, 700);
		
		moveBlue.onComplete.add(function(){
			bluePlayer.play('stay');
			redPlayer.play('push'); 
		}, this); 
		
		pushBlue.onComplete.add(function(){
			bluePlayer.play('left');
			redPlayer.play('stand'); 
		}, this);
		
		moveBlue.chain(pushBlue);
		pushBlue.chain(moveBlue);
		
		moveBlue.start();
		
		//Scenario 5:
		var yellow = game.add.sprite(450, 365, 'spike_power_up');
		var green = game.add.sprite(525, 405, 'alien_power_up');
		var orange = game.add.sprite(600, 440, 'meteor_power_up');
		
		var yellowText = game.add.text(500, 380, 'Spikes Power-up: Makes spikes appear on the middle platforms.', { font: '16px Arial', fill: '#ffffff' });
		var greenText = game.add.text(575, 420, 'Alien Power-up: Gain immunity to the alien projectiles.', { font: '16px Arial', fill: '#ffffff' });
		var orangeText = game.add.text(650, 455, 'Meteor Power-up: Activates a powerful meteor shower that only hurts your opponent.', { font: '16px Arial', fill: '#ffffff' });
		
		//Scenario 6:
		var redPlayer2 = game.add.sprite(620, 555, 'red_player', 6);
		var platform = game.add.sprite(590, 610, 'platform_short');
		
		redPlayer2.animations.add('right', [0, 1, 2, 3], 5, true);
		redPlayer2.play('right');
		
		var moveRight = game.add.tween(redPlayer2);
		var moveDown = game.add.tween(redPlayer2);
		moveRight.to( { x: 660 }, 1000);
		moveDown.to( { y: 680 }, 500);
		
		moveRight.chain(moveDown);
		moveDown.chain(moveRight);
		moveDown.onComplete.add(function(){
			redPlayer2.x = 620;
			redPlayer2.y = 555;
		}, this);
		
		moveRight.start();
		
		var back_button = game.add.button(0, 600, 'back_button', function(){
			game.state.start('rules');
		});
		var menu_button = game.add.button(1300, 600, 'menu_button', function(){
			game.state.start('menu');
		});
	}
	
	
	
};