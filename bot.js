var Discord = require('discord.js');
var client = new Discord.Client();
var blacklist = [];
var whitelist = [];
var bw = [];
var tt_gamer1;
var tt_gamer2;
var tt_games = [];
var tt_blacklist = [];
var tt_whitelist = [];
var tt_bw = [];
var c4_gamer1;
var c4_gamer2;
var c4_games = [];
var c4_blacklist = [];
var c4_whitelist = [];
var c4_bw = [];

var bomb = "bomb";
var chars = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

var fs = require('fs');
var currentTriv;
var currentLine;
var channels = [];
var players = [];

var feo = function(bit, array){
	for(var i = 0; i < array.length; i++){
		if(array[i][0] == bit){return i;}
	}
	return -1;
};
var contains = function(bit, array){
	for(var i = 0; i < array.length; i++){
		if(array[i] == bit){return i;}
	}
	return -1;
};
var c4_testWin = function(gam){
	var tie = true;
	for(var i = 0; i < gam.length-2; i++){
		for(var j = 0; j < gam[i].length; j++){
			if(gam[i][j] == 0){
				tie = false;
			}
			//vertical
			if(i-3 >= 0){
				if(gam[i-3][j] == gam[i-2][j] && gam[i-2][j] == gam[i-1][j] && gam[i-1][j] == gam[i-0][j]){
					if(gam[i][j] != 0){
						return gam[i][j];
					}
				}
			}
			//horizontal
			if(j-3 >= 0){
				if(gam[i][j-3] == gam[i][j-2] && gam[i][j-2] == gam[i][j-1] && gam[i][j-1] == gam[i][j]){
					if(gam[i][j] != 0){
					return gam[i][j];
					}
				}
			}
			//diagonal
			//down-right
			if(j-3 >= 0 && i-3 >= 0){
				if(gam[i-3][j-3] == gam[i-2][j-2] && gam[i-2][j-2] == gam[i-1][j-1] && gam[i-1][j-1] == gam[i][j]){
					if(gam[i][j] != 0){
						return gam[i][j];
					}
				}
			}
			//down-left
			if(i-3 >= 0 && j+3 <= gam[i-3].length){
				if(gam[i-3][j+3] == gam[i-2][j+2] && gam[i-2][j+2] == gam[i-1][j+1] && gam[i-1][j+1] == gam[i][j]){
					if(gam[i][j] != 0){
						return gam[i][j];
					}
				}
			}
		}
	}
	if(tie){
		return -1;
	}
	return 0;
};
var tt_testWin = function(gam){
	var tie = true;
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			if(gam[i][j] == 0){
				tie = false;
			}
			//vertical
			if(i-2 >= 0){
				if(gam[i-2][j] == gam[i-1][j] && gam[i-1][j] == gam[i-0][j]){
					if(gam[i][j] != 0){
						return gam[i][j];
					}
				}
			}
			//horizontal
			if(j-2 >= 0){
				if(gam[i][j-2] == gam[i][j-1] && gam[i][j-1] == gam[i][j]){
					if(gam[i][j] != 0){
					return gam[i][j];
					}
				}
			}
			//diagonal
			//down-right
			if(j-2 >= 0 && i-2 >= 0){
				if(gam[i-2][j-2] == gam[i-1][j-1] && gam[i-1][j-1] == gam[i][j]){
					if(gam[i][j] != 0){
						return gam[i][j];
					}
				}
			}
			//down-left
			if(i-2 >= 0 && j+2 <= 3){
				if(gam[i-2][j+2] == gam[i-1][j+1] && gam[i-1][j+1] == gam[i][j]){
					if(gam[i][j] != 0){
						return gam[i][j];
					}
				}
			}
		}
	}
	if(tie){
		return -1;
	}
	return 0;
};
var c4_drawGame = function(ron, gam){
	var text = "```";
	for(var i = 0; i < gam.length-4; i++){
		var row = "|  ";
		for(var j = 0; j < gam[i].length; j++){
			if(gam[i][j] == 0){
				row  = row + ("    ");
			}
			if(gam[i][j] == 1){
				row  = row + ("\\  /");
			}
			if(gam[i][j] == 2){
				row  = row + (" __ ");
			}
			row = row + "  ";
		}
		text = text + row + "|\r\n";
		row = "|  ";
		for(var j = 0; j < gam[i].length; j++){
			if(gam[i][j] == 0){
				row  = row + ("____");
			}
			if(gam[i][j] == 1){
				row  = row + (" >< ");
			}
			if(gam[i][j] == 2){
				row  = row + ("/  \\");
			}
			row = row + "  ";
		}
		text = text + row + "|\r\n";
		row = "|  ";
		for(var j = 0; j < gam[i].length; j++){
			if(gam[i][j] == 0){
				row  = row + ("    ");
			}
			if(gam[i][j] == 1){
				row  = row + ("/  \\");
			}
			if(gam[i][j] == 2){
				row  = row + ("\\__/");
			}
			row = row + "  ";
		}
		text = text + row + "|\r\n";
	}
	text = text + ".   __         __    ___          ___   __   .\r\n";
	text = text + ".  /  \\   /|     )   ___|  |__|  |__   /__   .\r\n";
	text = text + ".  \\__/   _|_   /__  ___|     |  ___)  |__|  .\r\n";
	text = text + "```";
	ron.channel.send(text);
};
var tt_drawGame = function(ron, gam){
	console.log(gam);
	var text = "```";
	for(var i = 0; i < 3; i++){
		var row = "|  ";
		for(var j = 0; j < 3; j++){
			if(gam[i][j] == 0){
				row  = row + ("    ");
			}
			if(gam[i][j] == 1){
				row  = row + ("\\  /");
			}
			if(gam[i][j] == 2){
				row  = row + (" __ ");
			}
			row = row + "  ";
		}
		if(i == 0){
			text = text + " ^  ";
		}
		if(i == 1){
			text = text + " _  ";
		}
		if(i == 2){
			text = text + "___ ";
		}
		text = text + row + "|\r\n";
		row = "|  ";
		for(var j = 0; j < gam[i].length; j++){
			if(gam[i][j] == 0){
				row  = row + ("____");
			}
			if(gam[i][j] == 1){
				row  = row + (" >< ");
			}
			if(gam[i][j] == 2){
				row  = row + ("/  \\");
			}
			row = row + "  ";
		}
		if(i == 0){
			text = text + "/-\\ ";
		}
		if(i == 1){
			text = text + "|_> ";
		}
		if(i == 2){
			text = text + "|   ";
		}
		text = text + row + "|\r\n";
		row = "|  ";
		for(var j = 0; j < gam[i].length; j++){
			if(gam[i][j] == 0){
				row  = row + ("    ");
			}
			if(gam[i][j] == 1){
				row  = row + ("/  \\");
			}
			if(gam[i][j] == 2){
				row  = row + ("\\__/");
			}
			row = row + "  ";
		}
		if(i == 0){
			text = text + "| | ";
		}
		if(i == 1){
			text = text + "|_> ";
		}
		if(i == 2){
			text = text + "|__ ";
		}
		text = text + row + "|\r\n";
	}
	text = text + "    .   __         __    .\r\n";
	text = text + "    .  /  \\   /|     )   .\r\n";
	text = text + "    .  \\__/   _|_   /__  .\r\n";
	text = text + "```";
	ron.channel.send(text);
};
client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
    client.guilds.forEach((guild) => {
		console.log(" - " + guild.name);
		tt_bw.push([guild.id,0]);
		c4_bw.push([guild.id,0]);
		bw.push([guild.id,0]);
    });
});
client.on('message', (recievedMessage) => {
	var hasPermission = function(msg) {
		// var roles = [];
		// for(var i = 0; i < msg.guild.roles; i++){
		// 	if(msg.guild.roles[i].permissions.contains('MANAGE_CHANNELS')){
		// 		roles.push(msg.guild.roles[i])
		// 	}
		// }
		// console.log(roles);
		// for(var i = 0; i < roles.length; i++){
		// 	if(msg.author.roles.hasRole(roles[i].id)){
		// 		return true;
		// 	}
		// }
		return msg.channel.permissionsFor(msg.author).has("MANAGE_MESSAGES");
    };
    if(recievedMessage.author == client.user){
		return;
    }
    
    if(!hasPermission(recievedMessage)){
	if(bw[feo(recievedMessage.guild.id,bw)][1] == 0){
		if(contains(recievedMessage.channel.id,blacklist) >= 0){
			return;
		}
	}
	if(bw[feo(recievedMessage.guild.id,bw)][1] == 1){
		if(contains(recievedMessage.channel.id,whitelist) == -1){
			return;
		}
	}
	if(recievedMessage.content.indexOf("c4") == 0){
		if(c4_bw[feo(recievedMessage.guild.id,bw)][1] == 0){
			if(contains(recievedMessage.channel.id,c4_blacklist) >= 0){
				return;
			}
		}
		if(c4_bw[feo(recievedMessage.guild.id,bw)][1] == 1){
			if(-1 == contains(recievedMessage.channel.id,c4_whitelist)){
				return;
			}
		}
	}
	if(recievedMessage.content.indexOf("tt") == 0){
		if(tt_bw[feo(recievedMessage.guild.id,bw)][1] == 0){
			if(contains(recievedMessage.channel.id,tt_blacklist) >= 0){
				return;
			}
		}
		if(tt_bw[feo(recievedMessage.guild.id,bw)][1] == 1){
			if(-1 == contains(recievedMessage.channel.id,tt_whitelist)){
				return;
			}
		}
	}
	}
    var currentPlayer;
    var addName = true;
    for(var i = 0; i < players.length; i++){
        if(players[i].id == recievedMessage.author.id){
            addName = false;
            currentPlayer = players[i];
        }
    }
    if(addName){
        currentPlayer = {Name:recievedMessage.author.username, id:recievedMessage.author.id, Correct:0, Incorrect:0, OutOfTime:0, Cancelled:0};
        players.push(currentPlayer);
    }
    var currentChannel;
    var addChannel = true;
    for(var i = 0; i < channels.length; i++){
        if(channels[i].id == recievedMessage.channel.id){
            addChannel = false;
            currentChannel = channels[i];
        }
    }
    if(addChannel){
        currentChannel = {id:recievedMessage.channel.id, question:"", answer:"", timeout:0, wait:0};
        channels.push(currentChannel);
    }
    // sf.get(`https://www.reddit.com/r/trivia/random.json?limit=1`).then(res => {
    // recievedMessage.channel.send(res.body[0].data.children[0].data.selftext);
    // //console.log(res.body[1].data.children);

    // });
    if (recievedMessage.content == 'epic ping' || recievedMessage.content == 'epic p') {
        recievedMessage.reply("pong")
        .then(rep => {
            let ping = rep.createdTimestamp-recievedMessage.createdTimestamp;
            rep.edit(`<@${recievedMessage.author.id}> ponged after ` + ping.toString() + "ms.");
        })
        .catch(console.error);
    }
    if(recievedMessage.content == "epic triv q" || recievedMessage.content == "epic triv question"){
        if(currentChannel.wait > 0){
            recievedMessage.channel.send("```Previous Question cancelled. The answer was "+currentChannel.answer+"```");
            currentPlayer.Cancelled++;
        }
        fs.readFile('TriviaQ.txt', 'utf-8', (err, data) => {
            if (err) throw err;
            var dataSplit = data.split('\n');
            currentTriv = Math.floor(Math.random()*dataSplit.length);
            currentLine = Math.floor(Math.random()*2);
            var lineSplit = dataSplit[currentTriv].split(',');
            var i;
            if(currentTriv > 17448){
                currentChannel.question = lineSplit[2];
                i = 3;
            }
            else if(currentTriv > 2212){
                currentChannel.question = lineSplit[1];
                i = 2;
            }
            else{
                currentChannel.question = lineSplit[0];
                i = 1;
            }
            if(lineSplit[i-1][0] == '"'){
                while(lineSplit[i-1][lineSplit[i-1].length-1] != '"'){
                    currentChannel.question += ","+lineSplit[i];
                    i++;
                }
                currentChannel.question = currentChannel.question.replace(/\"\"/, 'xqe');
                currentChannel.question = currentChannel.question.replace(/\"/, '').split('"')[0];
                console.log(currentChannel.question);
                currentChannel.question = currentChannel.question.replace(/[x][q][e]/, '"');
            }
            currentChannel.answer = "";
            if(lineSplit[i][0] == '"'){
                while(lineSplit[i-1][lineSplit[i-1].length-1] != '"'){
                    currentChannel.answer += ","+lineSplit[i];
                    i++;
                }
                currentChannel.answer = currentChannel.answer.replace(/\"\"/, 'xqe');
                currentChannel.answer = currentChannel.answer.replace(/\"/, '').split('"')[0];
                
                currentChannel.answer = currentChannel.answer.replace(/[x][q][e]/, '"');
            }
            else{
                currentChannel.answer = lineSplit[i];
            }
            currentChannel.answering = true;
            recievedMessage.channel.send("```Trivia question #"+currentTriv+"\n"+currentChannel.question+"```");
            currentChannel.wait = 90;
        });
    }
    else if(currentChannel.wait > 0){
        if(recievedMessage.content == "cancel" || recievedMessage.content == "idk" || recievedMessage.content == "nvm"){
            recievedMessage.channel.send("```Trivia question cancelled. The answer was "+currentChannel.answer+"```");
            currentPlayer.Cancelled++;
            currentChannel.wait = 0;
        }
        else if(recievedMessage.content.toLowerCase().replace(/\s/, '').split(' ')[0].replace(/[t][h][e]/i, '') == currentChannel.answer.toLowerCase().replace(/\s/,'').split(' ')[0].replace(/[t][h][e]/i, '')){
            recievedMessage.channel.send("```Correct! The answer was "+currentChannel.answer+"```");
            currentChannel.wait = 0;
            currentPlayer.Correct++;
        }
        else{
            currentPlayer.Incorrect++;
        }
    }
    if(recievedMessage.content == "epic triv stats" || recievedMessage.content == "epic triv s"){
        recievedMessage.channel.send("```diff\nStats for "+currentPlayer.Name+"\n\n+Answered Correctly "+currentPlayer.Correct+" times \n-Answered Incorrectly "+currentPlayer.Incorrect+" times \n"+(Math.floor(currentPlayer.Correct/(currentPlayer.Incorrect+currentPlayer.Correct)*100)>50?"+":"-")+"Answered Correctly "+Math.floor(currentPlayer.Correct/(currentPlayer.Incorrect+currentPlayer.Correct)*100)+"% of the time\n-Ran out of time "+currentPlayer.OutOfTime+" times\n-Cancelled a question "+currentPlayer.Cancelled+" times```");
    }
    

	if(recievedMessage.content.indexOf("epic ms") == 0){
		
		if(recievedMessage.content.split(" ")[2] == "gen"){
			var w = recievedMessage.content.split(" ")[3];
			var h = recievedMessage.content.split(" ")[4];
			var a = recievedMessage.content.split(" ")[5];
			generateBoard(w, h, a, recievedMessage.channel, recievedMessage.content.split(" ")[6] == "h");
		}
		else if(recievedMessage.content.split(" ")[2] == "hex"){
			var w = recievedMessage.content.split(" ")[3];
			var h = recievedMessage.content.split(" ")[4];
			var a = recievedMessage.content.split(" ")[5];
			generateHexBoard(w, h, a, recievedMessage.channel, recievedMessage.content.split(" ")[6] == "h");
		}
	}
	if(recievedMessage.author == client.user){
		return;
	}
	if(recievedMessage.content.indexOf("epic help") == 0){
        if(recievedMessage.content.split(" ")[2] == "ms"){
			recievedMessage.channel.send("```Commands: \nepic help ms: display a helpful message of commands \nepic ms gen [width] [height] [amount] (h): generate a minesweeper board with a width of [width], a height of [height], containing [amount] of mines, possibly hinting (h) at a 0 \nepic ms hex [width] [height] [amount] (h): generate hexagonal minesweeper board, params the same as regular```");
		}
		if(recievedMessage.content == "epic help c4" || recievedMessage.content == "epic help connect4" || recievedMessage.content == "epic help connect-4"){
			//connect 4 stuff
        }
        if(recievedMessage.content == "epic help triv" || recievedMessage.content == "epic h triv"){
            recievedMessage.channel.send("```Trivia bot commands: \nepic triv question: recieve a trivia question to try to answer. This will also cancel a previous question if it is currently being asked. Aliases: epic triv q\ncancel: cancel the question currently being asked. Aliases: idk, nvm\ntriv stats: displays statistics about you. Aliases: triv s\ntriv help: displays this help message. Alisases: triv h\ntriv ping: pings triviaBot and displays a response time. Aliases: triv p```");
        }
		else if(recievedMessage.content == "epig help tt" || recievedMessage.content == "epic help tictactoe" || recievedMessage.content == "epic help tic-tac-toe"){

		}
		else{
			recievedMessage.channel.send("``` \r\n ________________________________________________\r\n|              ---Commands List---               |\r\n|epic blacklist (channel id)                        |\r\n|Blacklists a given channel, or the channel the  |\r\n|message was written in. This will also|\r\n|enable blacklist mode if it is disabled.        |```");
		}
	}
	if(recievedMessage.content.indexOf("epic blacklist") == 0){
        var c;
		if(hasPermission(recievedMessage)){
		if(bw[feo(recievedMessage.guild.id,bw)][1] == 1){
			bw[feo(recievedMessage.guild.id,bw)][1] = 0;
			recievedMessage.channel.send("Now Toggled to Blacklist Mode.");
		}
		if(recievedMessage.content.split(" ")[1] != null && recievedMessage.content.split(" ")[1] != ""){
			if(contains(recievedMessage.content.split(" ")[1],blacklist) >= 0){
				recievedMessage.channel.send(client.channels.find("id",blacklist[blacklist.length-1]).name + " Is No Longer Blacklisted!");
				blacklist.splice(c,1);
			}
			else{
				c = recievedMessage.content.split(" ")[1];
				blacklist.push(c);
				console.log(recievedMessage.content.split(" ")[1]);
				recievedMessage.channel.send(client.channels.find("id",blacklist[blacklist.length-1]).name + " Is Now Blacklisted!");
			}
		}
		else{
			if(contains(recievedMessage.channel.id,blacklist) >= 0){
				c = contains(recievedMessage.channel.id,blacklist);
				blacklist.splice(c, 1);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is No Longer Blacklisted!");
			}
			else {
				blacklist.push(recievedMessage.channel.id);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is Now Blacklisted!");
			}
		}
		console.log(blacklist);
		}
		else{
			recievedMessage.channel.send("You do not have Permission to do That!");
		}
	}
	if(recievedMessage.content.indexOf("epic whitelist") == 0){
		if(hasPermission(recievedMessage)){
		if(bw[feo(recievedMessage.guild.id,bw)][1] == 0){
			bw[feo(recievedMessage.guild.id,bw)][1] = 1;
			recievedMessage.channel.send("Now Toggled to Whitelist Mode.");
		}
		if(recievedMessage.content.split(" ")[1] != null && recievedMessage.content.split(" ")[1] != ""){
			if(contains(recievedMessage.content.split(" ")[1],whitelist) >= 0){
				recievedMessage.channel.send(client.channels.find("id",whitelist[whitelist.length-1]).name + " Is No Longer whitelisted!");
				whitelist.splice(c,1);
			}
			else{
				c = recievedMessage.content.split(" ")[1];
				whitelist.push(c);
				console.log(recievedMessage.content.split(" ")[1]);
				recievedMessage.channel.send(client.channels.find("id",whitelist[whitelist.length-1]).name + " Is Now Whitelisted!");
			}
		}
		else{
			if(contains(recievedMessage.channel.id,whitelist) >= 0){
				c = contains(recievedMessage.channel.id,whitelist);
				whitelist.splice(c, 1);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is No Longer Whitelisted!");
			}
			else {
				whitelist.push(recievedMessage.channel.id);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is Now Whitelisted!");
			}
		}
		}
		else{
			recievedMessage.channel.send("You do not have Permission to do That!");
		}
	}
	if(recievedMessage.content.indexOf("epic tt blacklist") == 0){
		if(hasPermission(recievedMessage)){
		if(tt_bw[feo(recievedMessage.guild.id,bw)][1] == 1){
			tt_bw[feo(recievedMessage.guild.id,bw)][1] = 0;
			recievedMessage.channel.send("Now Toggled to Blacklist Mode.");
		}
		if(recievedMessage.content.split(" ")[1] != null && recievedMessage.content.split(" ")[1] != ""){
			if(contains(recievedMessage.content.split(" ")[1],tt_blacklist) >= 0){
				recievedMessage.channel.send(client.channels.find("id",tt_blacklist[tt_blacklist.length-1]).name + " Is No Longer Blacklisted!");
				tt_blacklist.splice(c,1);
			}
			else{
				c = recievedMessage.content.split(" ")[1];
				tt_blacklist.push(c)
				recievedMessage.channel.send(client.channels.find("id",tt_blacklist[tt_blacklist.length-1]).name + " Is Now Blacklisted!");
			}
		}
		else{
			if(contains(recievedMessage.channel.id,tt_blacklist) >= 0){
				c = contains(recievedMessage.channel.id,tt_blacklist);
				tt_blacklist.splice(c, 1);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is No Longer Blacklisted!");
			}
			else {
				tt_blacklist.push(recievedMessage.channel.id);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is Now Blacklisted!");
			}
		}
		}
		else{
			recievedMessage.channel.send("You do not have Permission to do That!");
		}
	}
	if(recievedMessage.content.indexOf("epic tt whitelist") == 0){
		if(hasPermission(recievedMessage)){
		if(tt_bw[feo(recievedMessage.guild.id,bw)][1] == 0){
			tt_bw[feo(recievedMessage.guild.id,bw)][1] = 1;
			recievedMessage.channel.send("Now Toggled to Whitelist Mode.");
		}
		if(recievedMessage.content.split(" ")[1] != null && recievedMessage.content.split(" ")[1] != ""){
			if(contains(recievedMessage.content.split(" ")[1],tt_whitelist) >= 0){
				recievedMessage.channel.send(client.channels.find("id",tt_whitelist[tt_whitelist.length-1]).name + " Is No Longer whitelisted!");
				tt_whitelist.splice(c,1);
			}
			else{
				var c = recievedMessage.content.split(" ")[1];
				tt_whitelist.push(c);
				console.log(recievedMessage.content.split(" ")[1]);
				recievedMessage.channel.send(client.channels.find("id",tt_whitelist[tt_whitelist.length-1]).name + " Is Now Whitelisted!");
			}
		}
		else{
			if(contains(recievedMessage.channel.id,tt_whitelist) >= 0){
				c = contains(recievedMessage.channel.id,tt_whitelist);
				tt_whitelist.splice(c, 1);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is No Longer Whitelisted!");
			}
			else {
				tt_whitelist.push(recievedMessage.channel.id);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is Now Whitelisted!");
			}
		}
		}
		else{
			recievedMessage.channel.send("You do not have Permission to do That!");
		}
	}
	if(recievedMessage.content.indexOf("epic c4 blacklist") == 0){
		if(hasPermission(recievedMessage)){
		if(c4_bw[feo(recievedMessage.guild.id,bw)][1] == 1){
			c4_bw[feo(recievedMessage.guild.id,bw)][1] = 0;
			recievedMessage.channel.send("Now Toggled to Blacklist Mode.");
		}
		if(recievedMessage.content.split(" ")[1] != null && recievedMessage.content.split(" ")[1] != ""){
			if(contains(recievedMessage.content.split(" ")[1],c4_blacklist) >= 0){
				recievedMessage.channel.send(client.channels.find("id",c4_blacklist[c4_blacklist.length-1]).name + " Is No Longer Blacklisted!");
				c4_blacklist.splice(c,1);
			}
			else{
				c = recievedMessage.content.split(" ")[1];
				c4_blacklist.push(c);
				console.log(recievedMessage.content.split(" ")[1]);
				recievedMessage.channel.send(client.channels.find("id",c4_blacklist[c4_blacklist.length-1]).name + " Is Now Blacklisted!");
			}
		}
		else{
			if(contains(recievedMessage.channel.id,c4_blacklist) >= 0){
				c = contains(recievedMessage.channel.id,c4_blacklist);
				c4_blacklist.splice(c, 1);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is No Longer Blacklisted!");
			}
			else {
				c4_blacklist.push(recievedMessage.channel.id);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is Now Blacklisted!");
			}
		}
		console.log(c4_blacklist);
		}
		else{
			recievedMessage.channel.send("You do not have Permission to do That!");
		}
	}
	if(recievedMessage.content.indexOf("epic c4 whitelist") == 0){
		if(hasPermission(recievedMessage)){
		if(c4_bw[feo(recievedMessage.guild.id,bw)][1] == 0){
			c4_bw[feo(recievedMessage.guild.id,bw)][1] = 1;
			recievedMessage.channel.send("Now Toggled to Whitelist Mode.");
		}
		if(recievedMessage.content.split(" ")[1] != null && recievedMessage.content.split(" ")[1] != ""){
			if(contains(recievedMessage.content.split(" ")[1],c4_whitelist) >= 0){
				recievedMessage.channel.send(client.channels.find("id",c4_whitelist[c4_whitelist.length-1]).name + " Is No Longer whitelisted!");
				c4_whitelist.splice(c,1);
			}
			else{
				c = recievedMessage.content.split(" ")[1];
				c4_whitelist.push(c);
				console.log(recievedMessage.content.split(" ")[1]);
				recievedMessage.channel.send(client.channels.find("id",c4_whitelist[c4_whitelist.length-1]).name + " Is Now Whitelisted!");
			}
		}
		else{
			if(contains(recievedMessage.channel.id,c4_whitelist) >= 0){
				c = contains(recievedMessage.channel.id,c4_whitelist);
				c4_whitelist.splice(c, 1);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is No Longer Whitelisted!");
			}
			else {
				c4_whitelist.push(recievedMessage.channel.id);
				recievedMessage.channel.send(recievedMessage.channel.name + " Is Now Whitelisted!");
			}
		}
		}
		else{
			recievedMessage.channel.send("You do not have Permission to do That!");
		}
	}
	if(recievedMessage.content.indexOf("epic start") == 0){
		var alread = false;
		for(var i = 0; i < tt_games.length; i++){
			if(tt_games[i][tt_games[i].length-4] == recievedMessage.channel){
				recievedMessage.channel.send("There is Already a Game Running in this Channel!");
				alread = true;
			}
		}
			if(!alread){
			var game = [[0,0,0],[0,0,0],[0,0,0],recievedMessage.channel];
			tt_gamer1 = recievedMessage.author;
			tt_gamer2 = recievedMessage.content.split(' ')[1];
			var gamerReal = false;
			for(var j = 0; j < recievedMessage.guild.memberCount; j++){
				if(recievedMessage.guild.members.array()[j] == tt_gamer2){
					gamerReal = true;
				}
			}
			if(gamerReal){
				game.push(tt_gamer1);
				game.push(tt_gamer2);
				game.push(1);
				tt_games.push(game);
				tt_drawGame(recievedMessage, game);
				recievedMessage.channel.send(tt_gamer1+ " is playing with X against "+tt_gamer2+"'s O!");
			}
			else{
				recievedMessage.channel.send(tt_gamer2+" is not on this channel!");
			}
		}
	}
	var tt_place_regex = /(([012][abc])|([abc][012]))|(([012][ABC])|([ABC][012]))/g;
	var tt_order1 = /([012][abc])|([012][ABC])/g;
	console.log(recievedMessage.content);
	var passed = tt_place_regex.test(recievedMessage.content);
	var o1p = tt_order1.test(recievedMessage.content);
	console.log(passed);
	if(passed){
		console.log("Passed");
		var channels = [];
		for(var i = 0; i < tt_games.length; i++){
			channels.push(tt_games[i][3]);
		}
		if(contains(recievedMessage.channel,channels) >= 0){
			num = contains(recievedMessage.channel,channels);
			if(recievedMessage.author == tt_games[num][4] && tt_games[num][6] == 1){
				console.log("okay");
				if(o1p){
					r = parseInt(recievedMessage.content.charAt(0),10);
					c = recievedMessage.content.charCodeAt(1);
				}
				else{
					r = parseInt(recievedMessage.content.charAt(1),10);
					c = recievedMessage.content.charCodeAt(0);
				}
				if(c > 90){
					c = c - 97;
				}
				else{
					c = c - 65;
				}
				if(tt_games[num][c][r] == 0){
					tt_games[num][c][r] = 1;
					tt_games[num][6] = 2;
					tt_drawGame(recievedMessage,tt_games[num]);
					console.log("test!");
					if(tt_testWin(tt_games[num]) == 1){
						recievedMessage.channel.send(tt_games[num][4]+" Wins!");
						tt_games.splice(num,1);
					}
					else if(tt_testWin(tt_games[num]) == -1){
						recievedMessage.channel.send(tt_games[num][4]+" And "+tt_games[num][5]+" Tied!");
						tt_games.splice(num,1);
					}
				}
				else{
					recievedMessage.channel.send("Someone already went there!");
				}

			}
			else if(recievedMessage.author == tt_games[num][5] && tt_games[num][6] == 2){
				console.log("okay");
				if(o1p){
					r = parseInt(recievedMessage.content.charAt(0),10);
					c = recievedMessage.content.charCodeAt(1);
				}
				else{
					r = parseInt(recievedMessage.content.charAt(1),10);
					c = recievedMessage.content.charCodeAt(0);
				}
				if(c > 90){
					c = c - 97;
				}
				else{
					c = c - 65;
				}
				if(tt_games[num][c][r] == 0){
					tt_games[num][c][r] = 2;
					tt_games[num][6] = 1;
					tt_drawGame(recievedMessage,tt_games[num]);
					console.log("Test!");
					if(tt_testWin(tt_games[num]) == 2){
						recievedMessage.channel.send(tt_games[num][5]+" Wins!");
						tt_games.splice(num,1);
					}
					else if(tt_testWin(tt_games[num]) == -1){
						recievedMessage.channel.send(tt_games[num][4]+" And "+tt_games[num][5]+" Tied!");
						tt_games.splice(num,1);
					}
				}
				else{
					recievedMessage.channel.send("Someone already went there!");
				}
			}
			else if(recievedMessage.author == tt_games[num][4] || recievedMessage.user == tt_games[num][5]){
				recievedMessage.channel.send("It's not your turn!");
			}
			else{
				recievedMessage.channel.send("You are not in this game!");
			}
		}
		else{
			recievedMessage.channel.send("There is no game running in this channel!");
		}
	}
	if(recievedMessage.content.indexOf("epic c4 start") == 0){
		var alread = false;
		for(var i = 0; i < c4_games.length; i++){
			if(games[i][c4_games[i].length-4] == recievedMessage.channel){
				recievedMessage.channel.send("There is already a game running in this channel!");
				alread = true;
			}
		}
			if(!alread){
			var game = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],recievedMessage.channel];
			c4_gamer1 = recievedMessage.author;
			c4_gamer2 = recievedMessage.content.split(' ')[3];
			var gamerReal = false;
			for(var j = 0; j < recievedMessage.guild.memberCount; j++){
				if(recievedMessage.guild.members.array()[j] == c4_gamer2){
					gamerReal = true;
				}
			}
			if(gamerReal){
				game.push(c4_gamer1);
				game.push(c4_gamer2);
				game.push(1);
				c4_games.push(game);
				c4_drawGame(recievedMessage, game);
				recievedMessage.channel.send(c4_gamer1+ " is playing with X against "+c4_gamer2+"'s O!");
			}
			else{
				recievedMessage.channel.send(c4_gamer2+" is not on this channel!");
			}
		}
	}
	if(recievedMessage.content.indexOf("epic c4 stop") == 0) {
		var game;
		var gamenum;
		var running = false;
		for(var i = 0; i < c4_games.length; i++){
			if(c4_games[i][c4_games[i].length-4] == recievedMessage.channel){
				game = c4_games[i];
				running = true;
				gamenum = i;
			}
		}
		if(!running){
			recievedMessage.channel.send("There is currently no game running in this channel!");
			return;

		}
		c4_games.splice(gamenum,1);
		recievedMessage.channel.send("Game has been stopped.");
	}
	if(recievedMessage.content < 7 && recievedMessage.content >= 0){
		var game;
		var gamenum;
		var running = false;
		for(var i = 0; i < c4_games.length; i++){
			if(c4_games[i][c4_games[i].length-4] == recievedMessage.channel){
				game = c4_games[i];
				running = true;
				gamenum = i;
			}
		}
		if(!running){
			return;

		}
		if(game[9] == 1 && recievedMessage.author == game[7]){
			for(var i = 0; i < game.length-4; i++){
				if(game[game.length-i-5][recievedMessage.content] == 0){
					game[game.length-i-5][recievedMessage.content] = 1;
					c4_drawGame(recievedMessage, game);
					console.log(c4_testWin(game));
					if(c4_testWin(game) == 1){
						recievedMessage.channel.send(game[7]+" Wins!");
						c4_games.splice(gamenum,1);
					}
					if(c4_testWin(game) == -1){
						recievedMessage.channel.send(game[7]+" And "+game[8]+" Tied!");
						c4_games.splice(gamenum,1);
					}
					game[9] = 2
					break;
				}
				if(i == game.length-4){
					recievedMessage.channel.send("That row is full!");
				}
			}
		}
		else if(game[9] == 2 && recievedMessage.author == game[8]){
			for(var i = 0; i < game.length-4; i++){
				if(game[game.length-i-5][recievedMessage.content] == 0){
					game[game.length-i-5][recievedMessage.content] = 2;
					c4_drawGame(recievedMessage, game);
					game[9] = 1;
					if(c4_testWin(game) == 2){
						recievedMessage.channel.send(game[8]+" Wins!");
						c4_games.splice(gamenum,1);
					}
					if(c4_testWin(game) == -1){
						recievedMessage.channel.send(game[7]+" And "+game[8]+" Tied!");
						c4_games.splice(gamenum,1);
					}
					break;
				}
				if(i == game.length-4){
					recievedMessage.channel.send("That row is full!");
				}
			}
		}
	}
	if(recievedMessage.content.indexOf("epic c4 place") == 0) {
		var game;
		var gamenum;
		var running = false;
		for(var i = 0; i < c4_games.length; i++){
			if(c4_games[i][c4_games[i].length-4] == recievedMessage.channel){
				game = c4_games[i];
				running = true;
				gamenum = i;
			}
		}
		if(!running){
			recievedMessage.channel.send("There is currently no game running in this channel!");
			return

		}
		if(game[9] == 1 && recievedMessage.author == game[7]){
			for(var i = 0; i < game.length-4; i++){
				if(game[game.length-i-5][recievedMessage.content.split(' ')[1]] == 0){
					game[game.length-i-5][recievedMessage.content.split(' ')[1]] = 1;
					c4_drawGame(recievedMessage, game);
					if(c4_testWin(game) == 1){
						recievedMessage.channel.send(game[7]+" Wins!")
						c4_games.splice(gamenum,1);
					}
					if(c4_testWin(game) == -1){
						recievedMessage.channel.send(game[7]+" And "+game[8]+" Tied!")
					}
					game[9] = 2
					break;
				}
				if(i == game.length-4){
					if(recievedMessage.content.split(' ')[1] < 0 || recievedMessage.content.split(' ')[1] > game[0].length){
						recievedMessage.channel.send("That is outside the board!");
					}
					recievedMessage.channel.send("That row is full!");
				}
			}
		}
		else if(game[9] == 2 && recievedMessage.author == game[8]){
			for(var i = 0; i < game.length-4; i++){
				if(game[game.length-i-5][recievedMessage.content.split(' ')[1]] == 0){
					game[game.length-i-5][recievedMessage.content.split(' ')[1]] = 2;
					c4_drawGame(recievedMessage, game);
					game[9] = 1;
					if(c4_testWin(game) == 2){
						recievedMessage.channel.send(game[8]+" Wins!")
						c4_games.splice(gamenum,1);
					}
					if(c4_testWin(game) == -1){
						recievedMessage.channel.send(game[7]+" And "+game[8]+" Tied!")
					}
					break;
				}
				if(i == game.length-4){
					if(recievedMessage.content.split(' ')[1] < 0 || recievedMessage.content.split(' ')[1] > game[0].length){
						recievedMessage.channel.send("That is outside the board!");
					}
					recievedMessage.channel.send("That row is full!");
				}
			}
		}
		else if(recievedMessage.author == game[7] || recievedMessage.author == game[8]){
			recievedMessage.channel.send("It's not your turn!");
		}
		else{
			recievedMessage.channel.send("You are not in this game!")
		}
	}
	//recievedMessage.channel.send("Message recieved: " + recievedMessage.content)
})

function generateBoard(width, height, amount, channel, hint){
	if(amount > width*height){
		channel.send("```Too many mines!```");
		return;
	}
	if(width > 100){
		channel.send("```Too wide!```");
		return;
	}
	if(height > 1000){
		channel.send("```Too tall!```");
		return;
	}
	channel.send("```Generating "+width+"x"+height+" board with "+amount+" mines"+(hint?" and a hint.```":".```"));
	var board = [];
	for(var i = 0; i < width; i++){
		var line = [];
		for(var j = 0; j < height; j++){
			line.push(0);
		}
		board.push(line);
	}
	for(var i = 0; i < amount; i++){
		var x = Math.floor(Math.random()*height);
		var y = Math.floor(Math.random()*width);
		var j = 0;
		while(board[x][y] == -1 && j < 150000){
			j++;
			var x = Math.floor(Math.random()*height);
			var y = Math.floor(Math.random()*width);
		}
		if(j >= 149999){
			channel.send("```Taking too long!```");
			return;
		}
		board[x][y] = -1;
	}
	for(var i = 0; i < width; i++){
		for(var j = 0; j < height; j++){
			if(board[i][j] != -1){
				var mineCount = 0;
				for(var k = i-1; k <= i+1; k++){
					for(var l = j-1; l <= j+1; l++){
						if((k != i || l != j) && k >= 0 && l >= 0 && k < height && l < width && board[k][l] == -1){
							mineCount++;
						}
					}
				}
				board[i][j] = mineCount;
			}
		}
	}
	var boardMessage;
	var hinted = false;
	for(var i = 0; i < height; i++){
		boardMessage = "";
		for(var j = 0; j < width; j++){
			if(board[j][i] != 0 || hinted == true || !hint)
				boardMessage+= "||";
			boardMessage+=":";
			if(board[j][i] == -1)
				boardMessage += bomb;
			else
				boardMessage += chars[board[j][i]];
			boardMessage+=":";
			if(board[j][i] != 0 || hinted || !hint)
				boardMessage+= "||";
			else
				hinted = true;
		}
		channel.send(boardMessage);
	}
	channel.send("```Generation Complete```");
}
function generateHexBoard(width, height, amount, channel, hint){
	if(amount > width*height){
		channel.send("```Too many mines!```");
		return;
	}
	if(width > 100){
		channel.send("```Too wide!```");
		return;
	}
	if(height > 1000){
		channel.send("```Too tall!```");
		return;
	}
	channel.send("```Generating Hexagonal "+width+"x"+height+" board with "+amount+" mines"+(hint?" and a hint.```":".```"));
	var board = [];
	for(var i = 0; i < height; i++){
		var line = [];
		for(var j = 0; j < width-i%2; j++){
			line.push(0);
		}
		board.push(line);
	}
	for(var i = 0; i < amount; i++){
		var x = Math.floor(Math.random()*height);
		var y = Math.floor(Math.random()*board[x].length);
		var j = 0;
		while(board[x][y] == -1 && j < 150000){
			j++;
			var x = Math.floor(Math.random()*height);
			var y = Math.floor(Math.random()*board[x].length);
		}
		if(j >= 149999){
			channel.send("```Taking too long!```");
			return;
		}
		board[x][y] = -1;
	}
	for(var i = 0; i < height; i++){
		for(var j = 0; j < board[i].length; j++){
			if(board[i][j] != -1){
				var mineCount = 0;
				if(i > 0 && board[i-1][j] == -1){
					mineCount++;
				}
				if(i < board.length-1 && board[i+1][j] == -1){
					mineCount++;
				}
				if(j > 0 && board[i][j-1] == -1){
					mineCount++;
				}
				if(j < board[i].length-1 && board[i][j+1] == -1){
					mineCount++;
				}
				if(j < board.length-1 && i > 0 && i % 2 == 1 && board[i-1][j+1] == -1){
					mineCount++;
				}
				if(i < board.length-1 && j < board[i].length-1 && i % 2 == 1 && board[i+1][j+1] == -1){
					mineCount++;
				}
				if(j > 0 && i < board.length-1 && i % 2 == 0 && board[i+1][j-1] == -1){
					mineCount++;
				}
				if(i > 0 && j > 0 && i % 2 == 0 && board[i-1][j-1] == -1){
					mineCount++;
				}
				
				board[i][j] = mineCount;
			}
		}
	}
	var boardMessage;
	var hinted = false;
	for(var i = 0; i < height; i++){
		if(i % 2 == 0)
			boardMessage = "";
		else
			boardMessage = ".  ";
		for(var j = 0; j < width-i%2; j++){
			if(board[i][j] != 0 || hinted == true || !hint)
				boardMessage+= "||";
			boardMessage+=":";
			if(board[i][j] == -1)
				boardMessage += bomb;
			else
				boardMessage += chars[board[i][j]];
			boardMessage+=":";
			if(board[i][j] != 0 || hinted || !hint)
				boardMessage+= "||";
			else
				hinted = true;
		}
		channel.send(boardMessage);
	}
	channel.send("```Generation Complete```");
}

var interval = setInterval(function(){
    for(var i = 0; i < channels.length; i++){
        channels[i].wait--;
        if(channels[i].wait == 0){
            message.channel.send("```Out of time. The correct answer was "+currentChannel.answer+"```");
            currentPlayer.OutOfTime++;
        }
    }
},1000);

client.login(process.env.BOT_TOKEN);
