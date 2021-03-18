import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import '../css/boardTable.css';

function BoardTable() {
    const [boardList, setBoardList] = useState([]);
    const [pageNum, setPageNum] = useState('1');

    //게시판 리스트 가져오기
    useEffect(() => {
        fetch('http://localhost:3001/api/project/select')
            .then(res => res.json())
            .then(data => setBoardList(data));

    },[]);

    const pageChange = (e) => {
        setPageNum(e.target.textContent);
    }

    //페이지 번호에 따른 게시판 리스트 가져오기
    const pageListChange = async (e) => {
        await new Promise((resolve, reject) => {
            setPageNum(e.target.textContent);
            resolve();
        })
        .then(() => {
            //페이지 번호를 파라미터로 전달
            fetch(`http://localhost:3001/api/select/listchange/${pageNum}`)
                .then(res => res.json())
                .then(data => setBoardList(data));
        })
        .catch(() => {
            alert("페이지를 불러올 수 없습니다.");
        });
    };

    // 조회수 업데이트
    const updateHits = (boardNo, boardHits) => {
        const updateData = {
            indexNo : boardNo,
            inHits : boardHits,
        };

        fetch('http://localhost:3001/api/hitupdate', {
            method: 'post',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(updateData)
        })
    }

    //개시글 총 개수 구하는 함수
    const countList = () => {
        const count = boardList.length;
        return count;
    }

    return (
    <div className="boardTable">
        <h1 className="mainTitle">전체글보기</h1>
        <p className="totalCnt">
            <span>{countList()}</span>개의 글
        </p>
        <table>
            <tr>
                <td>번호</td>
                <td>제목</td>
                {/* <td>내용</td> */}
                <td>작성자</td>
                <td>작성일</td>
                <td>조회수</td>
            </tr>
            {boardList.map((listInfo, i) => (
                <tr key={i}>
                    <td>{listInfo.no}</td>
                    <td>
                        <Link to={`/${listInfo.no}`} onClick={() => {updateHits(listInfo.no, listInfo.hits)}}>
                            {listInfo.title}
                        </Link>
                    </td>
                    {/* <td>{listInfo.content}</td> */}
                    <td>{listInfo.id}</td>
                    <td>{listInfo.ins_date}</td>
                    <td>{listInfo.hits}</td>
                </tr>
            ))}
        </table>

        <ul className="boardListNum">
            <li onClick={pageListChange}>1</li>
            <li onClick={pageListChange}>2</li>
            <li onClick={pageListChange}>3</li>
            <li onClick={pageListChange}>4</li>
            <li onClick={pageListChange}>5</li>
        </ul>

        <Link to={'/board/write'} className="writeBtn">글쓰기</Link>
    </div>
    );
}

export default BoardTable;