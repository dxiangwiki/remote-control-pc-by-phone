const express = require('express');
const cors = require('cors');
const app = express();

// 解决跨域 + 解析JSON
app.use(cors());
app.use(express.json());

// 让手机/电脑能访问页面
app.use(express.static('../'));

// 存储遥控指令（核心数据）
let command = { action: 'home', page: 1 };

// 手机发送指令
app.post('/set-command', (req, res) => {
  command = req.body;
  res.json({ ok: true, command });
});

// 电脑获取指令
app.get('/get-command', (req, res) => {
  res.json(command);
});

// 首页提示
app.get('/', (req, res) => {
  res.send(`
    服务启动成功！<br>
    电脑端：http://192.168.43.200:3000/client-pc/index.html <br>
    手机端：http://192.168.43.200:3000/client-phone/index.html
  `);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('服务运行：http://192.168.43.200:3000');
});