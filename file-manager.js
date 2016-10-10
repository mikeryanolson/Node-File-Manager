/* jshint esversion: 6 */ 

var fs = require('fs');

var useStdin = function() {
	var input = process.stdin.read();
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] == "cat") {
			//cat <filename>
			catFile(inputSplit[1]);
		} else if (inputSplit[0] == "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);
		} else if (inputSplit[0] == "delete") {
			deleteFile (inputSplit[1]);
		} else if (inputSplit[0] == "replace"){
			replace (inputSplit[1], inputSplit[2], inputSplit[3]);
		} else if (inputSplit[0] == "grep"){
			grep (inputSplit[1], inputSplit[2]);
		}
	}
};

//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}

//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}
//Delete a file
function deleteFile(fileName){
	fs.unlink(fileName, function(err){
		if (err){
			console.log ("Unable to delete file");
		} else {
			console.log("File successfully deleted");
		}
	});
}

function replace(fileName, oldWord, newWord) {
    fs.readFile(fileName, function(err, data) {
        if (err) { return console.log(err); }

        data = data.toString();

        data = data.split(oldWord).join(newWord); //hackiest way to do this :)

        fs.writeFile(fileName, data, function(err) {
            if (err) { return console.log(err); }

            console.log("Replaced " + oldWord + " with " + newWord + ".");
        });
    });
}

function grep(fileName, wordToFind) {
	fs.readFile(fileName, function(err, data) {
        if (err) { return console.log(err); }

        data = data.toString().split("\n");
        var total = [];

        for (var sentence of data) {
        var word = sentence.split(" ");
        	if(word.includes(wordToFind)){
        		total.push(sentence);
        	}
   		} 
   		total = total.join("\n");
   		console.log(total);
    });
}




//TO REPLACE WORDS:
//type into terminal: replace 'hello' 'goodbye' hello.txt

process.stdin.on('readable', useStdin);

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

			use "\n" to split on new lines

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

