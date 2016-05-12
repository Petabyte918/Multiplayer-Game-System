

		var push;
		var text;
		var spikes = null;
        var player;
		var num_time = 0;
		var num_time2 = 0;
		var players = [];
        var stationary = null;
        var MovingPlatforms = null;
        var playerLooking = 'left';
        var jumpTimer = 0;
        var cursors;
        var locked = false;
        var lockedTo = null;
        var wasLocked = false;
        var willJump = false;
		var mov1;
		var mov2;
		var mov3;
		var mov4;
		var mov5;
		var mov6;
		var mov7;
		var mov8;
		var alien;
		var sprite;
		var bullets;
		var bullets2;
		var b_bullets, b_bullets2;
		var power_up;
		var power_up2;
		var p_spikes = null;
		var killblue = false, killred = false;
		var meteorkillblue = false, meteorkillred = false;
		var spikekillblue = false, spikekillred = false;
		var goopkillblue = true, goopkillred = true; //we want the goop balls to kill players by default
		var meteors;
		var fireRate = 100;
		var nextFire = 0;
		var backgroundPlatforms = null;
		var endSpikePowerUp;	
		var spacebar;
		var active_powerup = false;
		var timer;
	    var initialized =  false;
 		var respawnTime = 0; 
        var nextPowerUpIndex = 2;
		var gotPowerUp = false;
 		var respawnTime2 = 0; 
        var nextPowerUpIndex2 = 2;
		var gotPowerUp2 = false;
		var gotSpike = false;
		var gameDidNotEnd = true;
		var pusheffectleft = false;
		var pusheffectright = false;
		var meteorsoundeffect;
		var powerupsoundeffect;
		var pushsoundeffect;
		var winssoundeffect;
		var deathsoundeffect;
	
socket.on('pushedback', moveBack);

socket.on('initialized', function(){
	initialized = true;
	onSocketConnected(player);
 
setInterval(function(){ //throw alien bullets every 2 seconds
	fire();
}, 3000);  

nextPowerUp();
nextPowerUp2();
	
});
		

socket.on('end game', function(data){
	winssoundeffect.play();
	var backButton  = game.add.button(game.world.centerX - 75, game.world.centerY - 100, 'menu_button',function(){
		music.stop();
		num_time = 0;
		num_time2 = 0;
        playerLooking = 'left';
        jumpTimer = 0;
        locked = false;
        lockedTo = null;
        wasLocked = false;
        willJump = false;
		killblue = false, killred = false;
		meteorkillblue = false, meteorkillred = false;
		spikekillblue = false, spikekillred = false;
		goopkillblue = true, goopkillred = true; //we want the goop balls to kill players by default
		nextFire = 0;
		active_powerup = false;
		initialized =  false;
 		respawnTime = 0; 
        nextPowerUpIndex = 2;
		gotPowerUp = false;
 		respawnTime2 = 0; 
        nextPowerUpIndex2 = 2;
		gotPowerUp2 = false;
		gotSpike = false;
		gameDidNotEnd = true;
		pusheffectleft = false;
		pusheffectright = false;
		players = [];
		socket.emit('reset initialized');
		game.state.start('menu'); 
	})
	
	backgroundPlatforms.callAll('stop');
	backgroundPlatforms.setAll('body.allowGravity', true);
	MovingPlatforms.setAll('body.allowGravity', true);
	bullets.setAll('alpha', 0);
	bullets2.setAll('alpha', 0);
	stationary.setAll('body.allowGravity', true);
    power_up.setAll('body.enable', false)
	alien.alpha = 0
	power_up.setAll('alpha',false)
	power_up.setAll('body.allowGravity', true)
	power_up2.setAll('alpha',false)
	power_up2.setAll('body.allowGravity', true)
	
	if(data === 'red'){
		console.log('red made it!')
		var winningtext = game.add.text(game.world.centerX - 215, 175, 'Red Player Won!', { fill: '#CE2F2F', font: "bold 65px Arial" });
		stationary.children[0].body.allowGravity = false;
		if(color === 'red'){
			players[0].player.alpha = 0;
		}
		else{
			player.alpha = 0;
			text.alpha = 0;
		}
	}
	else{
		console.log('blue made it!');
		var winningtext = game.add.text(game.world.centerX - 215, 175, 'Blue Player Won!', { fill: '#385dcc', font: "bold 65px Arial" });
		stationary.children[3].body.allowGravity = false;
		if(color === 'blue'){
			players[0].player.alpha = 0;
		}
		else{
			player.alpha = 0;
			text.alpha = 0;
		}
	}
});

var xaxis = 7;
var yaxis = 10;

