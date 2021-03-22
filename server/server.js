const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const fileUpload = require('express-fileupload');

//multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '_' + file.originalname)
    }
});
const upload = multer({ storage: storage});

app.post('/photos/upload', upload.single('img'), (req, res)=>{
    console.log("파일업로드했습니다")
    console.log(req.file);
});


// default options
app.use(fileUpload());
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// '/api'로 시작시 DB와 연동하여 쿼리문 실행
app.use('/api', api);




//express-fileupload 이미지 파일 서버 폴더에 저장
app.post('/upload', (req, res) => {
    let uploadFile = req.files.imageFile;
    const fileName = req.files.imageFile.name;
    let folderAddr = `${__dirname}/upload/images/${fileName}`;

    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
    }

    uploadFile.mv(folderAddr, (err) => {
        if(err) {
            return res.status(500).send(err);
        }

        console.log('File uploaded!');
    });
});


//axios
app.post('/image/upload', (req, res) => {
    console.log("axios!");
    console.log(req.body.sendImg);
})

app.listen(port,()=>console.log(`Listening on port ${port}`));