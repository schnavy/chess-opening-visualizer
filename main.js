let boardscounter = 0;
const header = document.querySelector(".header")
const mainwrapper = document.querySelector("#mainwrapper")
const container = document.querySelector("#container")
const infoWrapper = document.querySelector("#info-wrapper")
const resetBtn = document.querySelector("#reset");
const newBoardBtn = document.querySelector(".newboardbtn")
const removeBoardBtn = document.querySelector(".removeboardbtn")
const crazybtn = document.querySelector(".crazybtn")
const multibtn = document.querySelector(".multibtn")
const infoname = document.querySelector("#OpeningName")
const infotype = document.querySelector("#OpeningType")
const infopgn = document.querySelector("#OpeningPGN")

const startingPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const convertedStartingPos = startingPos.replaceAll("8", "        ").replaceAll("/", "")
const startArray = Array.from(convertedStartingPos)
let boards = []
let currentOpening;
let currentKey;

let viewIsmultiple = false;
let moveCounter = 0;
let data;

loadJSON((data) => {
    boards[0] = new Board()
    createDropdown(data)
})



//Buttons

resetBtn.addEventListener("click", (e) => {
    resetBoards()

    boards.forEach((e) => {
        e.resetToStartPos()
    })
})

crazybtn.addEventListener("click", (e) => {
    mainwrapper.classList.toggle("crazy");
    if (mainwrapper.classList.contains("crazy")) {
        crazybtn.textContent = "Normal Mode"
    } else {
        crazybtn.textContent = "Crazy Mode"
    }
})

multibtn.addEventListener("click", (e) => {
    viewIsmultiple = !viewIsmultiple;
    if (currentKey) {
        handleDropdown(currentKey)
    }
    if (viewIsmultiple) {
        multibtn.textContent = "Single Board"
    } else {
        multibtn.textContent = "Multiple Boards"
    }

})


function createDropdown(data) {
    let form = document.createElement("form")
    form.setAttribute("action", "javascript:handleDropdown(openingsDropdown.value)")
    form.id = "dropdownform";
    infoWrapper.appendChild(form)
    let dropdown = document.createElement("select")
    dropdown.id = "openingsDropdown"
    form.appendChild(dropdown)
    let nothingSelected = document.createElement("option")
    nothingSelected.innerHTML = "Eröffnung ausgewählen"
    dropdown.appendChild(nothingSelected)
    for (const i in data) {
        let elem = data[i]

        let temp = document.createElement("option")
        temp.setAttribute("value", i)

        temp.innerHTML = elem.name
        dropdown.appendChild(temp)
    }

    let openingSubmit = document.createElement("input")
    openingSubmit.setAttribute("type", "submit")
    openingSubmit.setAttribute("value", "submit")
    form.appendChild(openingSubmit)

}

function updateInfos(currentOpening) {
    if (typeof currentOpening != "undefined") {
        infoname.textContent = currentOpening.name
        infotype.textContent = "Position: " + currentOpening.position
        infopgn.textContent = "PGN Notation: " + currentOpening.pgn
    } else {
        infoname.textContent = ""
        infotype.textContent = ""
        infopgn.textContent = ""
    }
}

function handleDropdown(x) {
    console.log(x);
    resetBoards()
    if (x != "Eröffnung ausgewählen") {

        currentKey = x;
        currentOpening = data[x];
        moveCounter = currentOpening.fen.length - 1;
        if (viewIsmultiple) {
            
            for (const i in currentOpening.fen) {
                if (Object.hasOwnProperty.call(currentOpening.fen, i)) {
                    const arr = convertFEN(currentOpening.fen[i])
                    boards[i] = new Board(arr)
                    boards[i].updatePosition(arr)
                    console.log(arr);
                }
            }
        } else {
            boards[0].updatePosition(convertFEN(currentOpening.fen[1]))
        }
    }
    updateInfos(currentOpening)
    
}

document.addEventListener("keydown", (e) => {
    if (!viewIsmultiple && typeof (currentKey) != "undefined") {

        if (e.key == "ArrowRight" && moveCounter < currentOpening.fen.length - 1) {
            moveCounter++
        } else if (e.key == "ArrowLeft" && moveCounter > 0) {
            moveCounter--
        } else if (e.key == "ArrowUp") {
            moveCounter = 0
        } else if (e.key == "ArrowDown") {
            moveCounter = currentOpening.fen.length - 1
        }
        boards[0].updatePosition(convertFEN(currentOpening.fen[moveCounter]))
    }

})


// Image generator :  https://www.npmjs.com/package/chess-image-generator


function convertFEN(str) {
    if (str.length < 9) {
        return "Error"
    }
    const startArray = Array.from(str.replaceAll(" ", "").replaceAll("8", "        ").replaceAll("7", "       ").replaceAll("6", "       ").replaceAll("5", "     ").replaceAll("4", "    ").replaceAll("3", "   ").replaceAll("2", "  ").replaceAll("1", " ").replaceAll("/", ""));
    return startArray
}


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


function resetBoards() {
    container.innerHTML = "";
    boards = []
    boards[0] = new Board(startArray)
    currentOpening = undefined
    currentKey = undefined
}


function loadJSON(callback) {
    var openingsFile = new XMLHttpRequest();
    openingsFile.overrideMimeType("application/json");
    openingsFile.open('GET', 'openings.json', true);
    openingsFile.onreadystatechange = function () {
        if (openingsFile.readyState == 4 && openingsFile.status == "200") {
            data = JSON.parse(openingsFile.responseText)

            callback(data)
        }
    }
    openingsFile.send(null);

}

function handleFENButton(fen) {
    resetBoards()
    let arr = convertFEN(fen)
    if (arr == "Error") {
        alert("bitte das FENN Format benutzen")
        return
    }
    boards[0].updatePosition(arr)
}