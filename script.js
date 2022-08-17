const O_CLASS = "o";
const X_CLASS = "x";
const WINING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const fieldEls = document.querySelectorAll("[data-field]");
const board = document.getElementById("board");
let oTurn;

(function startGame() {
  oTurn = false;
  fieldEls.forEach((field) => {
    field.addEventListener("click", handleClick, { once: true });
  });
  setHoverEffect();
})();

function handleClick(e) {
  //placeMark
  let turn = oTurn ? O_CLASS : X_CLASS;
  let field = e.target;
  field.classList.add(turn);
  //Check for Win
  if (checkWin(turn)) {
    console.log(`Winner ${turn}`);
  }

  //Swap Turns
  oTurn = !oTurn;
  setHoverEffect();
}

function setHoverEffect() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(turn) {
  return WINING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return fieldEls[index].classList.contains(turn);
    });
  });
}
