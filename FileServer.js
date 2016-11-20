const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res)=>{
	const filePath= req.url=='/' ? 'index.html' : req.url.substr(1);
	fs.readFile(filePath, (err, data)=>{
		if(err) {
			res.writeHead(404);
			res.end('File not found!');
		}
		else {
			switch(path.extname(filePath)) {
				case '.png':
					res.writeHead(200, {'Content-Type':'image/png'});
				break;
				case '.jpg':
					res.writeHead(200, {'Content-Type':'image/jpeg'});
				break;
			}
			res.end(data);
		}
	});
});
process.on('SIGINT', ()=>{
	console.log('User exit');
	process.exit();
});
server.listen(3000, (err)=>{
	if(err) console.error(err);
	else console.log('Server listening at http://localhost:3000');
});