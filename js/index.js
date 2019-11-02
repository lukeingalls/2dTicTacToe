//Normal Stack implementation (to be used with undo)
class Stack { 
  
    // Array is used to implement stack 
    constructor() { 
        this.items = []; 
    } 
  
    // Functions to be implemented 
    push(element) { 
	    // push element into the items 
	    this.items.push(element); 
	} 
    pop() { 
	    // return top most element in the stack 
	    // and removes it from the stack 
	    // Underflow if stack is empty 
	    if (this.items.length == 0) 
	        return "Underflow"; 
	    return this.items.pop(); 
	} 
    peek() { 
	    // return the top most element from the stack 
	    // but does'nt delete it. 
	    return this.items[this.items.length - 1]; 
	} 
    isEmpty() { 
	    // return true if stack is empty 
	    return this.items.length == 0; 
	} 
} 

//Ids of gameboards
var ids = ['BUL', 'BUM', 'BUR', 'BML', 'BMM', 'BMR', 'BLL', 'BLM', 'BLR'];

//Game move stack
var game_moves = new Stack();

//Tracks who is supposed to go
var turn = 0;

//Indicates the game has started.
var start = false;

//Define how a gameboard should interact.
class gameboard {
  	constructor() {
  		//Upper board elements.
		this.UR = 'E';
		this.UM = 'E';
		this.UL = 'E';
		//Middle board elements.
		this.ML = 'E';
		this.MM = 'E';
		this.MR = 'E';
		//Bottom board elements.
		this.BL = 'E';
		this.BM = 'E';
		this.BR = 'E';

		//Player who has won the board.
		this.winner = 'E';
	}

	check_winner() {
		//Winner has already been determined previously.
		
		// Horizontal win conditions
		if (this.UR == this.UM && this.UM == this.UL && this.UR != 'E') {
			this.winner = this.UR;
			return this.winner;
		}
		if (this.MR == this.MM && this.MM == this.ML && this.MR != 'E') {
			this.winner = this.MR;
			return this.winner;
		}
		if (this.BR == this.BM && this.BM == this.BL && this.BR != 'E') {
			this.winner = this.BR;
			return this.winner;
		}

		//Vertical win conditions
		if (this.UR == this.MR && this.MR == this.BR && this.UR != 'E') {
			this.winner = this.UR;
			return this.winner;
		}
		if (this.UM == this.MM && this.MM == this.BM && this.UM != 'E') {
			this.winner = this.UM;
			return this.winner;
		}
		if (this.UL == this.ML && this.ML == this.BL && this.BL != 'E') {
			this.winner = this.BL;
			return this.winner;
		}

		//Diagnol win conditions
		if (this.UR == this.MM && this.MM == this.BL && this.UR != 'E') {
			this.winner = this.UR;
			return this.winner;
		}
		if (this.UL == this.MM && this.MM == this.BR && this.UL != 'E') {
			this.winner = this.UL;
			return this.winner;
		}

		//Set this.winner to E. Redundant except for the undo function.
		this.winner = 'E';
		return this.winner;
	}
};

//Board refers to the little boards big_board is the big_board
var board = new Array();
for (var g = 0; g < 9; g++) {
	board.push(new gameboard());
}
var big_board = new gameboard();

//This function handles when a player wins a smaller board.
function small_win(board_id, player) {
	//Get rid of the small board.
	small_board = document.getElementById(board_id);
	small_board.style.display = "none";

	//Replace small board with the larger character of the winner.
	small_board = document.getElementById(board_id+'-Won');
	small_board.classList.remove("Wonton");
	small_board.classList.remove("Wonton-Middle");
	small_board.innerHTML = player;

	//Mark the winner in the larger gameboard.
	switch(board_id) {
		case 'BUL':
			big_board.UL = player;
			break;
		case 'BUM':
			big_board.UM = player;
			break;
		case 'BUR':
			big_board.UR = player;
			break;
		case 'BML':
			big_board.ML = player;
			break;
		case 'BMM':
			big_board.MM = player;
			break;
		case 'BMR':
			big_board.MR = player;
			break;
		case 'BLL':
			big_board.BL = player;
			break;
		case 'BLM':
			big_board.BM = player;
			break;
		case 'BLR':
			big_board.BR = player;
			break;
	}

	//Shows that a player has won the game.
	if (big_board.check_winner() != 'E') {
		alert('Player ' + player + ' has won!')
		//Lock all tiles.
		lock_everything = document.getElementsByTagName('button');
		for (var i = lock_everything.length - 1; i >= 0; i--) {
			if (!lock_everything[i].disabled) {
				lock_everything[i].disabled == true;
			}
		}
	}
}

