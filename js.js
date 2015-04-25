var turn = 0;
var player1 = "x";
var computer = "o";
var solved = false;
var success = false;


$(function(){
  $(".restart-btn").on("click", restartGame);
  $(".game-board td").on("click", placePiece);
});

var array = [
    [[],[],[]],
    [[],[],[]],
    [[],[],[]]
];

function placePiece() {
  $(this).text(player1);
  turn++;
  $(".game-board td").off("click", placePiece);
  checkWin();
  var self = this;
  window.setTimeout(function(){
    computerTurn(self);
  }, 500);
}

function restartGame(){
  $(".game-board td").off("click", placePiece);
  $(".game-board td").each(function(index, el){
    $(el).text("");
  });
  turn = 0;
  solved = false;
  success = false;
  $(".game-board td").on("click", placePiece);
}

var computerTurn = function(el) {
  // check for two o's in a row.
    // place third o
  checkTwoO();
  if (success) {
    computerFinishesTurn();
    return;
  }

  // check for two x's in a row.
    // block third x.
  checkTwoX();
  if (success) {
    computerFinishesTurn();
    return;
  }

  // if middle is empty
    // take middle
  takeMiddle();
  if (success) {
    computerFinishesTurn();
    return;
  }

  // if middle is is taken
    // take diagonal
  middleTaken();
  if (success) {
    computerFinishesTurn();
    return;
  }
  // search for spot that is adjacent and has multiple spots open
  strategicMove();
  if (success) {
    computerFinishesTurn();
    return;
  }

  // search for spot that has only one spot open
  strategicMove2();
  if (success) {
    computerFinishesTurn();
    return;
  }
};

function computerFinishesTurn() {
  success = false;
  turn++;
  $(".game-board td").on("click", placePiece);
  if (!solved) {
    checkWin();
  }
}

function checkTwoX() {
  checkDiagonalsTwoX();
  if (success) {
    return;
  }
  checkColumnsTwoX();
  if (success) {
    return;
  }
  checkRowsTwoX();
}

function checkRowsTwoX() {
  var found;
  var xArray = [];
  var oArray = [];
  for (var i = 0; i < array.length; i++){
    xArray = [];
    oArray = [];
    found = false;
    $(".game-board td").removeClass("temp");
    for (var j = 0; j < array.length; j++){
      if (array[i][j] === "x") {
        xArray.push(array[i][j]);
      } else if ( array[i][j] !== "o" ) {
        var findClass = i.toString() + j.toString();
        $("."+findClass).addClass("temp");
      }
      if (array[i][j] === "o") {
        oArray.push(array[i][j]);
      }
    }
    if (xArray.length === 2 && oArray.length === 0) {
      success = true;
      found = true;
      if ($(".temp").length > 0) {
        $(".temp").text("o");
      } else {
        var findClass = i.toString() + (j+1).toString();
        $("."+findClass).text("o");
      }
      break;
    }
  }
  $(".game-board td").removeClass("temp");
}

function checkColumnsTwoX() {
  var found;
  var xArray = [];
  var oArray = [];
  for (var i = 0; i < array.length; i++){
    xArray = [];
    oArray = [];
    found = false;
    $(".game-board td").removeClass("temp");
    for (var j = 0; j < array.length; j++){
      if (array[j][i] === "x") {
        xArray.push(array[j][i]);
      } else if ( array[j][i] !== "o" ) {
        var findClass = j.toString() + i.toString();
        $("."+findClass).addClass("temp");
      }
      if (array[j][i] === "o") {
        oArray.push(array[j][i]);
      }
    }
    if (xArray.length === 2 && oArray.length === 0) {
      found = true;
      success = true;
      if ($(".temp").length > 0) {
        $(".temp").text("o");
      } else {
        var findClass = j.toString() + i.toString();
        $("."+findClass).text("o");
      }
      break;
    }
  }
  $(".game-board td").removeClass("temp");
}