socket.on('blue spike',function(data){
	powerupsoundeffect.play();
	if(data === 'top'){
	power_up.children[2].alpha = 0;
	power_up.children[2].body.enable = false;
	} else {

	power_up2.children[0].alpha = 0;
	power_up2.children[0].body.enable = false;
	}	
	p_spikes.setAll('body.enable', true)	
	spikekillred = true;
	spikekillblue = false;
	gotSpike = true;
	p_spikes.children[0].alpha = 1;
	p_spikes.children[1].alpha = 1;
	p_spikes.children[2].alpha = 1;
	p_spikes.children[3].alpha = 1;
		
	p_spikes.children[0].tint = 0x385DCC; //make the spikes red!
	p_spikes.children[1].tint = 0x385DCC;
	p_spikes.children[2].tint = 0x385DCC;
	p_spikes.children[3].tint = 0x385DCC;

	game.add.tween(p_spikes.children[0]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 8000); //will fade away after 8 seconds
	game.add.tween(p_spikes.children[1]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 8000);
	game.add.tween(p_spikes.children[2]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 8000);
	game.add.tween(p_spikes.children[3]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 8000);
	endSpikePowerUp = game.time.now + 8000
});



socket.on('red spike',function(data){
	powerupsoundeffect.play();
	if(data === 'top'){
	power_up.children[2].alpha = 0;
	power_up.children[2].body.enable = false;
	} else {

	power_up2.children[0].alpha = 0;
	power_up2.children[0].body.enable = false;
	}
	spikekillblue = true;
	spikekillred = false;
	
	gotSpike = true;
	p_spikes.children[0].tint = 0xCE2F2F; //make the spikes red!
	p_spikes.children[1].tint = 0xCE2F2F;
	p_spikes.children[2].tint = 0xCE2F2F;
	p_spikes.children[3].tint = 0xCE2F2F;
	p_spikes.setAll('body.enable', true)	
	p_spikes.children[0].alpha = 1;
	p_spikes.children[1].alpha = 1;
	p_spikes.children[2].alpha = 1;
	p_spikes.children[3].alpha = 1;
	
	game.add.tween(p_spikes.children[0]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 8000); //will fade away after 8 seconds
	game.add.tween(p_spikes.children[1]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 8000);
	game.add.tween(p_spikes.children[2]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 8000);
	game.add.tween(p_spikes.children[3]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 8000);	
	
	endSpikePowerUp = game.time.now + 8000
	
});
socket.on('next_powerup2', function(){
	nextPowerUp2()
});

socket.on('next_powerup', function(){
	nextPowerUp()
});


socket.on('red meteor',function(data){
	meteorsoundeffect.play();
	console.log('red meteors')
	if(data === 'top'){
	power_up.children[0].alpha = 0; //make power up fade away
	power_up.children[0].body.enable = false;
	} else {
	
	power_up2.children[1].alpha = 0; //make power up fade away
	power_up2.children[1].body.enable = false;
	}

	meteorkillred = true;
	
	meteors.children[0].tint = 0x385DCC; //tint meteors blue
	meteors.children[1].tint = 0x385DCC;
	meteors.children[2].tint = 0x385DCC;
	meteors.children[3].tint = 0x385DCC; 
	meteors.children[4].tint = 0x385DCC; 
	meteors.children[5].tint = 0x385DCC;
	meteors.children[6].tint = 0x385DCC;
	
	
	if (game.time.now > nextFire && meteors.countDead() > 0) //if time to fire do it.
    {
        nextFire = game.time.now + fireRate; //get the nextfire time
		meteors.forEachDead(throw_meteors, this, this);
		xaxis = 7;
		yaxis = 10;
		
    }
		  
});

socket.on('blue meteor',function(data){
	meteorsoundeffect.play();
	powerupsoundeffect.play();
	if(data === 'top'){
	power_up.children[0].alpha = 0;
	power_up.children[0].body.enable = false;
	} else {

	power_up2.children[1].alpha = 0; //make power up fade away
	power_up2.children[1].body.enable = false;
	}
	meteorkillblue = true;
	
	meteors.children[0].tint = 0xCE2F2F; //blue
	meteors.children[1].tint = 0xCE2F2F; 
	meteors.children[2].tint = 0xCE2F2F; 
	meteors.children[3].tint = 0xCE2F2F; 
	meteors.children[4].tint = 0xCE2F2F; 
	meteors.children[5].tint = 0xCE2F2F; 
	meteors.children[6].tint = 0xCE2F2F;
	
	if (game.time.now > nextFire && meteors.countDead() > 0) //if time to fire do it.
    {
        nextFire = game.time.now + fireRate; //get the nextfire time
		meteors.forEachDead(throw_meteors, this, this);
		xaxis = 7;
		yaxis = 10;
    }

		  
});


socket.on('blue alien',function(data){
	powerupsoundeffect.play();
	if(data === 'top'){
	power_up.children[1].alpha = 0;
	power_up.children[1].body.enable = false;
	} else {

	power_up2.children[2].alpha = 0; //make power up fade away
	power_up2.children[2].body.enable = false;
	}	
	active_powerup = true;
	
	goopkillblue = false; //dont hit blue, only hit red
	
	bullets.children[0].tint = 0x385DCC; //make the alien goop blue
	bullets.children[1].tint = 0x385DCC;
	bullets2.children[0].tint = 0x385DCC;
	bullets2.children[1].tint = 0x385DCC;
	
	timer = game.time.create(false);
	timer.loop(8000, endPowerup, this); // after 8 seconds, end powerup
	timer.start();

});

