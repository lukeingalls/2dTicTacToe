var turn = 0;

var ids = ['BUL', 'BUM', 'BUR', 'BML', 'BMM', 'BMR', 'BLL', 'BLM', 'BLR'];

var start = false;
//Define how a gameboard should interact.
class gameboard {
  	constructor() {
		this.UR = 'E';
		this.UM = 'E';
		this.UL = 'E';
		this.ML = 'E';
		this.MM = 'E';
		this.MR = 'E';
		this.BL = 'E';
		this.BM = 'E';
		this.BR = 'E';
		this.winner = 'E';
	}

	check_winner() {
		if (this.winner != 'E') return this.winner;
		
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

		return this.winner;
	}
};

//Board refers to the little boards big_board is the big_board
var board = new Array();
for (var g = 0; g < 9; g++) {
	board.push(new gameboard());
}
var big_board = new gameboard();


function small_win(board_id, player) {
	small_board = document.getElementById(board_id);
	small_board.innerHTML = player;
	if (board_id.charAt(1) == 'M') {
		small_board.style.fontSize = '25.8vh';
	} else {
		small_board.style.fontSize = '26.8vh';
	}
	small_board.style.textAlign = 'center';

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
			big_board.LL = player;
			break;
		case 'BLM':
			big_board.LM = player;
			break;
		case 'BLR':
			big_board.LR = player;
			break;
		default:
			alert('Stop fucking with the js');
			invalid = true;
			return;
	}
	if (big_board.check_winner() != 'E') {
		alert('Player ' + player + ' has won!')
	}
}

function lock_unlock(source) {
	b = document.getElementsByTagName('button');
	buttons = document.getElementById(source).getElementsByTagName('button');
	if (buttons.length != 0) {
		for (var i = 0; i < b.length; i++) {
				b[i].disabled = true;
		}
		for (var i = buttons.length - 1; i >= 0; i--) {
			if (buttons[i].innerText == 'empty') {
				buttons[i].disabled = false;
			} else {
				buttons[i].disabled = true;
			}
		}
	} else {
		for (var i = 0; i < b.length; i++) {
			if (b[i].innerText == 'empty') {
				b[i].disabled = false;
			} else {
				b[i].disabled = true;
			}
		}
	}
}



function move_played(id) {
	if (start == false) {
		start_manipulations = document.getElementById("header1");
		start_manip = document.getElementById("header2");
		start_manipulations.style.display = "none";
		start_manip.style.display = "flex";
		start = true;
	}

	var tile = document.getElementById(id);
	var orig = id.substring(0,3);
	var dest = id.substring(4,7);
	var player;
	var item;
	var invalid = false;
	var stated_player = document.getElementById("player_turn");
	if (turn) {
		player = 'O'
		stated_player.innerHTML = 'X';
	} else {
		player = 'X'
		stated_player.innerHTML = 'O';
	}
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
	if (board[board_index].winner != 'E') return;
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
	tile.innerText = player;
	tile.style.color = 'crimson';
	item = board[board_index].check_winner();
	if (item != 'E') {
		small_win(orig, player);
	}
	lock_unlock(dest);

	if (!invalid) {
		if (turn) {
			turn = 0;
		} else {
			turn = 1;
		}
	}
}