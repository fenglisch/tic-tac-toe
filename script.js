/* eslint-disable no-nested-ternary */
// Enter name of both players (form)

// Submit to start the game

// Create player objects with name properties

// Create 3 x 3 game board

// Click event listeners for each field

// Show who's turn it is

const container = document.querySelector(".container");
const grid = document.createElement("div");
grid.classList.add("grid");
const arrayFields = [];

for (let i = 1; i <= 9; i++) {
  const field = document.createElement("div");
  field.classList.add("field");
  field.setAttribute("data-x", i % 3 === 0 ? "x3" : i % 3 === 2 ? "x2" : "x1");
  field.setAttribute("data-y", i < 4 ? "y1" : i < 7 ? "y2" : "y3");
  grid.appendChild(field);
  arrayFields.push(field);
}
container.appendChild(grid);

function checkForWin(player) {
  // eslint-disable-next-line one-var
  let x1, x2, x3, y1, y2, y3;
  // eslint-disable-next-line no-multi-assign
  x1 = x2 = x3 = y1 = y2 = y3 = 0;
  player.clickedFields.forEach((coords) => {
    if (coords.includes("x1")) ++x1;
    else if (coords.includes("x2")) ++x2;
    else ++x3;
    if (coords.includes("y1")) ++y1;
    else if (coords.includes("y2")) ++y2;
    else ++y3;
    if (x1 === 3 || x2 === 3 || x3 === 3) {
      alert(`${player.name} won due to a horizontal row!`);
    }
    if (y1 === 3 || y2 === 3 || y3 === 3) {
      alert(`${player.name} won due to a vertical row!`);
    }
    if (
      (player.clickedFields.includes("x1y1") &&
        player.clickedFields.includes("x2y2") &&
        player.clickedFields.includes("x3y3")) ||
      (player.clickedFields.includes("x1y3") &&
        player.clickedFields.includes("x2y2") &&
        player.clickedFields.includes("x3y1"))
    ) {
      const modal = document.querySelector(".modal-background");
      modal.classList.remove("hidden");
      const resultInfo = document.querySelector(".result");
      resultInfo.textContent = `The winner is ${player.name}`;
      arrayFields.forEach((field) => {
        field.removeEventListener("click", clickField);
      });
      const closeModal = document.querySelector(".close-modal");
      closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    }
    //     if (
    //   x1 === 3 ||
    //   x2 === 3 ||
    //   x3 === 3 ||
    //   y1 === 3 ||
    //   y2 === 3 ||
    //   y3 === 3 ||
    //   (player.clickedFields.includes("x1y1") &&
    //     player.clickedFields.includes("x2y2") &&
    //     player.clickedFields.includes("x3y3")) ||
    //   (player.clickedFields.includes("x1y3") &&
    //     player.clickedFields.includes("x2y2") &&
    //     player.clickedFields.includes("x3y1"))
    // ) {
    //   alert(`${player.name} won!`);
    // }
  });
}

function clickField(e) {
  const coord =
    e.target.getAttribute("data-x") + e.target.getAttribute("data-y");
  if (playerOne.myTurn) {
    playerOne.clickedFields.push(coord);
    e.target.innerHTML = playerOne.symbol;
    playerOne.myTurn = false;
    console.table(playerOne.clickedFields);
    checkForWin(playerOne);
  } else {
    playerTwo.clickedFields.push(coord);
    e.target.textContent = playerTwo.symbol;
    playerOne.myTurn = true;
    console.table(playerTwo.clickedFields);
    checkForWin(playerTwo);
  }
  e.target.removeEventListener("click", clickField);
}

arrayFields.forEach((field) => {
  field.addEventListener("click", clickField);
});

let playerOne = {
  name: "Player One",
  symbol: "×",
  myTurn: true,
  clickedFields: [],
};

let playerTwo = {
  name: "Player Two",
  symbol: "⚬",
  clickedFields: [],
};
