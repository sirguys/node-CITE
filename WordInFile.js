const http = require('http');
const wif= require('./CostomModule')('for', '.');
const server = http.createServer((req, res)=>{
	if(req.url == '/count') {
		wif.count((err, data)=>{
		if(err) {
			res.writeHead(500);
			res.end(err);
		}
			else {
				let line = '';
				for(let e of data) {
				line += `Found ${e.count} in ${e.file}<br/>`;
				}
				res.writeHead(200, {"Content-Type": "text/html"});
				res.end(line);
			}
		});
	}
	else {
		res.writeHead(404);
		res.end('Unknown Request');
	}
});
process.on('SIGINT', ()=>{
	console.log('User exit');
	process.exit();
});
server.listen(3000, (err)=>{
	if(err) console.error(err);
	else console.log('Server listening at http://localhost:3000');
});
