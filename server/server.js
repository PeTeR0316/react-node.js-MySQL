const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/name', (req, res) => {
//     res.json({username:'peter0105'})
// });

// '/api'로 시작시 DB와 연동하여 쿼리문 실행
app.use('/api', api);

app.listen(port,()=>console.log(`Listening on port ${port}`));