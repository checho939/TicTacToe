const cells = document.querySelectorAll(".cells");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentPlayer = "X";
let gameEnd = false;

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  const player1 = prompt("Ingrese el nombre del Jugador 1:");
  const player2 = prompt("Ingrese el nombre del Jugador 2:");
  localStorage.setItem(player1, 0);
  localStorage.setItem(player2, 0);
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  gameEnd = false;
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (gameEnd) {
      return;
    }
    if (cell.textContent === "") {
      cell.textContent = currentPlayer;
      if (checkWin()) {
        gameEnd = true;
      } else if (checkTie()) {
        gameEnd = true;
        alert("Excelente juego, es un empate!");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

function checkWin() {
  return winConditions.some((condition) => {
    if (condition.every((index) => cells[index].textContent === currentPlayer)) {
      gameEnd = true;
      alert(`${currentPlayer} ha ganado la partida!`);
      let wins = localStorage.getItem(currentPlayer);
      localStorage.setItem(currentPlayer, ++wins);
      console.log(currentPlayer,wins)
      return true;
    } else {
      return false;
    }
  });
}

function checkTie() {
  return Array.from(cells).every((cell) => {
    return cell.textContent !== "";
  });
}