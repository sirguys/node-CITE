const start = Date.now();
let word = 'the';
let path = 'Gutenberg';
let rx= new RegExp(`\\b${word}\\b`, 'gi');
let fs = require('fs');
	
	fs.readdir(path, (err, files) => {
		if (err) {
			console.log(err);
			return;
		}
		for(let file of files) {
			try {
			let data = fs.readFileSync(`${path}/${file}`);
			let words = data.toString().match(rx);
			let count = words ? words.length: 0;
			console.log(`Elapsed time: ${Date.now()-start} ms.`,
			`Found ${count} "${word}" in ${file}.`);
			}
			catch(ex) {
			console.log(ex);
			}
		}
	});
	
