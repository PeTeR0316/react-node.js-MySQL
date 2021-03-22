var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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


// default options
express().use(fileUpload());

//데이터베이스 연결
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Hanmir0341!',
    database : 'user'
});
connection.connect();

//board 테이블 SELECT
router.get('/project/select', (req, res) => {
    let selectSQL = `SELECT no, title, content, id, date_format(write_time, '%Y-%m-%d %H:%i') as 'ins_date', hits FROM board ORDER BY no DESC LIMIT 0, 15;`;

    connection.query(selectSQL, (err, rows,fields) => {
        res.send(rows);
        console.log(Date() + " select ok!");
    })
});

//board 테이블 페이지 번호에 따른 리스트 SELECT
router.get('/select/listchange/:pagenum', (req, res) => {
    let selectPage = 0;

    if(parseInt(req.params.pagenum) > 0) {
        selectPage = (parseInt(req.params.pagenum) - 1) * 15;
    }

    let selectSQL = `SELECT no, title, content, id, date_format(write_time, '%Y-%m-%d %h:%i') as 'ins_date', hits FROM board ORDER BY no DESC LIMIT ${selectPage}, 15;`;

    connection.query(selectSQL, (err, rows,fields) => {
        res.send(rows);
    })
});

//검색한 게시글 SELECT
router.get('/select/searchlist/:searchValue/:searchSelectValue', (req, res) => {
    let selectSearchValue = req.params.searchValue; //검색 키워드
    let searchSelectValue = req.params.searchSelectValue; //검색 종류
    let selectPage = 0;

    if(parseInt(req.params.pagenum) > 0) {
        selectPage = (parseInt(req.params.pagenum) - 1) * 15;
    }

    if (searchSelectValue == "아이디") {
        let selectSQL = `SELECT no, title, content, id, date_format(write_time, '%Y-%m-%d %h:%i') as 'ins_date', hits FROM board WHERE id = '${selectSearchValue}' ORDER BY no DESC LIMIT ${selectPage}, 15;`;

        connection.query(selectSQL, (err, rows,fields) => {
            res.send(rows);
            console.log(Date() + " 검색한 게시글 SELECT ok!");
        })
    } else if (searchSelectValue == "제목") {
        let selectSQL = `SELECT no, title, content, id, date_format(write_time, '%Y-%m-%d %h:%i') as 'ins_date', hits FROM board WHERE title LIKE '%${selectSearchValue}%' ORDER BY no DESC LIMIT ${selectPage}, 15;`;

        connection.query(selectSQL, (err, rows,fields) => {
            res.send(rows);
            console.log(Date() + " 검색한 게시글 SELECT ok!");
        })
    }
});

//검색한 게시글 페이지 번호에 따른 리스트 SELECT
router.get('/select/searchlist/:searchValue/:searchSelectValue/:pagenum', (req, res) => {
    let selectSearchValue = req.params.searchValue; //검색 키워드
    let searchSelectValue = req.params.searchSelectValue; //검색 종류
    let selectPage = 0;

    if(parseInt(req.params.pagenum) > 0) {
        selectPage = (parseInt(req.params.pagenum) - 1) * 15;
    }

    if (searchSelectValue == "아이디") {
        let selectSQL = `SELECT no, title, content, id, date_format(write_time, '%Y-%m-%d %h:%i') as 'ins_date', hits FROM board WHERE id = '${selectSearchValue}' ORDER BY no DESC LIMIT ${selectPage}, 15;`;

        connection.query(selectSQL, (err, rows,fields) => {
            res.send(rows);
            console.log(Date() + " 검색한 게시글 페이지 SELECT ok!");
        })
    } else if (searchSelectValue == "제목") {
        let selectSQL = `SELECT no, title, content, id, date_format(write_time, '%Y-%m-%d %h:%i') as 'ins_date', hits FROM board WHERE title LIKE '%${selectSearchValue}%' ORDER BY no DESC LIMIT ${selectPage}, 15;`;

        connection.query(selectSQL, (err, rows,fields) => {
            res.send(rows);
            console.log(Date() + " 검색한 게시글 페이지 SELECT ok!");
        })
    }
});


//전체 게시글 수 구하기
router.get('/select/count', (req, res) => {
    let selectSQL = `SELECT count(*) AS count FROM board;`;

    connection.query(selectSQL, (err, rows,fields) => {
        res.send(rows);
    })
});

