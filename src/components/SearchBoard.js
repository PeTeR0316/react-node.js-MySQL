import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios'

import '../css/boardTable.css';

const SearchBoard = (props) => {
    const { keyword, keywordValue } = props.match.params;
    const [searchBoardList, setSearchBoardList] = useState([]); //SELECT 값
    const [count, setCount] = useState(); //개시글 수
    const [searchValue, setSearchValue] = useState(keyword); //게시글 검색 데이터
    const [searchSelectValue, setSearchSelectValue] = useState(keywordValue); //게시글 검색 데이터

    //게시판 리스트 가져오기
    useEffect(() => {
        // fetch(`http://localhost:3001/api/select/searchlist/${searchValue}/${searchSelectValue}/`)
        //     .then(res => res.json())
        //     .then(data => setSearchBoardList(data));

        axios.get(`http://localhost:3001/api/select/searchlist/${searchValue}/${searchSelectValue}`)
            .then(response => setSearchBoardList(response.data))
            .catch(err => console.log(err));
        
        countList();
    },[]);

    //게시글 총 개수 구하는 함수
    const countList = () => {
        // fetch(`http://localhost:3001/api/select/count/${searchValue}/${searchSelectValue}`)
        //     .then(res => res.json())
        //     .then(data => setCount(data[0].count));

        axios.get(`http://localhost:3001/api/select/count/${searchValue}/${searchSelectValue}`)
            .then(response => setCount(response.data[0].count))
            .catch(err => console.log(err));
    }

    //검색한 리스트 가져오기
    const searchList = () => {
        setSearchSelectValue(document.getElementsByClassName("searchSelect").value);

        if(searchValue === null || searchValue === "") {
            alert("검색어를 입력하세요");
            return;
        }

        // fetch(`http://localhost:3001/api/select/searchlist/${searchValue}/${searchSelectValue}`)
        //     .then(res => res.json())
        //     .then(data => setSearchBoardList(data));

        axios.get(`http://localhost:3001/api/select/searchlist/${searchValue}/${searchSelectValue}`)
            .then(response => setSearchBoardList(response.data))
            .catch(err => console.log(err));

        countList();
    }

    //페이지 번호에 따른 게시판 리스트 가져오기
    const pageListChange = (e) => {
        // fetch(`http://localhost:3001/api/select/searchlist/${searchValue}/${searchSelectValue}/${e.target.textContent}`)
        //     .then(res => res.json())
        //     .then(data => setSearchBoardList(data));        

        axios.get(`http://localhost:3001/api/select/searchlist/${searchValue}/${searchSelectValue}/${e.target.textContent}`)
            .then(response => setSearchBoardList(response.data))
            .catch(err => console.log(err));
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

    return (
    <div className="boardTable">
        <h1 className="mainTitle">{keyword} 검색리스트</h1>
        <p className="totalCnt">
            <span>{count}</span>개의 글
        </p>
        <table>
            <tr>
                <td>번호</td>
                <td>제목</td>
                <td>작성자</td>
                <td>작성일</td>
                <td>조회</td>
            </tr>
            {searchBoardList.map((listInfo, i) => (
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
            <select className="searchSelect" value={searchSelectValue} onChange={(e) => setSearchSelectValue(e.target.value)}>
                <option>아이디</option>
                <option>제목</option>
            </select>
            <input type="text" value={keyword} onChange={(e) => setSearchValue(e.target.value)} />
            <button className="searchBtn" onClick={searchList}>검색</button>
        </div>

        <Link to={'/board/write'} className="writeBtn">글쓰기</Link>
    </div>
    );
}

export default SearchBoard;