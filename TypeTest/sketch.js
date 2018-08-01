function setup() {
	// put setup code here
	var cnv = createCanvas(700, 400);
	str = "";
	input = "";
	currWords = []
	totalWords = 0;
	correctWords = 0;
	for (i = 0; i < 5; i++) {
		word = random(wordList);
		str += word;
		currWords.push(word);
		str += (" ");
	}
	// need to keep track of current word & current letter
	currWord = currWords[0];
	currLetter = currWord.charAt(0);
	letterInd = 0;
	correct = true;
	// start button
	buttonSetup();
	// stats
	wordStatStr = "Correct words: ";
	accuracyStr = "Accuracy: ";
	wpmStr = "Words per minute: ";
}

function draw() {
	// put drawing code here
	background(color(210, 210, 190));
	// text box
	fill(color(255, 255, 255));
	textBox = rect(width/2 - width/4, height/3 + 10, 350, 65);
	// text
	fill(color(0, 0, 0));
	textSize(40);
	textAlign(LEFT, CENTER);
	strokeWeight(2);
	textStyle(BOLD);
	goalText = text(str, width/2 - width/4, height/2 - height/4 + 8);
	textStyle(NORMAL);
	drawInput();
	// stats
	textAlign(CENTER, CENTER);
	textSize(30);
	fill(0, 0, 100);
	wordStat = text(wordStatStr, width/2, height/2 + 80);
	accuracyStat = text(accuracyStr, width/2, height/2 + 120);
	wpmStat = text(wpmStr, width/2, height/2 + 40);
	// title
	textSize(40);
	// textColor(color(255, 255, 255));
	textAlign(CENTER);
	fill(0, 0, 0);
	text("QuikType", width/2, 40);
	line(5, 72, width - 5, 72);
	// name
	textSize(15);
	text("By Nick Worthington", width/2, height - 20);
	// outline
	noFill();
	rect(5, 5, width - 10, height - 10);
}

function buttonSetup() {
	startButton = createButton('Start');
	startButton.position(550, height/3 + 20);
	startButton.size(80, 40);
	startButton.mousePressed(timerSetup);
}

function timerSetup() {
	seconds = 60;
	timer = createElement('h1', seconds);
	timer.position(115, height/3 + 5);
	setInterval(timeInc, 1000);
}

function timeInc() {
	if (seconds == 0) {
		timer.position(25, height/3 + 5);
		timer.html('Times up!');
		// display stats now
		wordStatStr += correctWords;
		accuracyStr += ((correctWords / totalWords) * 100).toFixed(2) + " %";
		wpmStr += totalWords;
		seconds--;
	} else if (seconds > 0) {
		seconds--;
		timer.html(seconds);
	}
}

function keyTyped() {
	if (seconds == 0) {
		return;
	}
	if (key === " ") {
		input = "";
		// update curr word list
		currWords = currWords.slice(1, currWords.length);
		currWords.push(random(wordList));
		updateStr();

		if (correct) {
			correctWords++;
		}
		totalWords++;
		correct = true;
		currWord = currWords[0];
		currLetter = currWord.charAt(0);
		letterInd = 0;
	} else {
		input += key;
		if (key != currLetter) {
			correct = false;
		}
		currLetter = currWord.charAt(++letterInd);
	}
}

function keyPressed() {
	if (keyCode === BACKSPACE) {
		input = input.substring(0, input.length - 1);
		correct = true;
		letterInd -= 1;
		// is the word correct now? check right to left for efficiency
		for (var i = input.length - 1; i >= 0; i--) {
			console.log(correct);
			if (input.charAt(i) != currWord.charAt(i)) {
				correct = false;
				console.log(correct);
				return;
			}
		}
	}
}

function updateStr() {
	str = "";
	for (i = 0; i < currWords.length; i++) {
		str += currWords[i];
		str += " ";
	}
}

function drawInput() {
	fill(color(0, 0, 0));
	textAlign(LEFT, TOP);
	text(input, width/2 - width/4 + 15, 135 + 18, 300, 65);
}

// 200 most common (?) words
wordList = ["the", "be", "of", "and", "a", "to", "in", "he", "have", "it",
"that", "for", "they", "I", "with", "as", "not", "on", "she", "at",
"by", "this", "we", "you", "do", "but", "from", "or", "which", "one",
"would", "all", "will", "there", "say", "who", "make", "when", "can", "more",
"if", "no", "man", "out", "other", "so", "what", "time", "up", "go",
"about", "than", "into", "could", "state", "only", "new", "year", "some", "take",
"come", "these", "know", "see", "use", "get", "like", "then", "first", "any",
"work", "now", "may", "such", "give", "over", "think", "most", "even", "find",
"day", "also", "after", "way", "many", "must", "look", "before", "great", "back",
"through", "long", "where", "much", "should", "well", "people", "down", "own", "just",
"becuase", "good", "each", "those", "feel", "seem", "how", "high", "too", "place",
"little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write",
"become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop",
"under", "last", "right", "move", "thing", "general", "school", "never", "same", "another",
"begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point",
"from", "off", "child", "few", "small", "since", "against", "ask", "late", "home",
"interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without",
"again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem",
"however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face",
"fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"];
