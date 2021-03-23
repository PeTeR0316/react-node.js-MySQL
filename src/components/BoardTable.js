import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';

import '../css/boardTable.css';

function BoardTable() {
    const [boardList, setBoardList] = useState([]); //SELECT 값
    const [count, serCount] = useState(); //개시글 수
    const [searchValue, setSearchValue] = useState(null); //게시글 검색 데이터
    const [searchSelectValue, setSearchSelectValue] = useState('아이디'); //게시글 검색 데이터

    //게시판 리스트 가져오기
    useEffect(() => {
        // fetch('http://localhost:3001/api/project/select')
        //     .then(res => res.json())
        //     .then(data => setBoardList(data));

        axios.get('http://localhost:3001/api/project/select')
            .then(response => setBoardList(response.data))
            .catch(err => console.log(err));

    },[]);

    //페이지 번호에 따른 게시판 리스트 가져오기
    const pageListChange = (e) => {
        // fetch(`http://localhost:3001/api/select/listchange/${e.target.textContent}`)
        //     .then(res => res.json())
        //     .then(data => setBoardList(data));       
            
        axios.get(`http://localhost:3001/api/select/listchange/${e.target.textContent}`)
            .then(response => setBoardList(response.data))
            .catch(err => console.log(err));
    };

    // 조회수 업데이트
    const updateHits = (boardNo, boardHits) => {
        const updateData = {
            indexNo : boardNo,
            inHits : boardHits,
        };

        // fetch('http://localhost:3001/api/hitupdate', {
        //     method: 'post',
        //     headers: {
        //         'content-type' : 'application/json',
        //     },
        //     body: JSON.stringify(updateData)
        // });

        axios.post('http://localhost:3001/api/hitupdate',updateData)
            .then(() => {console.log('update')})
            .catch(err => console.log(err));
    }

    //게시글 총 개수 구하는 함수
    const countList = () => {
        // fetch('http://localhost:3001/api/select/count')
        //     .then(res => res.json())
        //     .then(data => serCount(data[0].count));

        axios.get('http://localhost:3001/api/select/count')
            .then(response => serCount(response.data[0].count))
            .catch(err => console.log(err));
        
        return count;
    }

    //게시물 수에 따른 페이지 번호 생성
    const pageRange = () => {
        let range = count / 15;
        let restList = count % 15;
        let liElement = [];
        if(restList !== 0) {
            range++

            for(let liCnt = 1; liCnt <= range; liCnt++) {
                liElement[liCnt - 1] = <li onClick={pageListChange}>{liCnt}</li>
            }
        } else {
            for(let liCnt = 1; liCnt <= range; liCnt++) {
                liElement[liCnt - 1] = <li onClick={pageListChange}>{liCnt}</li>
            }
        };

        return liElement;
    };

    //검색한 리스트 가져오기
    const searchList = () => {
        if(searchValue === null || searchValue === "") {
            alert("검색어를 입력하세요");
            return;
        }

        // fetch(`http://localhost:3001/api/select/searchlist/${searchValue}/${searchSelectValue}`)
        //     .then(res => res.json())
        //     .then(data => setBoardList(data));

        axios.get(`http://localhost:3001/api/select/searchlist/${searchValue}/${searchSelectValue}`)
            .then(response => setBoardList(response.data))
            .catch(err => console.log(err));
        
        window.location.href = `/search/${searchValue}/${searchSelectValue}`
    }

    return (
    <div className="boardTable">
        <Link to={`/`}>
            <h1 className="mainTitle">전체글보기</h1>
        </Link>
        <p className="totalCnt">
            <span>{countList()}</span>개의 글
        </p>
        <table>
            <tr>
                <td>번호</td>
                <td>제목</td>
                <td>작성자</td>
                <td>작성일</td>
                <td>조회</td>
            </tr>
            {boardList.map((listInfo, i) => (
                <tr key={i}>
                    <td>{listInfo.no}</td>
                    <td>
                        <Link to={`/read/${listInfo.no}`} onClick={() => {updateHits(listInfo.no, listInfo.hits)}}>
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
            {pageRange()}
        </ul>
        <div className="searchArea">
            <select onChange={(e) => setSearchSelectValue(e.target.value)}>
                <option>아이디</option>
                <option>제목</option>
            </select>
            <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
            <button className="searchBtn" onClick={searchList}>검색</button>
        </div>

        <Link to={'/board/write'} className="writeBtn">글쓰기</Link>
    </div>
    );
}

export default BoardTable;