socket.on('red alien',function(data){
	powerupsoundeffect.play();
	if(data === 'top'){
	power_up.children[1].alpha = 0;
	power_up.children[1].body.enable = false;
	} else {
	
	power_up2.children[2].alpha = 0;
	power_up2.children[2].body.enable = false;
	}
	active_powerup = true;
	goopkillred = false; //dont hit red, only hit blue
	
	bullets.children[0].tint = 0xCE2F2F; //make the alien goop red
	bullets.children[1].tint = 0xCE2F2F;
	bullets2.children[0].tint = 0xCE2F2F;
	bullets2.children[1].tint = 0xCE2F2F;
	


	timer = game.time.create(false);
	timer.loop(8000, endPowerup, this); // after 5 seconds, end powerup
	timer.start();
});

socket.on('update platforms', function(data){
     
	MovingPlatforms.children[0].x = data.x0;
	MovingPlatforms.children[0].y = data.y0;
	MovingPlatforms.children[1].x = data.x1;
	MovingPlatforms.children[1].y = data.y1;
	MovingPlatforms.children[2].x = data.x2;
	MovingPlatforms.children[2].y = data.y2;
	MovingPlatforms.children[3].x = data.x3;
	MovingPlatforms.children[3].y = data.y3;
	MovingPlatforms.children[4].x = data.x4;
	MovingPlatforms.children[4].y = data.y4;
	MovingPlatforms.children[5].y = data.y5;
	MovingPlatforms.children[6].x = data.x6;
	MovingPlatforms.children[6].y = data.y6;
	MovingPlatforms.children[7].x = data.x7;
	MovingPlatforms.children[7].y = data.y7;
});


socket.on('update bullets', function(data){
	
	
	bullets.children[0].x = data.x0;
	bullets.children[0].y = data.y0;
	bullets.children[1].x = data.x1;
	bullets.children[1].y = data.y1;
	
	bullets2.children[0].x = data.x2;
	bullets2.children[0].y =  data.y2;
	bullets2.children[1].x = data.x3;
	bullets2.children[1].y = data.y3;	
});


socket.on("disconnect", onSocketDisconnect);

socket.on("new player", function(data) {
    onNewPlayer(data,player);
});

socket.on("move player", onMovePlayer);

socket.on("remove player", onRemovePlayer);


function resetSpikeKill(){
	console.log('inside resetSpikeKill!');
	spikekillblue = false;
	spikekillred = false;
	p_spikes.setAll('body.enable',false)
}

function throw_meteors(data){
	data.reset(xaxis, yaxis);
	game.physics.arcade.moveToXY(data, 1300, 100,300);
	xaxis = xaxis + 170;
}

function nextPowerUp(){
	console.log("nextPowerUp")
	power_up.children[nextPowerUpIndex].alpha = 1
	power_up.children[nextPowerUpIndex].body.enable = true;

	if(nextPowerUpIndex === 2){
		nextPowerUpIndex = 0
	} 
	else {
		nextPowerUpIndex++
	}

}

function nextPowerUp2(){
	console.log("nextPowerUp2")
	power_up2.children[nextPowerUpIndex2].alpha = 1
	power_up2.children[nextPowerUpIndex2].body.enable = true;

	if(nextPowerUpIndex2 === 2){
		nextPowerUpIndex2 = 0
	} 
	else {
	nextPowerUpIndex2++
	}

}


function endPowerup(){
	goopkillblue = true; //blue can be hit again
	goopkillred = true; //red can be hit again
	active_powerup = false;
	
	bullets.children[0].tint = 0xFFFFFF; //make color go back to normal
	bullets.children[1].tint = 0xFFFFFF;
	bullets2.children[0].tint = 0xFFFFFF;
	bullets2.children[1].tint = 0xFFFFFF;
	timer.destroy();
}

	
function fire() { //this fires the alien bullets

    if (game.time.now > nextFire && b_bullets.countDead() > 0) //if time to fire do it.
    {	
        nextFire = game.time.now + fireRate; //get the nextfire time
		b_bullets.forEachDead(throw_ball_left, this, this);
		b_bullets2.forEachDead(throw_ball_right, this, this);
    }

}

function throw_ball_right(data){  // throw two bullets with different trajectory
		data.reset(750, 85);
		if(num_time === 0){ //first trajectory
		game.physics.arcade.moveToXY(data, 900, 50,300);
		num_time = num_time + 1;
		}
		else{ //second trajectory
		game.physics.arcade.moveToXY(data, 900, 25,200);
		num_time = num_time - 1;
		}
	
}

