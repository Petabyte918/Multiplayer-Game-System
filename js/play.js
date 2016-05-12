var game = new Phaser.Game(1500, 750, Phaser.CANVAS, 'game') 



game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('rules', rulesState);
game.state.add('rules2', rules2State); //j change
game.state.add('game', gameState);

game.state.start('boot');