//Controls locking and unlocking of tiles.
function lock_unlock(source) {
	//Get all buttons.
	b = document.getElementsByTagName('button');
	//Get buttons from the source.
	buttons = document.getElementById(source).getElementsByTagName('button');
	//Identify whether a tile has been won already
	check_buttons = document.getElementById(source+'-Won').classList;
	if (check_buttons.contains('Wonton') || check_buttons.contains('Wonton-Middle')) {
		//This branch runs when the destination tile hasn't been won.
		//Disable all tiles.
		for (var i = 0; i < b.length; i++) {
				b[i].disabled = true;
		}
		//Enable empty tiles.
		for (var i = buttons.length - 1; i >= 0; i--) {
			if (buttons[i].innerText == 'empty') {
				buttons[i].disabled = false;
			} else {
				buttons[i].disabled = true;
			}
		}
	} else {
		//Branch runs when destination tile has been won.
		for (var i = 0; i < b.length; i++) {
			//Enable all empty buttons.
			if (b[i].innerText == 'empty') {
				b[i].disabled = false;
			} else {
				b[i].disabled = true;
			}
		}
	}
}

//Does what the name implies
function unlock_all() {
	//Get all buttons.
	b = document.getElementsByTagName('button');
	for (var i = 0; i < b.length; i++) {
		//Enable all buttons.
		b[i].disabled = false;
	}
}

function move_played(id) {
	console.log(board)
	//Change the header once the game has been won.
	if (start == false) {
		start_manipulations = document.getElementById("header1");
		start_manip = document.getElementById("header2");
		start_manipulations.style.display = "none";
		start_manip.style.display = "flex";
		start = true;
	}

	//Get the board we are looking at.
	var tile = document.getElementById(id);
	
	//Get origin and destination from the id.
	var orig = id.substring(0,3);
	var dest = id.substring(4,7);
	
	//The X or the O
	var player;

	//Used to check win states.
	var item;

	//Validity of the move.
	var invalid = false;

	//This will identify the player making the move and update whose move it is.
	var stated_player = document.getElementById("player_turn");
	if (turn) {
		player = 'O'
		stated_player.innerHTML = 'X';
	} else {
		player = 'X'
		stated_player.innerHTML = 'O';
	}

	//Identify which little board we are at.
	var board_index = 0;
	switch(orig) {
		case 'BUL':
			board_index = 0;
			break;
		case 'BUM':
			board_index = 1;
			break;
		case 'BUR':
			board_index = 2;
			break;
		case 'BML':
			board_index = 3;
			break;
		case 'BMM':
			board_index = 4;
			break;
		case 'BMR':
			board_index = 5;
			break;
		case 'BLL':
			board_index = 6;
			break;
		case 'BLM':
			board_index = 7;
			break;
		case 'BLR':
			board_index = 8;
			break;
		default:
			alert('Stop fucking with the js');
			invalid = true;
			return;
	}

	//Make sure the board can be interacted with.
	if (board[board_index].winner != 'E') return;

	//Identify the small tile we are in and mark it.
	switch(dest) {
		case 'BUL':
			if (board[board_index].UL == 'E') {
				board[board_index].UL = player;
			} else invalid = true;
			break;
		case 'BUM':
			if (board[board_index].UM == 'E') {
				board[board_index].UM = player;
			} else invalid = true;
			break;
		case 'BUR':
			if (board[board_index].UR == 'E') {
				board[board_index].UR = player;
			} else invalid = true;
			break;
		case 'BML':
			if (board[board_index].ML == 'E') {
				board[board_index].ML = player;
			} else invalid = true;
			break;
		case 'BMM':
			if (board[board_index].MM == 'E') {
				board[board_index].MM = player;
			} else invalid = true;
			break;
		case 'BMR':
			if (board[board_index].MR == 'E') {
				board[board_index].MR = player;
			} else invalid = true;
			break;
		case 'BLL':
			if (board[board_index].BL == 'E') {
				board[board_index].BL = player;
			} else invalid = true;
			break;
		case 'BLM':
			if (board[board_index].BM == 'E') {
				board[board_index].BM = player;
			} else invalid = true;
			break;
		case 'BLR':
			if (board[board_index].BR == 'E') {
				board[board_index].BR = player;
			} else invalid = true;
			break;
		default:
			alert('Stop fucking with the js');
			return;
	}
	//Add the player info to the button and showing it.
	tile.innerText = player;
	tile.style.color = 'crimson';

	//Check a win
	item = board[board_index].check_winner();
	
	//Do win condition stuff
	if (item != 'E') {
		small_win(orig, player);
	}

	//Toggle tiles when there isn't a winner.
	if (big_board.check_winner() == 'E') {
		lock_unlock(dest);
	}

	//Change turns if a valid move has been played.
	if (!invalid) {
		// Add the move to the stack
		game_moves.push(id)
		if (turn) {
			turn = 0;
		} else {
			turn = 1;
		}
	}
}

