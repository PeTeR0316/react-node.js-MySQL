import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import '../css/readBoard.css'

const ReadBoard = (props) => {
    const { boardNo } = props.match.params;
    const [boardInfo, setBoardInfo] = useState([]);
    //const [writepassword, setWritePassword] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/select/list/${boardNo}`)
            .then(res => res.json())
            .then(data => setBoardInfo(data)); //클릭 한 게시글 데이터 가져오기
    },[]);

    const modifyClick = (e) => {
        e.preventDefault();

        let checkPassword = window.prompt("비밀번호를 입력하세요");

        //클릭 한 게시글 비밀번호 가져오기
        fetch('http://localhost:3001/api/modifyCheck')
            .then(res => res.json())
            .then(data => {
                //입력한 비밀번호와 게시글 비밀번호 비교
                if(checkPassword !== data[boardNo-1].password) {
                    alert("패스워드가 틀립니다.");
                } else {
                    window.location.href = `/update/${boardInfo.no}`
                }
            });
    }

    //게시글 삭제
    const deleteBtn = () => {
        const deleteData = {
            deleteNo : boardNo,
        };

        fetch('http://localhost:3001/api/delete', {
            method: 'post',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(deleteData)
        })
            .then(res => res.json());


        window.location.href = '/'; //삭제 후 게시글 페이지로 이동
    };

    const deleteClick = (e) => {
        e.preventDefault();

        let checkPassword = window.prompt("비밀번호를 입력하세요");

        //클릭 한 게시글 비밀번호 가져오기
        fetch('http://localhost:3001/api/modifyCheck')
            .then(res => res.json())
            .then(data => {
                //입력한 비밀번호와 게시글 비밀번호 비교
                if(checkPassword !== data[boardNo-1].password) {
                    alert("패스워드가 틀립니다.");
                } else {
                    deleteBtn()
                }
            });
    }  
    
    return (
        <div className="readBoard">
            <p>제목: <sapn>{boardInfo.title}</sapn></p>
            <p>작성자: <sapn>{boardInfo.id}</sapn></p>
            <p>내용</p>
            <div className='contentBox'>
                {boardInfo.content}
            </div>

            <br />
            <button onClick={deleteClick}>삭제하기</button>
            <Link to={`/update/${boardInfo.no}`} className='modify' onClick={modifyClick}>
                수정하기 
            </Link>
            <button onClick={() => window.history.back()}>돌아가기</button>
            <p>{boardInfo.hit}</p>
        </div>
    )
}

export default ReadBoard;