function throw_ball_left(data){ // throw two bullets with different trajectory
		data.reset(750, 85);
		if(num_time2 === 0){ //first trajectory
		game.physics.arcade.moveToXY(data, 100, 50,300);
		num_time2 = num_time2 +1;
		}
		else{ //second trajectory
		game.physics.arcade.moveToXY(data, 100, 25,200);
		num_time2 = num_time2 -1;
		}
}
	
	
function onSocketConnected(data){ //connection
	
		socket.emit('new player', { x: data.x, y: data.y });
}
	

function onSocketDisconnect() { //disconnect
	
}


function onNewPlayer(data, player) { //new player
 

  // Avoid possible duplicate players
   var duplicate = playerById(data.id)
  if (duplicate) {
    return
  } 

  // Add new player to the remote players array
  players.push(new RemotePlayer(data.id, game, player, data.x, data.y, color)) 
  console.log(this.id + " added " + data.id) 
}

function onMovePlayer(data) { //move player
  var movePlayer = playerById(data.id) //get the player to move

  if (!movePlayer) { //if player not found
    return
  }

  movePlayer.player.x = data.x // move the player
  movePlayer.player.y = data.y
  movePlayer.update();
}


function onRemovePlayer(data) { //remove player
  var removePlayer = playerById(data.id)// get player by id
  if (!removePlayer) {
    return
  }

  removePlayer.player.kill() //kill the player
  players.splice(players.indexOf(removePlayer), 1) //delete from player list
     if(color == 'red'){
	   player.x = 32;
	   player.y = 0;
   }
   if(color == 'blue'){
	   player.x = 1456;
	   player.y = 0;
   }
  socket.emit('end game', color);
}

socket.on('death', function(){
	deathsoundeffect.play();
	
})

function resetPlayer(){ //player reset to platform
	socket.emit('death');
	if(color === 'blue'){
		player.x =	32;
		player.y = 0;
		playerLooking = 'right';
	}else{
		player.x =	1456;
		player.y = 0;
		playerLooking = 'left';
	}
}

function power_up_meteor(position){
	powerupsoundeffect.play();
	if(color === 'red'){
		socket.emit('blue meteor', position);
	}
	else if(color == 'blue'){
		socket.emit('red meteor', position);
	}
	if (position === 'top'){	
        respawnTime = game.time.now + 10000
	gotPowerUp = true
	}
	else {
	respawnTime2 = game.time.now + 10000
	gotPowerUp2 = true 	
	}
	meteorsoundeffect.play();
}

function power_up_alien(position){
	powerupsoundeffect.play();
	if(color === 'blue'){
		socket.emit('blue alien', position);
	}
	else if(color === 'red'){
		socket.emit('red alien', position);
	}
	if(position === 'top'){
        respawnTime = game.time.now + 10000
	gotPowerUp = true
	}
	else {
	respawnTime2 = game.time.now + 10000
	gotPowerUp2 = true	
	}
}

function power_up_spike(position){
	powerupsoundeffect.play();
	if(color === 'red'){
		socket.emit('red spike', position);
	}
	else if(color === 'blue'){
		socket.emit('blue spike', position);
	}
	if(position === 'top'){
        respawnTime = game.time.now + 10000
	gotPowerUp = true
	}
	else {
	respawnTime2 = game.time.now + 10000
	gotPowerUp2 = true
	}	
	
}

function ball_hit(){
	if(color === 'blue' && goopkillblue){
		resetPlayer();
	}else if(color === 'red' && goopkillred){
		resetPlayer();
	}
}

function meteor_hit(){
	if(color === 'blue' && meteorkillblue){
		resetPlayer();
		meteorkillblue = false;
	}else if(color === 'red' && meteorkillred){
		resetPlayer();
		meteorkillred = false;
	}
}

