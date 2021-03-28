class Board {
    constructor(arr = startArray) {
        this.arr = arr;
        this.counter = 0;
        this.fields = [];
        this.letters = ["A", "B", "C", "D", "E", "F", "G", "H"]


        this.boardwrapper = generateDiv(container, "boardwrapper", "board" + boardscounter);
        this.poshelper = generateDiv(this.boardwrapper, "poshelper");
        this.boardbasis = generateDiv(this.poshelper, "b-basis");
        this.board = generateDiv(this.boardbasis, "board");
        this.labeling = generateDiv(this.poshelper, "labeling");
        this.numberwrapper = generateDiv(this.labeling, "numberwrapper");
        this.letterwrapper = generateDiv(this.labeling, "letterwrapper");

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.fields[this.counter] = document.createElement("div");
                this.fields[this.counter].classList.add("field")
                this.fields[this.counter].id = "row" + i + "col" + j;
                if ((i + j) % 2 == 0) {
                    this.fields[this.counter].classList.add("odd")
                }
                this.board.appendChild(this.fields[this.counter])
                this.counter += 1

            }
        }
        for (let i = 0; i < 8; i++) {
            let l;
            l = document.createElement("div");
            l.classList.add("letter")
            l.textContent = this.letters[i];
            this.letterwrapper.appendChild(l)
        }
        for (let i = 0; i < 8; i++) {
            let n;
            n = document.createElement("div");
            n.classList.add("number")
            n.textContent = 8 - i;
            this.numberwrapper.appendChild(n)
        }
        this.updatePosition(arr)

        boardscounter++


    }

    updatePosition(array) {
        this.fields.forEach(elem => {
            elem.innerHTML = ""
        })
        for (const i in this.fields) {
            let piece = array[i];
            if (piece != " ") {
                if (piece == piece.toUpperCase()) {
                    this.fields[i].innerHTML = "<div id=w" + piece.toLowerCase() + " class ='piece white' draggable='true'></div>"
                } else {

                    this.fields[i].innerHTML = "<div id=b" + piece.toLowerCase() + " class ='piece' draggable='true'></div>"
                }
            }
        }

    }
    resetToStartPos() {
        this.updatePosition(startArray)
    }
}
