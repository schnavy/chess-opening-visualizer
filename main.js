const startingPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
const convertedStartingPos = startingPos.replaceAll("8", "        ").replaceAll("/", "")
const startArray = Array.from(convertedStartingPos)

console.log(startArray);





for (const i in fields) {
    let piece = startArray[i];
    if (piece != " ") {
        if (piece == piece.toUpperCase()) {
            fields[i].innerHTML = "<div class ='piece white'>" + piece + "</div>"
        } else {

            fields[i].innerHTML = "<div class ='piece'>" + piece + "</div>"
        }
    }
}
// Image generator :  https://www.npmjs.com/package/chess-image-generator