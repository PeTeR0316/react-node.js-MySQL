import { useEffect, useRef, useState } from "react";

import '../css/writeBoard.css'

const WriteBoard = () => {
    const [title , setTitle] = useState();
    const [content, setContent] = useState();
    const [id, setId] = useState();
    const [password, setPassword] = useState();

    const changeValue = (e) => {
        const targetName = e.target.name;

        if(targetName === "title") {
            setTitle(e.target.value)
        } else if(targetName === "content") {
            setContent(e.target.value)
        } else if(targetName === "id") {
            setId(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    //게시글 작성
    const write = () => {
        const insertData = {
            inTitle : title,
            inContent : content,
            inId : id,
            inPassword : password,
        };

        fetch('http://localhost:3001/api/insert', {
            method: 'post',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(insertData)
        })
            .then(res => res.json());
        
        window.location.href = '/'; //작성 완료 후 게시글 페이지로 이동
    }

    return (
        <div className="writeBoard">
            <form>
                <ul>
                    <li>
                        <span>제목</span>
                        <input type="text" name="title" onChange={changeValue} />
                    </li>
                    <li>
                        <span>작성자</span>
                        <input type="text" name="id" onChange={changeValue} />
                    </li>
                    <li>
                        <span>비밀번호</span>
                        <input type="password" name="password" onChange={changeValue} />
                    </li>
                    <li>
                        <span>내용</span>
                        <br />
                        <textarea name="content" onChange={changeValue} />
                    </li>
                </ul>
            </form>

            <button onClick={write}>작성하기</button>
            <button onClick={() => window.history.back()}>돌아가기</button>
        </div>
    )
};

export default WriteBoard;