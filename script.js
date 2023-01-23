function toggleHidden(element) {
  element.classList.toggle("hidden");
}
const modal = document.querySelector(".modal-background");

const btnStart = document.querySelector(".start-game");

btnStart.addEventListener("click", (e) => {
  e.preventDefault();
  const Player = (name, symbol) => ({
    name,
    symbol,
    clickedFields: [],
  });
  const playerOne = Player(
    document.querySelector("#player1-name").value || "Player One",
    "×"
  );
  const playerTwo = Player(
    document.querySelector("#player2-name").value || "Player Two",
    "⚬"
  );
  playerOne.isActive = true;
  toggleHidden(document.querySelector(".start-screen"));
  function createGrid() {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.classList.remove("hidden");
    const grid = document.querySelector(".grid");
    for (let i = 1; i <= 9; i++) {
      const field = document.createElement("div");
      field.classList.add("field");
      field.setAttribute(
        "data-x",
        // eslint-disable-next-line no-nested-ternary
        i % 3 === 0 ? "x3" : i % 3 === 2 ? "x2" : "x1"
      );
      // eslint-disable-next-line no-nested-ternary
      field.setAttribute("data-y", i < 4 ? "y1" : i < 7 ? "y2" : "y3");
      grid.appendChild(field);
      field.addEventListener("click", clickField);
    }
  }

  createGrid();
  function clickField(e) {
    const coord =
      e.target.getAttribute("data-x") + e.target.getAttribute("data-y");
    if (playerOne.isActive) {
      playerOne.clickedFields.push(coord);
      e.target.innerHTML = playerOne.symbol;
      playerOne.isActive = false;
      checkForWin(playerOne);
    } else {
      playerTwo.clickedFields.push(coord);
      e.target.textContent = playerTwo.symbol;
      playerOne.isActive = true;
      checkForWin(playerTwo);
    }
    e.target.removeEventListener("click", clickField);

    function checkForWin(activePlayer) {
      // eslint-disable-next-line one-var
      let x1, x2, x3, y1, y2, y3;
      // eslint-disable-next-line no-multi-assign
      x1 = x2 = x3 = y1 = y2 = y3 = 0;
      activePlayer.clickedFields.forEach((coords) => {
        if (coords.includes("x1")) {
          ++x1;
        } else if (coords.includes("x2")) ++x2;
        else ++x3;
        if (coords.includes("y1")) ++y1;
        else if (coords.includes("y2")) ++y2;
        else ++y3;
        if (
          x1 === 3 ||
          x2 === 3 ||
          x3 === 3 ||
          y1 === 3 ||
          y2 === 3 ||
          y3 === 3 ||
          (activePlayer.clickedFields.includes("x1y1") &&
            activePlayer.clickedFields.includes("x2y2") &&
            activePlayer.clickedFields.includes("x3y3")) ||
          (activePlayer.clickedFields.includes("x1y3") &&
            activePlayer.clickedFields.includes("x2y2") &&
            activePlayer.clickedFields.includes("x3y1"))
        ) {
          function startNewRound() {
            playerOne.clickedFields = [];
            playerTwo.clickedFields = [];
            document.querySelectorAll(".field").forEach((field) => {
              field.textContent = "";
              field.addEventListener("click", clickField);
            });
          }
          document.querySelectorAll(".field").forEach((div) => {
            div.removeEventListener("click", clickField);
          });
          modal.classList.remove("hidden");
          const resultInfo = document.querySelector(".result");
          resultInfo.textContent = `The winner is ${activePlayer.name}`;
          const btnCloseModal = document.querySelector(".close-modal");
          btnCloseModal.addEventListener("click", () => {
            modal.classList.add("hidden");
            const btnPlayAgainContainer = document.querySelector(
              ".play-again-container"
            );
            btnPlayAgainContainer.classList.remove("hidden");
            btnPlayAgainContainer.addEventListener("click", () => {
              btnPlayAgainContainer.classList.add("hidden");
              startNewRound();
            });
          });

          const btnPlayAgainModal = document.querySelector(".play-again-modal");
          btnPlayAgainModal.addEventListener("click", () => {
            modal.classList.add("hidden");
            startNewRound();
          });
        }
      });
    }
  }
});
