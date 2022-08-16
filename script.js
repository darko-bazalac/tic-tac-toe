const O_CLASS = "o";
const X_CLASS = "x";
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
