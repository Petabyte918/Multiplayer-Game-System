RemotePlayer = function (name, game, player, X, Y, color){ // remote player arguements
	var x = X;
	var y = Y;
	var looking;
	
	
	this.game = game;
	this.player = player; 
	if(color === 'red'){
		this.player = game.add.sprite(x, y, 'dude'); //add to game
		this.player.frame = 6;
		looking = 'right';
	}
	else{
		this.player = game.add.sprite(x,y ,'red_player');
		this.player.frame = 0;
		looking = 'left';
	}

    
	/* this.player.animations.add('left', [0, 1, 2], 10, true);  //player animations
    this.player.animations.add('turn', [3], 20, true);
    this.player.animations.add('right', [4, 5, 6], 10, true); */
	
	this.player.animations.add('left', [4, 5, 6, 7], 10, true);  //player animations
    //this.player.animations.add('turn', [3], 20, true);
    this.player.animations.add('right', [0, 1, 2, 3], 10, true);
	this.player.animations.add('pushright', [9], 10, true);
	this.player.animations.add('pushleft', [8], 10, true);
			
	this.player.anchor.setTo(0.5, 0.5)  //anchore the player
	this.player.name = name.toString() //assign id


    cursors = game.input.keyboard.createCursorKeys();

    
	
}

RemotePlayer.prototype.update = function () {
	
 if (this.player.x > this.x){
    this.player.play('right')
    this.looking = 'right'
  } else if (this.player.x < this.x){
    this.player.play('left')
    this.looking = 'left'
  } else if (this.player.x === this.x){
  	this.player.animations.stop();
  	if(this.looking === 'right'){
  		this.player.frame = 0
  	}
  	else if(this.looking === 'left'){
  		this.player.frame = 6
  	}
  }
this.x = this.player.x
this.y = this.player.y

}

window.RemotePlayer = RemotePlayer;
