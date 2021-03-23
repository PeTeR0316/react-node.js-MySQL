import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import '../css/readBoard.css'

const ReadBoard = (props) => {
    const { boardNo } = props.match.params;
    const [boardInfo, setBoardInfo] = useState([]);
    //const [writepassword, setWritePassword] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/select/list/${boardNo}`)
            .then(response => setBoardInfo(response.data[0])) //클릭 한 게시글 데이터 가져오기
            .catch(err => console.log(err))
    },[]);

    const modifyClick = (e) => {
        e.preventDefault();

        let checkPassword = window.prompt("비밀번호를 입력하세요");

        //클릭 한 게시글 비밀번호 가져오기
        axios.get(`http://localhost:3001/api/modifyCheck/${boardNo}`)
            .then(response => {
                //입력한 비밀번호와 게시글 비밀번호 비교
                if(checkPassword !== response.data[0].password) {
                    alert("패스워드가 틀립니다.");
                } else {
                    window.location.href = `/update/${boardInfo.no}`
                }
            })
    }

    //게시글 삭제
    const deleteBtn = () => {
        const deleteData = {
            deleteNo : boardNo,
        };

        axios.post('http://localhost:3001/api/delete', deleteData)
            .then(() => {console.log('delete')})
            .catch(err => console.log(err));

        window.location.href = '/'; //삭제 후 게시글 페이지로 이동
    };

    const deleteClick = (e) => {
        e.preventDefault();

        let checkPassword = window.prompt("비밀번호를 입력하세요");

        //클릭 한 게시글 비밀번호 가져오기
        axios.get(`http://localhost:3001/api/modifyCheck/${boardNo}`)
        .then(response => {
            //입력한 비밀번호와 게시글 비밀번호 비교
            if(checkPassword !== response.data[0].password) {
                alert("패스워드가 틀립니다.");
            } else {
                deleteBtn()
            }
        })
    }  
    
    return (
        <div className="readBoard">
            <ul>
                <li className="title">{boardInfo.title}</li>
                <li className="writer">
                    {boardInfo.id}
                    <br />
                    <span>{boardInfo.ins_date} 조회 {boardInfo.hits}</span>
                </li>
                <li className="content">
                    <div className='contentBox'>
                        {boardInfo.content}
                    </div>
                </li>
            </ul>
            <div className="btns">
                <button onClick={deleteClick}>삭제하기</button>
                <Link to={`/update/${boardInfo.no}`} className='modify' onClick={modifyClick}>
                    수정하기 
                </Link>
                <button onClick={() => window.history.back()}>목록보기</button>
            </div>
        </div>
    )
}

export default ReadBoard;