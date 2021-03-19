import { useEffect, useRef, useState } from "react";
import axios from 'axios';

import '../css/writeBoard.css'

const BASE_URL = "http://localhost:3001";

const WriteBoard = () => {
    const [title , setTitle] = useState();
    const [content, setContent] = useState();
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [img, setImage] = useState(null);

    const [contents, setContents] = useState("");
    const [uploadedImg, setUploadedImg] = useState({
      fileName: "",
      fillPath: ""
    });

    const changeValue = (e) => {
        const targetName = e.target.name;
        
        if(targetName === "title") {
            setTitle(e.target.value)
        } else if(targetName === "content") {
            setContent(e.target.value)
        } else if(targetName === "id") {
            setId(e.target.value)
        } else if(targetName === "password") {
            setPassword(e.target.value)
        } else {
            setImage(e.target.files[0])
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


    const imageSend = () => {
        document.getElementById('uploadForm').submit();
    }


    return (
        <div className="writeBoard">
            <form encType="multipart/form-data" className="writeForm">
                <ul>
                    <li>
                        <input type="text" name="title" onChange={changeValue} placeholder="제목을 입력해 주세요" />
                    </li>
                    <li>
                        <input type="text" name="id" onChange={changeValue} placeholder="작성자 닉네임" />
                    </li>
                    <li>
                        <input type="password" name="password" onChange={changeValue} placeholder="비밀번호를 입력해 주세요" />
                    </li>
                    <li>
                        <form
                            id='uploadForm' 
                            action='http://localhost:3001/upload' 
                            method='post' 
                            encType="multipart/form-data">
                            <input type="file" name="imageFile" onChange={imageSend} />
                        </form>  
                    </li>
                    <li>
                        <textarea name="content" onChange={changeValue} placeholder="내용을 입력하세요" />
                    </li>
                </ul>
            </form>

            <div className="btns">
                <button onClick={write}>작성하기</button>
                <button onClick={() => window.history.back()}>돌아가기</button>
            </div>
        </div>
    )
};

export default WriteBoard;