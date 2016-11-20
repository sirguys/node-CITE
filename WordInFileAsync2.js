console.time('async');
const word = process.argv[2];
const path = process.argv[3];
process.on('exit', ()=>{
	console.timeEnd('async');
});
let rx= new RegExp(`\\b${word}\\b`, 'gi');
let fs = require('fs');
fs.readdir(path, (err, files)=>{
	if(err) console.log(err);
	else {
		for(let file of files) {
			let data = fs.readFile(`${path}/${file}`, (err, data)=>{
				if(err) console.log(err);
				else {
				let words = data.toString().match(rx);
				let count = words ? words.length: 0;
				console.log(`Found ${count} "${word}" in ${file}.`);
				}
			});
		}
	}
});