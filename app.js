let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newtBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;



const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game is drawn!`;
    msgContainer.classList.remove("hidden");
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! "${winner}" is the winner!`;
    msgContainer.classList.remove("hidden");
    disableBoxes();
};
const checkWinner = () => {
    for (let patterns of winpatterns) {
        let postValue1 = boxes[patterns[0]].innerText;
        let postValue2 = boxes[patterns[1]].innerText;
        let postValue3 = boxes[patterns[2]].innerText;

        if (postValue1 != "" && postValue2 != "" && postValue3 != "") {
            if (postValue1 === postValue2 && postValue2 === postValue3) {
                showWinner(postValue1);
                return true;
            }
        }
    }
};


const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hidden");
};

newtBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);