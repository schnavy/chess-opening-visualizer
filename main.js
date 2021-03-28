let boardscounter = 0;
const header = document.querySelector(".header")
const mainwrapper = document.querySelector("#mainwrapper")
const container = document.querySelector("#container")
const infoWrapper = document.querySelector("#info-wrapper")
const resetBtn = document.querySelector("#reset");
const newBoardBtn = document.querySelector(".newboardbtn")
const removeBoardBtn = document.querySelector(".removeboardbtn")
const crazybtn = document.querySelector(".crazybtn")

const startingPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const convertedStartingPos = startingPos.replaceAll("8", "        ").replaceAll("/", "")
const startArray = Array.from(convertedStartingPos)
let boards = []

let data;

loadJSON((data)=>{
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



function createDropdown(data) {
    let form = document.createElement("form")
    form.setAttribute("action", "javascript:handleDropdown(openingsDropdown.value)")
    form.id = "dropdownform";
    infoWrapper.appendChild(form)
    let dropdown = document.createElement("select")
    dropdown.id = "openingsDropdown"
    form.appendChild(dropdown)
    for (const i in data) {
        let elem = data[i]

        let temp = document.createElement("option")
        temp.setAttribute("value",i)

        temp.innerHTML = elem.name
        dropdown.appendChild(temp)
    }

    // data.forEach((elem)=>{
    //     let temp = document.createElement("option")
    //     temp.setAttribute("value", elem.name)
    //     temp.innerHTML = elem.name
    //     dropdown.appendChild(temp)
    // })

    let openingSubmit = document.createElement("input")
    openingSubmit.setAttribute("type", "submit")
    openingSubmit.setAttribute("value", "submit")
    form.appendChild(openingSubmit)

}

function handleDropdown(x){
    let curr = data[x];

    container.innerHTML = "";
    boards = []
    for (const i in curr.fen) {
        if (Object.hasOwnProperty.call(curr.fen, i)) {
            const arr = convertFEN(curr.fen[i])
            boards[i] = new Board(arr)
            boards[i].updatePosition(arr)
            console.log(arr);
        }
    }

}



// Image generator :  https://www.npmjs.com/package/chess-image-generator


function convertFEN(str) {
    if (str.length < 9) {
        return "Error"
    }
    const startArray = Array.from(str.replaceAll(" ", "").replaceAll("8", "        ").replaceAll("7", "       ").replaceAll("6", "       ").replaceAll("5", "     ").replaceAll("4", "    ").replaceAll("3", "   ").replaceAll("2", "  ").replaceAll("1", " ").replaceAll("/", ""));
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
function loadJSON(callback) {
    var openingsFile = new XMLHttpRequest();
    openingsFile.overrideMimeType("application/json");
    openingsFile.open('GET', 'openings.json', true);
    openingsFile.onreadystatechange = function() {
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