var inColumn = 1;
var inRow = 1;
var naam = words[Math.floor(Math.random() * words.length)];
var guess = [];
var correctLetters = [naam.charAt(0), " ", " ", " ", " "];
var timeLeft = 30;


document.getElementById("button_1").style.display = "none";
document.getElementById("tijd").style.display = "none";

button_2.onclick = function(){
	document.getElementById("button_2").style.display = "none";
	document.getElementById("tijd").style.display = "block";
	create();
	timer();
	addCorrectLetter();
}

function timer(){
	var countdownTimer = setInterval(function(){
		timeLeft--;
		document.getElementById("countdown").textContent = timeLeft;
		if (timeLeft < 0){
			alert("Je tijd is op! het woord was " + naam);
			location.reload();
		}
	},1000);
}

function create(){
	//Maakt de rijen aan
	for(i = 1; i < 6; i++){
		var Row = document.createElement("div");
		Row.id = "row_" + i;
		Row.setAttribute("class", "row");

	//Maakt de kolommen aan
		for(j = 1; j < 6; j++){
			var Column = document.createElement("div");
			Row.appendChild(Column);
			Column.id = "column_" + i + "." + j;
			Column.setAttribute("class", "column");

			var paragraph = document.createElement("p");
			paragraph.style.position = "absolute";
			paragraph.style.margin = "0";
			paragraph.style.lineHeight = "85px";
			paragraph.style.textAlign = "center";
			paragraph.style.width = "98px";
			Column.appendChild(paragraph);
		}
		document.getElementById("gamecontainer").appendChild(Row);
		//Voegt de eerste letter van het woord toe aan de kolom
		key();
	}
}

function key() {
	//Zorgt ervoor dat je het toetsenbord kan gebruiken en hierdoor een later laat toevoegen aan de DIV
	document.onkeypress = function(event){
		var key_press = String.fromCharCode(event.keyCode);
		if (key_press.match(/[a-z]/i)){
			document.getElementById("column_" + inRow + "." + inColumn).firstChild.style.opacity = "1";
			document.getElementById("column_" + inRow + "." + inColumn++).firstChild.innerHTML = key_press;
			guess.push(key_press);
			console.log(guess.length);
			console.log(guess);
			Next();
		}else{
			alert("Dit is geen letter!");
		}
	}
}

function check() {
	//Checkt ofdat de letter van het woord gelijk is aan het de letter van het geraden woord, als dit zo is maakt het de achtergrond groen
	var answer = naam.split("");
	console.log(answer);
	for(var i = 0; i < answer.length; i++){
		if (guess[i] == answer[i]){
			correctLetters[i] = answer[i];
			document.getElementById("column_" + inRow + "." + (i + 1)).style.background = "url('img/emerald.png')";
			document.getElementById("column_" + inRow + "." + (i + 1)).style.backgroundSize = "cover";
			guess[i] = " ";
			answer[i] = "*";
		}
	}

	if(checkAllValues(answer) == true){
        setTimeout(function(){
            alert("goed gedaan!");
        	window.location.reload();
    }, 500);
    }


	//Checkt ofdat de letter die je hebt ingevoerd ergens in het woord staat, als dit zo is dan maakt hij de achtergrond geel
	for(var i = 0; i < answer.length; i++){
		for(var j = 0; j < answer.length; j++){
			if (guess[i] == answer[j]){
				document.getElementById("column_" + inRow + "." + (i + 1)).style.background = "url('img/gold.jpeg')";
				document.getElementById("column_" + inRow + "." + (i + 1)).style.backgroundSize = "cover";
				guess[i] = " ";
				answer[j] = "*";
			}
		}
	}
}

//Zorgt dat hij naar de volgende rij kan gaan
function Next(){
	if (inColumn > 5){
		check();
		setTimeout(function(){
			inColumn = 1;
			inRow++;
			if(inRow > 5){
				alert("HEY JAMMER MAN, MAAR JE HEBT HET WEL GOED GEDAAN HET WOORD WAS " + naam + " probeer het anders nog eens ;)");
				location.reload();
			}
			addCorrectLetter();
			guess.splice(0, guess.length);}, 1000);
	}
}

button_1.onclick = function(){
	location.reload();
}

function checkAllValues(myArray){
    for (var i = 0; i < myArray.length; i++){
        if (!(myArray[i].includes("*"))){
            return false;
        }
        if (i == myArray.length-1){
            if (myArray[i] != "*"){
                return false;
            }
            return true;
        }
    }
}

function addCorrectLetter() {
	for(i = 1; i < 6; i++){
		document.getElementById("column_" + inRow + "." + i).firstChild.innerHTML = correctLetters[i-1];
		document.getElementById("column_" + inRow + "." + i).firstChild.style.opacity = "0.5";
	}
}

console.log(naam);
console.log(guess);