function checkDiagonalsTwoX() {
  var xArray = [];
  var oArray = [];
  var found = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i][i] === "x") {
      xArray.push(array[i][i]);
    } else if ( array[i][i] !== "o" ) {
      var findClass = i.toString() + i.toString();
      $("."+findClass).addClass("temp");
    }
    if (array[i][i] === "o") {
      oArray.push(array[i][i]);
    }
  }
  if (xArray.length === 2 && oArray.length === 0) {
    found = true;
    success = true;
    if ($(".temp").length > 0) {
        $(".temp").text("o");
      } else {
        var findClass = i.toString() + i.toString();
        $("."+findClass).text("o");
      }
  }
  $(".game-board td").removeClass("temp");
  // don't bother with second diagonal if found
  if (found) {
    return;
  }
  xArray = [];
  oArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i][array.length -1 - i] === "x") {
      xArray.push(array[i][array.length -1 - i]);
    } else if ( array[i][array.length -1 - i] !== "o" ) {
      var findClass = i.toString() + (array.length -1 - i).toString();
      $("."+findClass).addClass("temp");
    }
    if (array[i][array.length -1 - i] === "o") {
      oArray.push(array[i][array.length -1 - i]);
    }
  }
  if (xArray.length === 2 && oArray.length === 0) {
    success = true;
    if ($(".temp").length > 0) {
        $(".temp").text("o");
      } else {
        var findClass = i.toString() + (array.length -1 - i).toString();
        $("."+findClass).text("o");
      }
  }
  $(".game-board td").removeClass("temp");
}

function checkTwoO() {
  checkDiagonalsTwoO();
  if (success) {
    return;
  }
  checkColumnsTwoO();
  if (success) {
    return;
  }
  checkRowsTwoO();
}

function checkRowsTwoO() {
  var found;
  var oArray = [];
  var xArray = [];
  for (var i = 0; i < array.length; i++){
    oArray = [];
    xArray = [];
    found = false;
    $(".game-board td").removeClass("temp");
    for (var j = 0; j < array.length; j++){
      if (array[i][j] === "o") {
        oArray.push(array[i][j]);
      } else if ( array[i][j] !== "x" ) {
        var findClass = i.toString() + j.toString();
        $("."+findClass).addClass("temp");
      }
      if (array[i][j] === "x") {
        xArray.push(array[i][j]);
      }
    }
    if (oArray.length === 2 && xArray.length === 0) {
      success = true;
      found = true;
      if ($(".temp").length > 0) {
        $(".temp").text("o");
      } else {
        var findClass = i.toString() + (j+1).toString();
        $("."+findClass).text("o");
      }
      break;
    }
  }
  $(".game-board td").removeClass("temp");
}

function checkColumnsTwoO() {

  var found;
  var oArray = [];
  var xArray = [];
  for (var i = 0; i < array.length; i++){
    oArray = [];
    xArray = [];
    found = false;
    $(".game-board td").removeClass("temp");
    for (var j = 0; j < array.length; j++){
      if (array[j][i] === "o") {
        oArray.push(array[j][i]);
      } else if ( array[j][i] !== "x" ) {
        var findClass = j.toString() + i.toString();
        $("."+findClass).addClass("temp");
      }
      if (array[j][i] === "x") {
        xArray.push(array[j][i]);
      }
    }
    if (oArray.length === 2 && xArray.length === 0) {
      found = true;
      success = true;
      if ($(".temp").length > 0) {
        $(".temp").text("o");
      } else {
        var findClass = j.toString() + i.toString();
        $("."+findClass).text("o");
      }
      break;
    }
  }
  $(".game-board td").removeClass("temp");
}

function checkDiagonalsTwoO() {
  var oArray = [];
  var xArray = [];
  var found = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i][i] === "o") {
      oArray.push(array[i][i]);
    } else if ( array[i][i] !== "x" ) {
      var findClass = i.toString() + i.toString();
      $("."+findClass).addClass("temp");
    }
    if (array[i][i] === "x") {
      xArray.push(array[i][i]);
    }
  }
  if (oArray.length === 2 && xArray.length === 0) {
    found = true;
    success = true;
    if ($(".temp").length > 0) {
        $(".temp").text("o");
      } else {
        var findClass = i.toString() + i.toString();
        $("."+findClass).text("o");
      }
  }
  $(".game-board td").removeClass("temp");
  // don't bother with second diagonal if found
  if (found) {
    return;
  }
  oArray = [];
  xArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i][array.length -1 - i] === "o") {
      oArray.push(array[i][array.length -1 - i]);
    } else if ( array[i][array.length -1 - i] !== "x" ) {
      var findClass = i.toString() + (array.length -1 - i).toString();
      $("."+findClass).addClass("temp");
    }
    if (array[i][array.length -1 - i] === "x") {
      xArray.push(array[i][array.length -1 - i]);
    }
  }
  if (oArray.length === 2 && xArray.length === 0) {
    success = true;
    if ($(".temp").length > 0) {
        $(".temp").text("o");
      } else {
        var findClass = i.toString() + (array.length -1 - i).toString();
        $("."+findClass).text("o");
      }
  }
  $(".game-board td").removeClass("temp");
}

