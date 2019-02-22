//express js 사용을 선언합니다.
var app = require('express')();
//http 프로토콜 사용을 선언하고 http 서버를 생성합니다.
var server = require('http').createServer(app);
// http 서버를 socket.io server로 업데이트한다.
var io = require('socket.io')(server);

// ---------------------Express js 라우팅 시작---------------------------------------------------//

// 서버의 3002번 포트에 접속하면 클라이언트로 qrcode.html을 전송한다
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/qrcode.html');
});
// 서버의 3002번 포트의 main에 접속하면 클라이언트로 qrcode.html을 전송한다
app.get('/main', function(req, res) {
  res.sendFile(__dirname + '/main.html');
});


// ---------------------Acceration 관련 라우팅 부분----------------------------------------------//

app.get('/acc', function(req, res) {
  res.sendFile(__dirname + '/acc.html');
});

app.get('/snipe_before.mp4', function(req, res) {
  res.sendFile(__dirname + '/snipe_before.mp4');
});

app.get('/snipe_success.mp4', function(req, res) {
  res.sendFile(__dirname + '/snipe_success.mp4');
});

app.get('/snipe_fail.mp4', function(req, res) {
  res.sendFile(__dirname + '/snipe_fail.mp4');
});

// ---------------------Fog 효과 관련 라우팅 부분----------------------------------------------//

app.get('/fog', function(req, res) {
  res.sendFile(__dirname + '/fog.html');
});
app.get('/foggy.css', function(req, res) {
  res.sendFile(__dirname + '/foggy.css');
});

app.get('/qr_style.css', function(req, res) {
  res.sendFile(__dirname + '/qr_style.css');
});

app.get('/fog.jpg', function(req, res) {
  res.sendFile(__dirname + '/fog.jpg');
});
app.get('/spaceship.mp4', function(req, res) {
  res.sendFile(__dirname + '/spaceship.mp4');
});
// // ---------------------로드뷰 효과 관련 라우팅 부분--------------------------------------//

app.get('/rdv', function(req, res) {
  res.sendFile(__dirname + '/rdv.html');
});
app.get('/rdv_nowposition', function(req, res) {
  res.sendFile(__dirname + '/rdv_nowposition.html');
});
app.get('/rdv_video', function(req, res) {
  res.sendFile(__dirname + '/rdv_video.html');
});
app.get('/rdv_intro', function(req, res) {
  res.sendFile(__dirname + '/rdv_intro.html');
});

app.get('/rdv_intro.mp4', function(req, res) {
  res.sendFile(__dirname + '/rdv_intro.mp4');
});
app.get('/terminal_left.png', function(req, res) {
  res.sendFile(__dirname + '/terminal_left.png');
});
app.get('/terminal_right.png', function(req, res) {
  res.sendFile(__dirname + '/terminal_right.png');
});

app.get('/rdv_frontVideo.mp4', function(req, res) {
  res.sendFile(__dirname + '/rdv_frontVideo.mp4');
});
app.get('/rdv_endVideo.mp4', function(req, res) {
  res.sendFile(__dirname + '/rdv_endVideo.mp4');
});
app.get('/crm.png', function(req, res) {
  res.sendFile(__dirname + '/crm.png');
});
app.get('/qrcode.js', function(req, res) {
  res.sendFile(__dirname + '/qrcode.js');
});


// // ---------------------메인페이지 그림 파일 라우팅 부분------------------------------//

app.get('/focus.png', function(req, res) {
  res.sendFile(__dirname + '/focus.png');
});
app.get('/foggy.png', function(req, res) {
  res.sendFile(__dirname + '/foggy.png');
});

app.get('/emotion.png', function(req, res) {
  res.sendFile(__dirname + '/emotion.png');
});

app.get('/road.png', function(req, res) {
  res.sendFile(__dirname + '/road.png');
});

// // ---------------------Emotion 효과 관련 라우팅 부분----------------------------//

