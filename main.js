let boardscounter = 0;
const mainwrapper = document.querySelector("#mainwrapper")
const container = document.querySelector("#container")
const resetBtn = document.querySelector("#reset");
const newBoardBtn = document.querySelector(".newboardbtn")
const removeBoardBtn = document.querySelector(".removeboardbtn")
const crazybtn = document.querySelector(".crazybtn")

const startingPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const convertedStartingPos = startingPos.replaceAll("8", "        ").replaceAll("/", "")
const startArray = Array.from(convertedStartingPos)
let boards = []

resetBtn.addEventListener("click", (e) => {
    resetBoards()

    boards.forEach((e) => {
        e.resetToStartPos()
    })
})

boards[0] = new Board()
boards[0].resetToStartPos()

function handleButton(fen) {
    resetBoards()
    let arr = convertFEN(fen)
    if (arr == "Error") {
        alert("bitte das FENN Format benutzen")
        return
    }
    boards[0].updatePosition(arr)
}

// Image generator :  https://www.npmjs.com/package/chess-image-generator


function convertFEN(str) {
    if (str.length < 9) {
        return "Error"
    }
    const startArray = Array.from(str.replaceAll("8", "        ").replaceAll("7", "       ").replaceAll("6", "       ").replaceAll("5", "     ").replaceAll("4", "    ").replaceAll("3", "   ").replaceAll("2", "  ").replaceAll("1", " ").replaceAll("/", ""));
    return startArray
}

// newBoardBtn.addEventListener("click", (e) => {
//     boards[boards.length] = new Board()
//     boards[boards.length - 1].resetToStartPos()

// })

// removeBoardBtn.addEventListener("click", (e) => {
//     if (boards.length > 1) {
//         boards[boards.length - 1].boardwrapper.parentNode.removeChild(boards[boards.length - 1].boardwrapper)
//         boards.pop();
//     }
// })
crazybtn.addEventListener("click", (e) => {
    mainwrapper.classList.toggle("crazy");
    if (mainwrapper.classList.contains("crazy")) {
        crazybtn.textContent = "Normal Mode"
    } else {
        crazybtn.textContent = "Crazy Mode"
    }
})


function map(value, x1, y1, x2, y2) {
    return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}

function generateDiv(parent, klasse, id) {
    let temp = document.createElement("div");
    if (klasse) temp.classList.add(klasse);
    if (id) temp.id = id;
    parent.appendChild(temp)
    return temp;
}

function removeBoard() {
    if (boards.length > 1) {
        boards[boards.length - 1].boardwrapper.parentNode.removeChild(boards[boards.length - 1].boardwrapper)
        boards.pop();
    }
}

function resetBoards() {
    if (boards.length == 1) {
        return
    }
    removeBoard()
    resetBoards()

}


boards.forEach((elem) => {
    let element = elem.boardwrapper;
    console.log(elem.boardwrapper);
    element.addEventListener("mouseover", (e) => {
        if (window.innerWidth > 768 && mainwrapper.classList.contains("crazy")) {
            let mx = -map(e.x, 0, window.innerWidth, -100, 100);
            let my = -map(e.y, 0, window.innerHeight, -100, 100);
            element.setAttribute('style', 'transform:translate(' + mx + 'px,' + my + 'px)');
        } else {
            element.setAttribute('style', 'transform:translate(' + 0 + 'px,' + 0 + 'px)');
        }

    })



})