function spike_hit(){
	console.log('spike hit function')	
	if(color === 'blue' && spikekillblue){
		resetPlayer();
	}
	else if(color === 'red' && spikekillred){
		resetPlayer();
	}
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function pushed(){
		pushsoundeffect.play();
		if(playerLooking === 'left'){
			if(((player.x - players[0].x) <= 60) && ((player.x - players[0].x) > 0)){
					socket.emit('pushback', {looking: playerLooking});
				}	
		}
		if(playerLooking === 'right'){
			if(((players[0].x - player.x) <= 60) && ((players[0].x - player.x) > 0)){
					socket.emit('pushback', {looking: playerLooking});
			}	
		}
}

function moveBack(data){
	
	if(data.looking === 'left'){
		pusheffectleft = true;		
	}
	else if(data.looking === 'right'){
		pusheffectright = true;
	}
	
}



function playerById(id) { //get player by id
	for (var i = 0; i < players.length; i++) {
    if (players[i].player.name === id) {
		return players[i];
    }
  }

  return false
}

MovingPlatform = function (game, x, y, key, group) { // object for moving platform

        if (typeof group === 'undefined') { group = game.world; }

        Phaser.Sprite.call(this, game, x, y, key);
        game.physics.arcade.enable(this);
        this.anchor.x = 0.5;
        this.body.customSeparateX = true;
        this.body.customSeparateY = true;
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.playerLocked = false;
        group.add(this);
};

MovingPlatform.prototype = Object.create(Phaser.Sprite.prototype); //set prototype to phaser object
MovingPlatform.prototype.constructor = MovingPlatform;
	
MovingPlatform.prototype.addMotionPath = function (path) {  //logic to make platform move using phaser

        this.tweenX = this.game.add.tween(this.body);
        this.tweenY = this.game.add.tween(this.body);
        for (var i = 0; i < path.length; i++){
            this.tweenX.to( { x: path[i].x }, path[i].xSpeed, path[i].xEase);
            this.tweenY.to( { y: path[i].y }, path[i].ySpeed, path[i].yEase);
        }

        this.tweenX.loop();
        this.tweenY.loop();

};

MovingPlatform.prototype.start = function () {

        this.tweenX.start();
        this.tweenY.start();

};

MovingPlatform.prototype.stop = function () {

        this.tweenX.stop();
        this.tweenY.stop();

}; 

function customStep(player, platform){
	if(!locked && player.body.velocity.y > 0){
		locked = true;
		lockedTo = platform;
		platform.playerLocked = true;
		player.body.velocity.y = 0;
	}
}

function checkLock(){
	player.body.velocity.y = 0;
	if(player.body.right < lockedTo.body.x || player.body.x > lockedTo.body.right ){
		cancelLock();
	}
}

function cancelLock(){
	wasLocked = true;
	locked = false;
}


function fullScreenMode() {
  if (game.scale.isFullScreen) {
    game.scale.stopFullScreen();
  } else {
    game.scale.startFullScreen(false);
  }
}

setInterval(function(){ //throw alien bullets every 2 seconds
	music.restart();
}, 53000); 

var gameState = {
create: function () {
		
	 	game.renderer.renderSession.roundPixels = true;

        game.world.resize(1500, 750);  

        game.physics.arcade.gravity.y = 600; //add gravity
		
		
		//============BACKGROUND BULLETS================================
		
		    b_bullets = game.add.group(); //make the alien b_bullets a group
			b_bullets.enableBody = true; 
			b_bullets.physicsBodyType = Phaser.Physics.ARCADE; 
			b_bullets.create(750, 85, 'bullet');
			b_bullets.create(750, 85, 'bullet');
			b_bullets.setAll('checkWorldBounds', true);
			b_bullets.setAll('outOfBoundsKill', true);
			
			b_bullets2 = game.add.group(); //make bullets to throw to otherside 
			b_bullets2.enableBody = true;
			b_bullets2.physicsBodyType = Phaser.Physics.ARCADE;
			b_bullets2.create(750, 85, 'bullet');
			b_bullets2.create(750, 85, 'bullet');
			b_bullets2.setAll('checkWorldBounds', true);
			b_bullets2.setAll('outOfBoundsKill', true);
		
		
		//================================================================
			
		//=========BACKGROUND PLATFORMS======================
			backgroundPlatforms = game.add.physicsGroup(); //make moving platforms a group

            background_mov1 = new MovingPlatform(game, 225, 595, 'platform_mid', backgroundPlatforms);  // each moving has its own logic

             background_mov1.addMotionPath([
                { x: "+300", xSpeed: 2000, xEase: "Linear", y: "+0", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "-300", xSpeed: 2000, xEase: "Linear", y: "-0", ySpeed: 2000, yEase: "Sine.easeOut" },

            ]);
			
			 background_mov2 = new MovingPlatform(game, 585, 250, 'platform_short', backgroundPlatforms);

             background_mov2.addMotionPath([
                { x: "+0", xSpeed: 2000, xEase: "Linear", y: "+250", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "-0", xSpeed: 2000, xEase: "Linear", y: "-250", ySpeed: 2000, yEase: "Sine.easeOut" },

            ]);
			
			 background_mov3 = new MovingPlatform(game, 355, 450, 'platform_short', backgroundPlatforms);

             background_mov3.addMotionPath([
                { x: "-100", xSpeed: 2000, xEase: "Linear", y: "+0", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "+100", xSpeed: 2000, xEase: "Linear", y: "-0", ySpeed: 2000, yEase: "Sine.easeOut" },

            ]); 
			
			 background_mov4 = new MovingPlatform(game, 187.5, 250, 'platform_short', backgroundPlatforms);

             background_mov4.addMotionPath([
                { x: "+0", xSpeed: 2000, xEase: "Linear", y: "+150", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "-0", xSpeed: 2000, xEase: "Linear", y: "-150", ySpeed: 2000, yEase: "Sine.easeOut" },

            ]); 

			
             background_mov5 = new MovingPlatform(game, 925, 595, 'platform_mid', backgroundPlatforms);

             background_mov5.addMotionPath([
                { x: "+300", xSpeed: 2000, xEase: "Linear", y: "+0", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "-300", xSpeed: 2000, xEase: "Linear", y: "-0", ySpeed: 2000, yEase: "Sine.easeOut" },

            ]);
			
			 background_mov6 = new MovingPlatform(game, 885, 250, 'platform_short', backgroundPlatforms);

             background_mov6.addMotionPath([
                { x: "+0", xSpeed: 2000, xEase: "Linear", y: "+250", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "-0", xSpeed: 2000, xEase: "Linear", y: "-250", ySpeed: 2000, yEase: "Sine.easeOut" },

            ]);
			
			 background_mov7 = new MovingPlatform(game, 1085, 450, 'platform_short', backgroundPlatforms);

             background_mov7.addMotionPath([
                { x: "+100", xSpeed: 2000, xEase: "Linear", y: "+0", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "-100", xSpeed: 2000, xEase: "Linear", y: "-0", ySpeed: 2000, yEase: "Sine.easeOut" },

            ]); 
			
			 background_mov8 = new MovingPlatform(game, 1250, 250, 'platform_short', backgroundPlatforms);

             background_mov8.addMotionPath([
                { x: "+0", xSpeed: 2000, xEase: "Linear", y: "+150", ySpeed: 2000, yEase: "Sine.easeIn" },
                { x: "-0", xSpeed: 2000, xEase: "Linear", y: "-150", ySpeed: 2000, yEase: "Sine.easeOut" },

            ]); 
		//===================================================
			
			
			
            background = game.add.tileSprite(0, 0, 1500, 750, 'background');
            background.fixedToCamera = true; //fix camera
			
			
        
            stationary = game.add.physicsGroup(); //create all the platforms that doesn't require moving
            stationary.create(0, 225, 'blue_plat'); //stationary.children[0]
			stationary.create(650, 550, 'platform_bot');
            stationary.create(675, 275, 'platform');
			stationary.create(1355, 225, 'red_plat'); //stationary.children[3]
			stationary.create(275, 245, 'platform_short');
			stationary.create(1150, 245, 'platform_short');
			stationary.create(945, 475, 'platform_mid');
			stationary.create(480, 475, 'platform_mid');
	        stationary.setAll('body.allowGravity', false);
            stationary.setAll('body.immovable', true); //make the platform immovable
			stationary.setAll('body.checkCollision.down', false);
		
			spikes = game.add.physicsGroup(); //make the spikes at the bottom
			spikes.create(0,675, 'spikes'); 
			spikes.setAll('body.allowGravity', false); //add gravity
            spikes.setAll('body.immovable', true);
			spikes.tint = 0x000000;
			

            //custom movement platform class at bottom of code
			MovingPlatforms = game.add.physicsGroup(); //make moving platforms a group

            mov1 = new MovingPlatform(game, 225, 595, 'platform_mid', MovingPlatforms);  // each moving has its own logic

			mov2 = new MovingPlatform(game, 585, 250, 'platform_short', MovingPlatforms);
			
			mov3 = new MovingPlatform(game, 225, 450, 'platform_short', MovingPlatforms);
			
			mov4 = new MovingPlatform(game, 187.5, 250, 'platform_short', MovingPlatforms);
			
            mov5 = new MovingPlatform(game, 925, 595, 'platform_mid', MovingPlatforms);

			mov6 = new MovingPlatform(game, 885, 250, 'platform_short', MovingPlatforms);
			
			mov7 = new MovingPlatform(game, 1085, 450, 'platform_short', MovingPlatforms);
			
			mov8 = new MovingPlatform(game, 1250, 250, 'platform_short', MovingPlatforms);

			power_up = game.add.physicsGroup(); 
			
			
			power_up.create(740, 240, 'meteor_power_up'); 
			power_up.create(740, 240, 'alien_power_up'); 
			power_up.create(740, 240, 'spike_power_up');
			power_up.setAll('alpha', 0)
			power_up.setAll('body.enable', false)	
			power_up.setAll('body.allowGravity', false); 
		
			power_up2 = game.add.physicsGroup(); 
			power_up2.create(740, 515, 'spike_power_up');
			power_up2.create(740, 515, 'meteor_power_up');
			power_up2.create(740, 515, 'alien_power_up');
			power_up2.setAll('alpha', 0)
			power_up2.setAll('body.enable', false)	
			power_up2.setAll('body.allowGravity', false); 
			
			meteors = game.add.group();
			meteors.enableBody = true;
			meteors.createMultiple(7, 'meteor');
			meteors.setAll('checkWorldBounds', true);
			meteors.setAll('outOfBoundsKill', true); 
			
			p_spikes = game.add.group(); //make the power up spikes (maybe create later)
			p_spikes.create(700, 240, 'blue_spike');
			p_spikes.create(775, 240, 'blue_spike');
			p_spikes.create(700, 515, 'blue_spike');
			p_spikes.create(785, 515, 'blue_spike');
			game.physics.arcade.enable(p_spikes, true);
			p_spikes.setAll('body.allowGravity', false); //add gravity
			p_spikes.children[0].alpha = 0;
			p_spikes.children[1].alpha = 0;
			p_spikes.children[2].alpha = 0;
			p_spikes.children[3].alpha = 0; 
			
			
			
			
			
			//left side projectiles:
			bullets = game.add.group(); //make the alien bullets a group
			bullets.physicsBodyType = Phaser.Physics.ARCADE;
                        
			bullets.create(750, 85, 'bullet');
			bullets.create(750, 85, 'bullet');

			bullets.setAll('checkWorldBounds', true);
			
			//right side projectiles:
			bullets2 = game.add.group(); //make bullets to throw to other side
			bullets2.physicsBodyType = Phaser.Physics.ARCADE;

			bullets2.create(750, 85, 'bullet');
			bullets2.create(750, 85, 'bullet');

			bullets2.setAll('checkWorldBounds', true);

			if(color === 'blue'){
				player = game.add.sprite(32, 0, 'dude');
				playerLooking = 'right';
				text = game.add.text(32, 0, 'You', { fill: '#ffffff', font: "25px Arial" });
			}
			else{
				player = game.add.sprite(1465, 0, 'red_player');
				playerLooking = 'left';
				text = game.add.text(1465, 0, 'You', { fill: '#ffffff', font: "25px Arial" });
			}
			
			player.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(player);
            player.body.collideWorldBounds = true;
          //  player.animations.add('left', [0, 1, 2], 10, true);
           // player.animations.add('turn', [3], 20, true);
            //player.animations.add('right', [4, 5, 6], 10, true);
			player.animations.add('left', [4, 5, 6, 7], 10, true);
            //player.animations.add('turn', [3], 20, true);
            player.animations.add('right', [0, 1, 2, 3], 10, true);
			player.animations.add('pushright', [9], 10, true);
			player.animations.add('pushleft', [8], 10, true);
			game.camera.follow(player);
			
			alien = game.add.sprite(700, 25, 'alien'); //make the alien
			var walk = alien.animations.add('walk');
			alien.animations.play('walk', 4, true);

            cursors = game.input.keyboard.createCursorKeys();
			spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
            backgroundPlatforms.callAll('start');
			socket.emit('initialized');
			

			game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.refresh();
			game.input.game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(fullScreenMode, this);
			music = game.add.audio('music');
			music.play();
			meteorsoundeffect = game.add.audio('meteor');
			powerupsoundeffect = game.add.audio('powerupmusic') ;
			pushsoundeffect = game.add.audio('pushmusic');
			winssoundeffect = game.add.audio('winsmusic');
			deathsoundeffect = game.add.audio('deathmusic');
			
},

update: function () {
		
            background.tilePosition.x = -(game.camera.x * 0.7); 
			
			if(color === 'red' && gameDidNotEnd){
				
				stationary.children[0].body.checkCollision.left = false;
				stationary.children[0].body.checkCollision.right = false;
				stationary.children[0].body.checkCollision.down = false; 

				game.physics.arcade.collide(player, stationary.children[0], function(){
					console.log('red paper reached platform');
					socket.emit('end game', color);
					gameDidNotEnd = false;
				});
			}
			else if(color === 'blue' && gameDidNotEnd){
				
				stationary.children[3].body.checkCollision.left = false;
				stationary.children[3].body.checkCollision.right = false;
				stationary.children[3].body.checkCollision.down = false; 
				
				game.physics.arcade.collide(player, stationary.children[3], function(){
					console.log('blue paper reached platform');
					socket.emit('end game', color);
					gameDidNotEnd = false;
				});
			}
			
			game.physics.arcade.collide(player, spikes, resetPlayer);
            game.physics.arcade.collide(player, stationary);
            game.physics.arcade.collide(player, MovingPlatforms, customStep, null, game);
			
			//meteor power up:
            game.physics.arcade.overlap(player, power_up.children[0],function(){
			power_up_meteor('top')		
			}); 
			game.physics.arcade.overlap(player, meteors, meteor_hit);
			
            game.physics.arcade.overlap(player, power_up2.children[1],function(){
			power_up_meteor('bottom')
			}); 
			//alien power up:
			game.physics.arcade.overlap(player, power_up.children[1],function(){
			power_up_alien('top')
			}); 	
			game.physics.arcade.overlap(player, power_up2.children[2],function(){
			power_up_alien('bottom')
			}); 
			game.physics.arcade.collide(player, b_bullets, ball_hit);
			game.physics.arcade.collide(player, b_bullets2, ball_hit);
			
			//spikes power up:
			game.physics.arcade.overlap(player, power_up.children[2], function(){
			power_up_spike('top')
			});
			game.physics.arcade.overlap(player, power_up2.children[0], function(){
			power_up_spike('bottom')
			});
			game.physics.arcade.overlap(player, p_spikes, spike_hit, null, this);
			
			
            var notMoving = player.body.blocked.down || player.body.touching.down || locked;
 			
			text.x = player.x - 25
			text.y = player.y - 50;
				
			player.body.velocity.x = 0;
			
	
	if (gameDidNotEnd){	
			if(spacebar.isDown){
				pushsoundeffect.play();
				console.log('space bar pressed (push)');
			if(playerLooking === 'left'){
					if((((player.x - players[0].x) <= 80) && ((player.x - players[0].x) > 0)) 
						&&((player.y - players[0].y) < 25)){
							 player.play('pushleft');
						socket.emit('pushback', {looking: playerLooking});
					}	
			}
			if(playerLooking === 'right'){
				if((((players[0].x - player.x) <= 80) && ((players[0].x - player.x) > 0)) 
						&&((player.y - players[0].y) < 25)){
							 player.play('pushright');
					socket.emit('pushback', {looking: playerLooking});
				}	
			}
			}else if (cursors.left.isDown){ // if left arrow
                player.body.velocity.x = -150; //move left
                if (playerLooking !== 'left')
                {
                    player.play('left'); //play animation
                    playerLooking = 'left';
                }
			
            }
            else if (cursors.right.isDown){ // if right arrow
                player.body.velocity.x = 150; //move right
                if (playerLooking !== 'right'){
                    player.play('right'); //play right animation
                    playerLooking = 'right';
                }
            }
            else{
                if (playerLooking !== 'idle'){
                    player.animations.stop();

                    if (playerLooking === 'left'){
                        player.frame = 6;
                    }
                    else{
                        player.frame = 0;
                    }

                    playerLooking = 'idle';
                }
            }
            if(notMoving && cursors.up.isDown && game.time.time > jumpTimer){
                if (locked){
                    cancelLock();
                }

                willJump = true;
            }

            if (locked){
                checkLock();
            }
			
			if(pusheffectleft){
				pushsoundeffect.play();
				players[0].player.play("pushleft");
				player.body.velocity.x = -1000;
				socket.emit('move player', { x: player.x, y: player.y });
				pusheffectleft = false;
			}
			else if(pusheffectright){
				pushsoundeffect.play();
				players[0].player.play("pushright");
				player.body.velocity.x = 1000;
				socket.emit('move player', { x: player.x, y: player.y });
				pusheffectright = false;
			}
			
			  socket.emit('move player', { x: player.x, y: player.y });
	}		
	if(initialized){
	 if(color === 'red')
		{
        socket.emit('update platforms', { x0: backgroundPlatforms.children[0].x, y0: backgroundPlatforms.children[0].y,x1: backgroundPlatforms.children[1].x, y1: backgroundPlatforms.children[1].y,x2: backgroundPlatforms.children[2].x, y2: backgroundPlatforms.children[2].y,x3: backgroundPlatforms.children[3].x, y3: backgroundPlatforms.children[3].y,x4: backgroundPlatforms.children[4].x, y4: backgroundPlatforms.children[4].y,x5: backgroundPlatforms.children[5].x, y5: backgroundPlatforms.children[5].y,x6: backgroundPlatforms.children[6].x, y6: backgroundPlatforms.children[6].y, x7: backgroundPlatforms.children[7].x, y7: backgroundPlatforms.children[7].y });
		socket.emit('update bullets', {x0: b_bullets.children[0].x, y0: b_bullets.children[0].y, x1: b_bullets.children[1].x, y1: b_bullets.children[1].y, x2: b_bullets2.children[0].x, y2: b_bullets2.children[0].y, x3: b_bullets2.children[1].x, y3: b_bullets2.children[1].y});
		}
	}
if(game.time.now > respawnTime && gotPowerUp){
		socket.emit('next_powerup')
		gotPowerUp = false
	}
if(game.time.now > respawnTime2 && gotPowerUp2){
		socket.emit('next_powerup2')
		gotPowerUp2 = false
	}
if(game.time.now >endSpikePowerUp && gotSpike){
		resetSpikeKill()
		gotSpike = false;
	}	
},

preRender: function () {

            if (game.paused){

                return;
            }

            if (locked || wasLocked){
                player.x += lockedTo.deltaX;
                player.y = lockedTo.y - 30;

                if (player.body.velocity.x !== 0){
                    player.body.velocity.y = 0;
                }
            }

            if (willJump){
                willJump = false;

                if (lockedTo && lockedTo.deltaY < 0 && wasLocked){
                
                    player.body.velocity.y = -300 + (lockedTo.deltaY * 10);
                }
                else{
                    player.body.velocity.y = -300;
                }


                jumpTimer = game.time.time + 750;
            }

            if (wasLocked){
                wasLocked = false;
                lockedTo.playerLocked = false;
                lockedTo = null;
            }

}

}
