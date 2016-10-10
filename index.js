console.log("hello, world!");
	
var fs = require("fs");

fs.readFile("./words.txt", function (err, data){
	if (err) {
		console.log(err);
		return;
	}
	console.log(data.toString());

	fs.writeFile("lorem.txt", data, function(err){ //this creates a new file - FS: file system
		if (err){
			console.log(err);
			return;
		}
		console.log("Dun!");
	});
});

console.log("Reading Werdz!"); //this logs first becuase it's not asynchronous

//console.log = write to standard out

//terminal also has something call standard in - typing into the terminal, so we can interface with node through this


//process is global available in .node:
process.stdin.on('readable', function(){
	var input = process.stdin.read();
	if (input !== null){
		console.log(input.toString().toUpperCase());
	}
});