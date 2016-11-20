const http = require('http');
const server = http.createServer((req, res)=>{
	res.end('Hello world!');
});
process.on('SIGINT', ()=>{
	console.log('User exit');
	process.exit();
});
server.listen(3000, (err)=>{
	if(err) console.error(err);
	else console.log('Server listening at http://localhost:3000');
});