//검색한 게시글 수 구하기
router.get('/select/count/:searchValue/:searchSelectValue', (req, res) => {
    let selectSearchValue = req.params.searchValue; //검색 키워드
    let searchSelectValue = req.params.searchSelectValue; //검색 종류

    let selectSQL = `SELECT count(*) AS count FROM board;`;

    if (searchSelectValue == "아이디") {
        let selectSQL = `SELECT count(*) AS count FROM board WHERE id = '${selectSearchValue}';`;

        connection.query(selectSQL, (err, rows,fields) => {
            res.send(rows);
            console.log(Date() + " 검색한 게시글 count ok!");
        })
    } else if (searchSelectValue == "제목") {
        let selectSQL = `SELECT count(*) AS count FROM board WHERE title LIKE '%${selectSearchValue}%';`;

        connection.query(selectSQL, (err, rows,fields) => {
            res.send(rows);
            console.log(Date() + " 검색한 게시글 count ok!");
        })
    }
});


//선택한 게시글 SELECT
router.get('/select/list/:listnum', (req, res) => {
    let selectList = req.params.listnum;

    let selectSQL = `SELECT no, title, content, id, date_format(write_time, '%Y-%m-%d %h:%i') as 'ins_date', hits FROM board WHERE no = '${selectList}';`;

    connection.query(selectSQL, (err, rows,fields) => {
        res.send(rows);
        console.log(Date() + "선택한 게시글 SELECT ok!");
    })
});


//INSERT 쿼리문
router.post('/insert', (req, res) => {
    const insertTitle = req.body.inTitle; //제목
    const insertContent = req.body.inContent; //내용
    const insertId = req.body.inId; //작성자 아이디
    const insertPassword = req.body.inPassword; //게시글 비밀번

    let insertSQL = `INSERT INTO board (title, content, id, password) values('${insertTitle}', '${insertContent}','${insertId}', '${insertPassword}')`;

    connection.query(insertSQL, (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " insert ok!");
        }
    });

    //게시글 NO 초기화
    let resetNoSQL1 = 'alter table board auto_increment=1;';

    connection.query(resetNoSQL1 , (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " reset ok!");
        }
    });

    let resetNoSQL2 = `set @COUNT = 0;`;

    connection.query(resetNoSQL2 , (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " reset ok!");
        }
    });

    let resetNoSQL3 = `update board set no = @COUNT:=@COUNT+1;`;

    connection.query(resetNoSQL3 , (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " reset ok!");
        }
    });
});

//DELETE 쿼리문
router.post('/delete', (req, res) => {
    const deleteNo = req.body.deleteNo; //게시글 번호
    let deleteSQL = `DELETE FROM board WHERE no = '${deleteNo}';`;

    connection.query(deleteSQL, (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " delete ok!");
        }
    });

    //게시글 NO 초기화
    let resetNoSQL1 = 'alter table board auto_increment=1;';

    connection.query(resetNoSQL1 , (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " reset ok!");
        }
    });

    let resetNoSQL2 = `set @COUNT = 0;`;

    connection.query(resetNoSQL2 , (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " reset ok!");
        }
    });

    let resetNoSQL3 = `update board set no = @COUNT:=@COUNT+1;`;

    connection.query(resetNoSQL3 , (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " reset ok!");
        }
    });
});


//게시글 UPDATE 쿼리문
router.post('/update', (req, res) => {
    const updateTitle = req.body.inTitle; //제목
    const updateContent = req.body.inContent; //내용
    const updateId = req.body.inId; //작성자 아이디
    const indexNo = req.body.indexNo; //업데이트 대상 게시물 번호(no)

    let now = new Date();
    let year = now.getFullYear();
    let month= now.getMonth() + 1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let updateTime = `${year}-${month}-${date} ${hours}:${minutes}`; //업데이트 시간

    let updateSQL = `UPDATE board SET title = '${updateTitle}', content = '${updateContent}', id ='${updateId}', write_time = '${updateTime}' WHERE no = '${indexNo}'`;

    connection.query(updateSQL, (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " update ok!");
        }
    });
});

//조회수 업데이트
router.post('/hitupdate', (req, res) => {
    const updateHits = parseInt(req.body.inHits) + 1; //조회수 증가
    const indexNo = req.body.indexNo; //업데이트 대상 게시물 no

    let updateHitSQL = `UPDATE board SET hits = '${updateHits}' WHERE no = '${indexNo}'`;

    connection.query(updateHitSQL, (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(Date() + " update ok!");
        }
    });
});


//게시글 작성자 확인
router.get('/modifyCheck/:indexno', (req, res) => {
    let selectNo = req.params.indexno;

    let selectSQL = `SELECT password FROM board WHERE no = '${selectNo}';`;

    connection.query(selectSQL, (err, rows,fields) => {
        res.send(rows);
    })
});

module.exports = router;



