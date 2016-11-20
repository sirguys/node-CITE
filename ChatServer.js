const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.static('public'));
process.on('SIGINT', ()=>{
  console.log('User exits');
  process.exit();
});
process.on('exit', ()=>{
	fs.writeFileSync('chatlog.json', JSON.stringify(log));
});
const server = app.listen(3000, (err)=>{
  if(err) console.error(err);
  else console.log('Server is listening at "http://localhost:3000"');
});
const io= require('socket.io')(server);
const member = new Map();
const log =[];
io.on('connection', (socket)=>{
  console.log('a user connected');
  socket.on('regis', (data)=>{
    let result = true;
    for(let m of member) {
      if(m[1] == data) {
        result = false;
        break;
      }
    }
    socket.emit('re-regis', result);
    if(result) {
      member.set(socket, data);
      const mlist = [];
      for(let m of member.values()) {
        mlist.push(m);
      }
      io.emit('update', mlist);
    }
  });
  socket.on('disconnect', ()=>{
    member.delete(socket);
    const mlist= [];
    for(let m of member.values()) {
      mlist.push(m);
    }
    io.emit('update', mlist);
  });
  socket.on('chat', (data)=>{
    log.push(data);
    io.emit('chat', data);
  });
});
