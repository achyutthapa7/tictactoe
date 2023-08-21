document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll("[data-cell]");
  const board = document.getElementById("board");
  const resetButton = document.getElementById("reset-button");

  let currentPlayer = "X";
  let gameOver = false;

  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });

  resetButton.addEventListener("click", resetGame);

  function handleClick(event) {
    const cell = event.target;
    if (gameOver || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    if (checkWin()) {
      gameOver = true;
      setTimeout(() => alert(`${currentPlayer} wins!`), 10);
    } else if (checkDraw()) {
      gameOver = true;
      setTimeout(() => alert("It's a draw!"), 10);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  function checkWin() {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      );
    });
  }

  function checkDraw() {
    return [...cells].every((cell) => cell.textContent !== "");
  }

  function resetGame() {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    currentPlayer = "X";
    gameOver = false;

    cells.forEach((cell) => {
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
    });
  }
});
