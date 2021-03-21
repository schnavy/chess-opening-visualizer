const resetBtn = document.querySelector("#reset")
const startingPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const convertedStartingPos = startingPos.replaceAll("8", "        ").replaceAll("/", "")
const startArray = Array.from(convertedStartingPos)

updatePosition(startArray)

resetBtn.addEventListener("click", (e) => {
    resetToStartPos()
})



function handleButton(fen) {
    let arr = convertFEN(fen)
    if (arr == "Error") {
        alert("bitte das FENN Format benutzen")
        return
    }
    updatePosition(arr)
}

function updatePosition(array) {
    fields.forEach(elem => {
        elem.innerHTML = ""

    })
    for (const i in fields) {
        let piece = array[i];
        if (piece != " ") {
            if (piece == piece.toUpperCase()) {
                fields[i].innerHTML = "<div id=w" + piece.toLowerCase() + " class ='piece white'></div>"
            } else {

                fields[i].innerHTML = "<div id=b" + piece.toLowerCase() + " class ='piece'></div>"
            }
        }
    }

}

function resetToStartPos() {
    updatePosition(startArray)
    document.querySelector("form").reset();

}
// Image generator :  https://www.npmjs.com/package/chess-image-generator


function convertFEN(str) {
    if (str.length < 9) {
        return "Error"
    }
    const startArray = Array.from(str.replaceAll("8", "        ").replaceAll("7", "       ").replaceAll("6", "       ").replaceAll("5", "     ").replaceAll("4", "    ").replaceAll("3", "   ").replaceAll("2", "  ").replaceAll("1", " ").replaceAll("/", ""));
    return startArray
}