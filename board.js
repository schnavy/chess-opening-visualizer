const board = document.querySelector("#board")
const numberdiv = document.querySelector("#labeling .numberwrapper")
const letterdiv = document.querySelector("#labeling .letterwrapper")
const fields = [];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
const label = {
    letters: [],
    numbers: []
}
counter = 0;

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        fields[counter] = document.createElement("div");
        fields[counter].classList.add("field")
        fields[counter].id = "row" + i + "col" + j;
        if ((i + j) % 2 == 0) {
            fields[counter].classList.add("odd")
        }
        board.appendChild(fields[counter])
        console.log(counter);
        counter += 1

    }
}
for (let i = 0; i < 8; i++) {
    label.letters[i] = document.createElement("div");
    label.letters[i].classList.add("letter")
    label.letters[i].textContent = letters[i];
    letterdiv.appendChild(label.letters[i])
}
for (let i = 0; i < 8; i++) {
    label.numbers[i] = document.createElement("div");
    label.numbers[i].classList.add("number")
    label.numbers[i].textContent = 8 - i;
    numberdiv.appendChild(label.numbers[i])
}