let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Track Player turns (true = O's turn, false = X's turn)
let count = 0; // Track moves for detecting a draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Handle each box click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Ensure the box is empty before proceeding
        if (box.innerText === "") {
            if (turnO) {
                // Player O's turn
                box.innerText = "O";
                box.style.color = "blue";
                turnO = false;
            } else {
                // Player X's turn
                box.innerText = "X";
                box.style.color = "red";
                turnO = true;
            }
            box.disabled = true; // Disable the clicked box
            count++;

            // Check for winner after each move
            let isWinner = checkWinner();

            // If no winner and all boxes are filled, it's a draw
            if (count === 9 && !isWinner) {
                gameDraw();
            }
        }
    });
});

// Display draw message and disable further moves
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Disable all boxes when the game ends (win/draw)
const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

// Enable all boxes for a new game
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = ""; // Clear the box content
    });
};

// Display the winner and disable further moves
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check if there's a winner based on win patterns
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // Check if all three positions in the pattern are filled and match
        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true; // Winner found, return true
        }
    }
    return false; // No winner found
};

// Add event listeners to reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
