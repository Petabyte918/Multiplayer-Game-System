
var express = require('express');  //server setup with player class included
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Player = require("./Player").Player;

var numPlayers = 0; 
var initialized = 0;
app.use(express.static(__dirname));
 
app.get('/', function(req, res){  //go to html
  res.render('/index.html');
});
 
var players; 
 
 function init(){
		players = [];
		console.log("server is running");
		server.listen(10013);
		console.log("Multiplayer app listening on port 10013");
		
		setEventHandlers();
};
 
init(); // initialize
 
function setEventHandlers(){ //when socket is connected do this
	io.on('connection', function(client){
		onSocketConnection(client);
	});
}
 
function onSocketConnection(client){ //check the smitted message
 //	console.log('New player!' + client.id);
	client.on('disconnect', onClientDisconnect);
	client.on('new player', onNewPlayer);
	client.on('move player', onMovePlayer); 
	
	client.on('update platforms', function(data){
		io.emit('update platforms', data);
	});
	
	client.on('update bullets', function(data){
		io.emit('update bullets', data);
	});
	
        client.on('next_powerup', function(){
		io.emit('next_powerup')
	});
        client.on('next_powerup2', function(){
		io.emit('next_powerup2')
	});
	
	client.on('blue meteor', onBlueMeteor);
	client.on('red meteor', onRedMeteor);
	client.on('blue alien', onBlueAlien);
	client.on('red alien', onRedAlien);
	client.on('blue spike', onBlueSpike);
	client.on('red spike', onRedSpike);
	
	client.on('reset initialized', function(){
		players = [];
		initialized = 0;
	});
	
	client.on('end game', function(data){
		io.emit('end game', data);
		numPlayers = 0
	});
	
	client.on('add player', function(){
		if(numPlayers < 2){ //dennis fix
		numPlayers++;
		//console.log("numplayers: ", numPlayers)
		if(numPlayers == 2){
			//console.log("starting game")
		client.emit('color','blue');
			io.emit('start_game');
		} else {
		client.emit('color','red');
		}
		}
	
	});	
	
	client.on('pushback', function(data){
		this.broadcast.emit('pushedback',{looking: data.looking});
	});
	
	client.on('initialized', function(){
		initialized++;
		//console.log('initialized: ' + initialized);
		if(initialized === 2){
			io.emit('initialized');
		}
		
	});
	
	client.on('death', function(){
		io.emit('death');
	})

};

 
function onClientDisconnect(){ //logic for disconnect players
	//console.log('Player has disconnected: ' + this.id);
	 var removePlayer = playerById(this.id)

	if(!removePlayer){
		//console.log('Player not found' + this.id);
		return
	}
	if(numPlayers > 0){
	numPlayers--
	}
	if(initialized > 0){
	initialized--
	}
	//console.log('num players: ' + numPlayers)
	
	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1)

  // Broadcast removed player to connected socket clients
  this.broadcast.emit('remove player', {id: this.id})
 };
 
function onNewPlayer(data){ //logic for connect players
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = this.id;
	
	//new player is sent to other players
	//console.log("new player is sent to the other players" + this.id)
	this.broadcast.emit('new player', { id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY() });
	
	//sending existing players to new player!
	//console.log("sending existing players to new player!" + this.id)
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
    existingPlayer = players[i];
    this.emit('new player', { id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY() });
	} 
//	console.log("player pushed to server!" + this.id);
	players.push(newPlayer);
};
 
 function onMovePlayer(data){
	var movePlayer = playerById(this.id)
	// Player not found
  if (!movePlayer) {
   // console.log('Moving Player not found: ' + this.id)
    return
  }

  // Update player position
  movePlayer.setX(data.x)
  movePlayer.setY(data.y)

  // Broadcast updated position to connected socket clients
  this.broadcast.emit('move player', {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()})

};

function onBlueMeteor(data){
	io.emit('blue meteor', data);
};

function onRedMeteor(data){
	io.emit('red meteor', data);
};

function onBlueAlien(data){
	io.emit('blue alien', data);
};

function onRedAlien(data){
	io.emit('red alien', data);
};

function onBlueSpike(data){
	io.emit('blue spike', data);
};

function onRedSpike(data){
	io.emit('red spike', data);
};
 
 function playerById (id) { // logic to get player by id
  var i
  for (i = 0; i < players.length; i++) {
    if (players[i].id === id) {
      return players[i]
    }
  }

  return false //doesn't exist
};