app.get('/emotion', function(req, res) {
  res.sendFile(__dirname + '/emotion.html');
});
app.get('/emo_StartStory.mp4', function(req, res) {
  res.sendFile(__dirname + '/emo_StartStory.mp4');
});
app.get('/emo_HappyEnding.mp4', function(req, res) {
  res.sendFile(__dirname + '/emo_HappyEnding.mp4');
});
app.get('/emo_SadEnding.mp4', function(req, res) {
  res.sendFile(__dirname + '/emo_SadEnding.mp4');
});
app.get('/emo_BadEnding.mp4', function(req, res) {
  res.sendFile(__dirname + '/emo_BadEnding.mp4');
});
app.get('/emotion.css', function(req, res) {
  res.sendFile(__dirname + '/emotion.css');
});

app.get('/computer.png', function(req, res) {
  res.sendFile(__dirname + '/computer.png');
});

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.on('connection', function(socket) {
  var room_id ;
  // join 메시지가 수신이 되면 room에 입장시킨다.
  socket.on('join',function(data){
    room_id = data.roomid;
    socket.join(room_id); //룸입장
    console.log('JOIN ROOM LIST', io.sockets.adapter.rooms[room_id].length);
    io.to(room_id).emit('join_num',{
      join_num : io.sockets.adapter.rooms[room_id].length
    });
  });

  // leaveRoom 메시지가 수신이 되면 room에 입장퇴장시킨다.
  socket.on('leaveRoom',function(){
    socket.leave(room_id);//룸퇴장
    console.log('OUT ROOM LIST', io.sockets.adapter.rooms);
  });

  // video_info 메시지가 수신이 되면 room에 video_info메시지를 보낸다.
  socket.on('video_info', function(data){
    var videomsg = {
      width : data.width,
      height : data.height,
      interactionID : data.interactionID
    }
    console.log('w:'+data.width+'\nh:'+data.height+'\nID:'+data.interactionID);
    io.to(room_id).emit('video_info',videomsg);
  }) ;

// inter_info 메시지가 수신이 되면 room에 inter_info 메시지를 보낸다.
  socket.on('inter_info', function(data){
    var videoid = {
      videoid : data.interactionID
    }
    console.log('w:'+data.interactionID);
    io.to(room_id).emit('inter_info',videoid);
  });

  // socket.on('emo_info', function(data){
  //   var videoid = {
  //     videoid : data.interactionID
  //   }
  //   console.log('w:'+data.interactionID);
  //   io.to(room_id).emit('emo_info',videoid);
  // }) ;

  // sensor 메시지가 수신이 되면 room에 sensor 메시지를 보낸다.
  socket.on('sensor', function(data) {
    console.log('Message from %s', data);

    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      acc: data.acc,
      gpsLatitude: data.gpsLatitude,
      gpsLongitude: data.gpsLongitude,
      touchX: data.touchX,
      touchY: data.touchY,
      emotion: data.emotion,
      emotion_percent: data.emotion_percent,
      micDec: data.micDec,
      micFog: data.micFog
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    //socket.broadcast.emit('chat', msg);

    // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
    // socket.emit('s2c chat', msg);

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.to(room_id).emit('sensor', msg);

    // 특정 클라이언트에게만 메시지를 전송한다
    // io.to(id).emit('s2c chat', data);
  });


  // req_gps ~ click_road까지는 메시지 수신 후 메시지를 room에 메시지를 전송한다.
  socket.on('req_gps',function(data){
    io.to(room_id).emit('req_gps') ;
  });

  socket.on('emotion',function(data){
    io.to(room_id).emit('emotion') ;
  });

  socket.on('rdv',function(data){
    io.to(room_id).emit('rdv') ;
  });

  socket.on('acc_ready',function(data){
    io.to(room_id).emit('acc_ready') ;
  });

  socket.on('acc_timeout',function(data){
    io.to(room_id).emit('acc_timeout') ;
  });

  socket.on('click_focus',function(data){
    io.to(room_id).emit('click_focus') ;
  });

  socket.on('click_foggy',function(data){
    io.to(room_id).emit('click_foggy') ;
  });

  socket.on('click_emotion',function(data){
    io.to(room_id).emit('click_emotion') ;
  });

  socket.on('click_road',function(data){
    io.to(room_id).emit('click_road') ;
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});
//3002번 포트로 서버가 리슨한다.
server.listen(3002, function() {
  console.log('Socket IO server listening on port 3002');
});
