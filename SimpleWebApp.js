const http = require('http');
const server = http.createServer((req, res)=>{
	switch(req.url) {
		case '/hello':
			res.end('Hello');
			break;
		case '/bye':
			res.end('Good bye');
			break;
		default:
			let guy = req.url.match(/\/iam\/[^\/]+/gi);
			if(guy) res.end(`Nice to meet you ${guy[0].substr(5)}.`);
			else {
				res.writeHead(500);
				res.write('Nooooooooooooooooooo');
				res.end('Unknown Request');
			}
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