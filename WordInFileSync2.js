console.time('sync');
const word = process.argv[2];
const path = process.argv[3];
process.on('exit', ()=>{
console.timeEnd('sync');
});
let rx= new RegExp(`\\b${word}\\b`, 'gi');
let fs = require('fs');
try {
	let files = fs.readdirSync(path);
	for(let file of files) {
		try {
			let data = fs.readFileSync(`${path}/${file}`);
			let words = data.toString().match(rx);
			let count = words ? words.length: 0;
			console.log(`Found ${count} "${word}" in ${file}.`);
		}
		catch(ex) {
			console.log(ex);
		}
	}
} catch(ex) {
console.log(ex);
}