function takeMiddle() {
  if (array[1][1] === "") {
    $(".11").text("o");
    success = true;
  }
}

function middleTaken() {
  if (array[1][1] === "x" && array[0][0] !== "o") {
    $(".00").text("o");
    success = true;
  }
}

function strategicMove() {
  strategicDiagonal();
  if (success) {
    return;
  }
  strategicColumn();
  if (success) {
    return;
  }
  strategicRow();
}

function strategicDiagonal() {
  var oArray = [];
  var xArray = [];
  var found = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i][i] === "o") {
      oArray.push(array[i][i]);
    } else if ( array[i][i] !== "x" ) {
      var findClass = i.toString() + i.toString();
      $("."+findClass).addClass("temp");
    }
    if (array[i][i] === "x") {
      xArray.push(array[i][i]);
    }
  }
  // debugger;
  if (oArray.length === 1 && xArray.length === 0) {
    found = true;
    success = true;
    $($(".temp")[1]).text("o");
  }
  $(".game-board td").removeClass("temp");
  // don't bother with second diagonal if found
  if (found) {
    return;
  }
  oArray = [];
  xArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i][array.length -1 - i] === "o") {
      oArray.push(array[i][array.length -1 - i]);
    } else if ( array[i][array.length -1 - i] !== "x" ) {
      var findClass = i.toString() + (array.length -1 - i).toString();
      $("."+findClass).addClass("temp");
    }
    if (array[i][array.length -1 - i] === "x") {
      xArray.push(array[i][array.length -1 - i]);
    }
  }
  if (oArray.length === 1 && xArray.length === 0) {
    success = true;
    $($(".temp")[1]).text("o");
  }
  $(".game-board td").removeClass("temp");
}

function strategicColumn() {
  var found;
  var oArray = [];
  var xArray = [];
  for (var i = 0; i < array.length; i++){
    oArray = [];
    xArray = [];
    found = false;
    $(".game-board td").removeClass("temp");
    for (var j = 0; j < array.length; j++){
      if (array[j][i] === "o") {
        oArray.push(array[j][i]);
      } else if ( array[j][i] !== "x" ) {
        var findClass = j.toString() + i.toString();
        $("."+findClass).addClass("temp");
      }
      if (array[j][i] === "x") {
        xArray.push(array[j][i]);
      }
    }
    if (oArray.length === 1 && xArray.length === 0) {
      found = true;
      success = true;
      $($(".temp")[1]).text("o");
      break;
    }
  }
  $(".game-board td").removeClass("temp");
}

function strategicRow() {
  var found;
  var oArray = [];
  var xArray = [];
  for (var i = 0; i < array.length; i++){
    oArray = [];
    xArray = [];
    found = false;
    $(".game-board td").removeClass("temp");
    for (var j = 0; j < array.length; j++){
      if (array[i][j] === "o") {
        oArray.push(array[i][j]);
      } else if ( array[i][j] !== "x" ) {
        var findClass = i.toString() + j.toString();
        $("."+findClass).addClass("temp");
      }
      if (array[i][j] === "x") {
        xArray.push(array[i][j]);
      }
    }
    if (oArray.length === 1 && xArray.length === 0) {
      success = true;
      found = true;
      $($(".temp")[1]).text("o");
      break;
    }
  }
  $(".game-board td").removeClass("temp");
}

function strategicMove2() {
  strategicDiagonal2();
  if (success) {
    return;
  }
  strategicColumn2();
  if (success) {
    return;
  }
  strategicRow2();
}

function strategicDiagonal2() {
  var oArray = [];
  var xArray = [];
  var found = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i][i] === "o") {
      oArray.push(array[i][i]);
    } else if ( array[i][i] !== "x" ) {
      var findClass = i.toString() + i.toString();
      $("."+findClass).addClass("temp");
    }
    if (array[i][i] === "x") {
      xArray.push(array[i][i]);
    }
  }
  // debugger;
  if (oArray.length === 1 && xArray.length === 1) {
    found = true;
    success = true;
    $(".temp").text("o");
  }
  $(".game-board td").removeClass("temp");
  // don't bother with second diagonal if found
  if (found) {
    return;
  }
  oArray = [];
  xArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i][array.length -1 - i] === "o") {
      oArray.push(array[i][array.length -1 - i]);
    } else if ( array[i][array.length -1 - i] !== "x" ) {
      var findClass = i.toString() + (array.length -1 - i).toString();
      $("."+findClass).addClass("temp");
    }
    if (array[i][array.length -1 - i] === "x") {
      xArray.push(array[i][array.length -1 - i]);
    }
  }
  if (oArray.length === 1 && xArray.length === 1) {
    success = true;
    $(".temp").text("o");
  }
  $(".game-board td").removeClass("temp");
}