function undo() {
	if (!game_moves.isEmpty()) {
		//Remove the element to undo from the stack.
		move_to_undo = game_moves.peek();
		game_moves.pop();

		//Define the origin and destination
		var orig = move_to_undo.substring(0,3);
		var dest = move_to_undo.substring(4,7);

		//Identify which little board we are at.
		var board_index = 0;
		switch(orig) {
			case 'BUL':
				board_index = 0;
				break;
			case 'BUM':
				board_index = 1;
				break;
			case 'BUR':
				board_index = 2;
				break;
			case 'BML':
				board_index = 3;
				break;
			case 'BMM':
				board_index = 4;
				break;
			case 'BMR':
				board_index = 5;
				break;
			case 'BLL':
				board_index = 6;
				break;
			case 'BLM':
				board_index = 7;
				break;
			case 'BLR':
				board_index = 8;
				break;
		}
		var win_state_previous = board[board_index].check_winner();
		//Identify the small tile we are in and mark it.
		switch(dest) {
			case 'BUL':
					board[board_index].UL = 'E';
				break;
			case 'BUM':
					board[board_index].UM = 'E';
				break;
			case 'BUR':
					board[board_index].UR = 'E';
				break;
			case 'BML':
					board[board_index].ML = 'E';
				break;
			case 'BMM':
					board[board_index].MM = 'E';
				break;
			case 'BMR':
					board[board_index].MR = 'E';
				break;
			case 'BLL':
					board[board_index].BL = 'E';
				break;
			case 'BLM':
					board[board_index].BM = 'E';
				break;
			case 'BLR':
					board[board_index].BR = 'E';
				break;
		}
		//Reset text in button
		var tile = document.getElementById(move_to_undo);
		tile.innerText = 'empty';
		tile.style.color = 'transparent';
		// Take away a board win.
		if (win_state_previous != board[board_index].check_winner()) {
			small_board = document.getElementById(orig);
			small_board.style.display = "inline-block";

			//Replace small board with the larger character of the winner.
			small_board = document.getElementById(orig+'-Won');
			if (orig.charAt(1) == 'M') {
				small_board.classList.add("Wonton-Middle");
			} else {
				small_board.classList.add("Wonton");
			}
		}

		//Unlock tiles.
		if (game_moves.isEmpty()) {
			unlock_all();		
		} else {
			lock_unlock(orig);
		}

		var stated_player = document.getElementById("player_turn");
		//Change the turn
		if (turn) {
			turn = 0;
			stated_player.innerHTML = 'X';
		} else {
			turn = 1;
			stated_player.innerHTML = 'O';
		}
	}
}

function reset() {
	//Reset all buttons
	b = document.getElementsByTagName('button');
	for (var i = b.length - 1; i >= 0; i--) {
		b[i].disabled = false;
		b[i].innerText = 'empty';
		b[i].style.color = 'transparent';
	}

	//Reset moves
	for (var i = ids.length - 1; i >= 0; i--) {
		small_board = document.getElementById(ids[i]);
		small_board.style.display = "inline-block";

		//Replace small board with the larger character of the winner.
		small_board = document.getElementById(ids[i]+'-Won');
		if (ids[i].charAt(1) == 'M') {
			small_board.classList.add("Wonton-Middle");
		} else {
			small_board.classList.add("Wonton");
		}
	}
	for (var i = board.length - 1; i >= 0; i--) {
		board[i].UR = 'E';
		board[i].UM = 'E';
		board[i].UL = 'E';
		board[i].ML = 'E';
		board[i].MM = 'E';
		board[i].MR = 'E';
		board[i].BL = 'E';
		board[i].BM = 'E';
		board[i].BR = 'E';
	}
	//Empty the moves stack
	while (!game_moves.isEmpty()) {
		game_moves.pop();
	}

	turn = 0;
	var stated_player = document.getElementById("player_turn");
	stated_player.innerHTML = 'X';
}