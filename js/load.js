var loadState = {

preload: function () {
	this.load.crossOrigin = 'anonymous';
	this.load.image('spikes', 'images/spikes.png', 1593, 40);
	this.load.image('background', 'images/space.png');
	this.load.image('platform', 'images/plat1.png');
	this.load.image('platform_bot', 'images/plat2.png');
        this.load.image('red_plat','images/red_plat.png');
        this.load.image('blue_plat','images/blue_plat.png');
	this.load.image('platform_short', 'images/plat3.png');
	this.load.image('platform_mid', 'images/plat4.png');
	this.load.image('bullet', 'images/purple_ball.png');
	this.load.spritesheet('alien', 'images/angry_alien.png',124,124);
	this.load.spritesheet('dude', 'images/blue_player.png', 39, 60);
	this.load.image('push', 'images/push.png');
	this.load.image('meteor', 'images/meteor3x.png');
	this.load.image('blue_spike', 'images/blue_spike.png', 32, 32);
	this.load.image('red_spike', 'images/red_spike.png', 32, 32);
	this.load.image('meteor_power_up', 'images/orange_ball.png');
	this.load.image('alien_power_up', 'images/green_ball.png');
	this.load.image('spike_power_up', 'images/yellow_ball.png');
	this.load.spritesheet('red_player', 'images/red_player.png', 39, 60);
	this.load.image('start_button', 'images/start_button.png');
	this.load.image('rules_button', 'images/rules.png');
	this.load.image('back_button', 'images/back.png');
	this.load.image('replay_button', 'images/menu_button.png');
	this.load.audio('music', 'audio/music.wav')
	this.load.audio('meteor', 'audio/meteor.mp3')
	this.load.audio('menumusic', 'audio/menu.ogg')
	this.load.audio('powerupmusic', 'audio/power_up.wav')
	this.load.audio('pushmusic', 'audio/push.wav')
	this.load.audio('winsmusic', 'audio/wins.wav')
	this.load.audio('deathmusic', 'audio/death.wav')
	this.load.image('next_button', 'images/next_button.png'); //j change
	this.load.image('menu_button', 'images/menu_button.png'); // j change
	this.load.spritesheet('new_alien', 'images/angry_alien.png', 124, 124);
},

create: function() {
game.state.start('menu')
}

};