function strategicColumn2() {
  var found;
  var oArray = [];
  var xArray = [];
  for (var i = 0; i < array.length; i++){
    oArray = [];
    xArray = [];
    found = false;
    $(".game-board td").removeClass("temp");
    for (var j = 0; j < array.length; j++){
      if (array[j][i] === "o") {
        oArray.push(array[j][i]);
      } else if ( array[j][i] !== "x" ) {
        var findClass = j.toString() + i.toString();
        $("."+findClass).addClass("temp");
      }
      if (array[j][i] === "x") {
        xArray.push(array[j][i]);
      }
    }
    if (oArray.length === 1 && xArray.length === 1) {
      found = true;
      success = true;
      $(".temp").text("o");
      break;
    }
  }
  $(".game-board td").removeClass("temp");
}

function strategicRow2() {
  var found;
  var oArray = [];
  var xArray = [];
  for (var i = 0; i < array.length; i++){
    oArray = [];
    xArray = [];
    found = false;
    $(".game-board td").removeClass("temp");
    for (var j = 0; j < array.length; j++){
      if (array[i][j] === "o") {
        oArray.push(array[i][j]);
      } else if ( array[i][j] !== "x" ) {
        var findClass = i.toString() + j.toString();
        $("."+findClass).addClass("temp");
      }
      if (array[i][j] === "x") {
        xArray.push(array[i][j]);
      }
    }
    if (oArray.length === 1 && xArray.length === 0) {
      success = true;
      found = true;
      $($(".temp")[0]).text("o");
      break;
    }
  }
  $(".game-board td").removeClass("temp");
}

var checkWin = function() {
  // get array of gameboard
  $(".game-board td").each(function(index, el){
    var i = el.className[0];
    var j = el.className[1];
    array[i][j] = $(el).text();
  });

  // check rows
  checkRows(array);

  // check columns
  checkColumns(array);

  // check diagonals
  checkDiagonals(array);

  // check tie
  if (turn === 9 && !solved) {
    alertWinner();
  }
};

function alertWinner(winner) {
  solved = true;
  if (winner === "x"){
    alert("You won");
  } else if (winner === "o") {
    alert("Computer won");
  } else {
    alert("Tie");
  }
  $(".game-board td").off("click", placePiece);
}

function checkRows(array) {
  var found;
  var xArray = [];
  var oArray = [];
  for (var i = 0; i < array.length; i++){
    xArray = [];
    oArray = [];
    found = false;
    for (var j = 0; j < array.length; j++){
      if (array[i][j] === "x") {
        xArray.push(array[i][j])
      }
      if (array[i][j] === "o") {
        oArray.push(array[i][j])
      }
      if (xArray.length === 3 || oArray.length ===3) {
        var winner = xArray.length === 3 ? "x" : "o";
        alertWinner(winner);
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
}

function checkColumns(array) {
  var found;
  var xArray = [];
  var oArray = [];
  for (var i = 0; i < array.length; i++){
    xArray = [];
    oArray = [];
    found = false;
    for (var j = 0; j < array.length; j++){
      if (array[j][i] === "x") {
        xArray.push(array[j][i]);
      }
      if (array[j][i] === "o") {
        oArray.push(array[j][i]);
      }
      if (xArray.length === 3 || oArray.length ===3) {
        var winner = xArray.length === 3 ? "x" : "o";
        alertWinner(winner);
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
}

function checkDiagonals(array){
  var xArray = [];
  var oArray = [];
  var found = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i][i] === "x") {
      xArray.push(array[i][i]);
    }
    if (array[i][i] === "o") {
      oArray.push(array[i][i]);
    }

    if (xArray.length === 3 || oArray.length ===3) {
      var winner = xArray.length === 3 ? "x" : "o";
      alertWinner(winner);
      found = true;
      break;
    }
  }

  // don't bother with second diagonal if found
  if (found) {
    return;
  }

  xArray = [];
  oArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i][array.length -1 - i] === "x") {
      xArray.push(array[i][array.length -1 - i]);
    }
    if (array[i][array.length -1 - i] === "o") {
      oArray.push(array[i][array.length -1 - i]);
    }

    if (xArray.length === 3 || oArray.length ===3) {
      var winner = xArray.length === 3 ? "x" : "o";
      alertWinner(winner);
      break;
    }
  }
}
