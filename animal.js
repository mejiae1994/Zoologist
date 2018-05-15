var easyImages = ["Lion.jpg", "Bear.jpg", "Giraffe.jpg", "Owl.jpg", "Duck.jpg", "Elephant.jpg", 
"Gecko.jpg", "Goat.jpg", "Rhino.jpg", "Tiger.jpg", "Turtle.jpg", "Penguin.jpg", "Parrot.jpg", 
"Hedgehog.jpg", "Crocodile.jpg"]
var medImages = ["Warthog.jpg", "Hawk.jpg", "Eagle.jpg", "Python.jpg", "Tarantula.jpg", "Racoon.jpg", 
"Wolf.jpg", "Toucan.jpg", "Mandrill.jpg", "Belugawhale.jpg", "Fox.jpg", "Caiman.jpg", "Snowyegret.jpg", 
"Okapi.jpg", "Seal.jpg"]
var loadedImg = [];

var canvas = document.getElementById("canvasImg");
var context = canvas.getContext("2d");
var current  = 0;
var difficulties = document.querySelectorAll('.difficulty');

var score = document.querySelector("#message");
var over = document.querySelector("#gameover");
var gameFinished = false;
var scoreCount = 0;

var arrayUsed = easyImages;
var answers = getAnimals(arrayUsed);

for(var i = 0; i < difficulties.length;i++) {
	arrayUsed = []
	difficulties[i].addEventListener("click", function() {
		for(var j = 0; j < difficulties.length;j++) {
			difficulties[j].classList.remove("selected");
		}
		this.classList.add("selected");
		
		switch(this.textContent) {
		case "Easy":
			arrayUsed = easyImages;
			answers = getAnimals(arrayUsed);
			scoreCount = 0;
			break;
		case "Medium":
			arrayUsed = medImages
			answers = getAnimals(arrayUsed);
			scoreCount = 0
			break;
		default:
			arrayUsed = easyImages;
			answers = getAnimals(arrayUsed);cc
			scoreCount = 0;
	}

		loadImages(arrayUsed);
		current = 0;
		
		if(loadedImg.length != 0) {
			console.log("loading images")
    		setTimeout(function () {
        		displayImage(); 
    		}, 200);
		}
	});
}

$("#answer").keypress(function(e) {
	if(e.which === 13) {
  		checkAnswer(this.value.toUpperCase());
  		this.value = "";	
	}
});

function checkAnswer(answer) {
	var correctAnswer = answers[current];
	current++;
	
	if(answer === correctAnswer.toUpperCase()) {
		console.log("correct answer");
		displayImage();
		over.textContent = "correct";
		scoreCount++;
		score.textContent = ""
	} else {
		console.log("wrong answer");
		displayImage();
		over.textContent = "wrong";
		score.textContent =  ""
	}
	gameOver();
}

function gameOver() {
	if(gameFinished) {
		score.textContent = "You guessed: " + scoreCount + "/" + arrayUsed.length;
		over.textContent = "GameOver: Start Again"
		scoreCount = 0;
	}
	gameFinished = false;
}

function displayImage() {
	if(current === loadedImg.length) {
		current = 0;
		gameFinished = true;
	}
  	context.drawImage(loadedImg[current], 0, 0, canvas.width, canvas.height);
}

function loadImages(inputImages) {
	loadedImg = []
  	for (var i=0; i<inputImages.length; i++) {
    	var image = new Image();
    	image.src = "imgs/"+ inputImages[i];
    	loadedImg.push(image);
  	}
}

function getAnimals(animals) {
	var animalsUsed = []
	for(var i = 0; i < animals.length;i++) {
		animalsUsed.push(animals[i].split(".")[0]);
	} 
	return animalsUsed;
}

loadImages(easyImages);
window.onload = displayImage;
