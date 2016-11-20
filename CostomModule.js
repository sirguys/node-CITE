module.exports = (word, path)=>{
	const rx= new RegExp(`\\b${word}\\b`, 'gi');
	const fs = require('fs');
	return {count:(callback)=>{
		fs.readdir(path, (err, files)=>{
		if(err) callback(err);
			else {
				let counts = [];
				for(let file of files) {
					let data = fs.readFile(`${path}/${file}`, (err, data)=>{
						if(err) {
							counts.push({file: file, count: err});
						}
						else {
							let words = data.toString().match(rx);
							let count = words ? words.length: 0;
							counts.push({file: file, count: count});
						}
						if(counts.length== files.length) callback(null, counts);
					});
				}
			}
		});
	}};
};
