import { useEffect, useRef, useState } from "react";
import axios from 'axios';

import '../css/writeBoard.css'

//const BASE_URL = "http://localhost:3001";

const WriteBoard = () => {
    const [title , setTitle] = useState();
    const [content, setContent] = useState();
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [img, setImage] = useState(null);

    const [form, setForm] = useState({
        title: '',
        file: '',
    })

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
        } else if(targetName === "img") {
            setImage(e.target.files[0])
            console.log(e.target.files[0]);
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

        axios.post('http://localhost:3001/api/insert',insertData)
        .then(() => {console.log('게시글 작성')})
        .catch(err => console.log(err));

        window.location.href = '/'; //작성 완료 후 게시글 페이지로 이동
    }

    const imageSend = () => {
        document.getElementById('uploadForm').submit();
    };


    const axiosTest = () => {
        axios.post('http://localhost:3001/image/upload', {
           sendImg : img,
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        });
    }


    return (
        <div className="writeBoard">
            <form id="writeForm" encType="multipart/form-data" action="http://localhost:3001/photos/upload" method="POST" >
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
                        {/* <form id="uploadForm" action="http://localhost:3001/photos/upload" method="POST" enctype="multipart/form-data">
                            <input type="file" name="img" onChange={imageSend} />
                        </form>  */}
                        <input className="sendFile" type="file" name="img" id="img" onChange={changeValue} placeholder="파일 업로드" />
                    </li>
                    <li>
                        <textarea className="contentArea" name="content" onChange={changeValue} placeholder="내용을 입력하세요" />
                    </li>
                </ul>
                
                <div className="btns">
                    <button type="button" onClick={write}>작성하기</button>
                    <button onClick={() => window.history.back()}>돌아가기</button>
                </div>
            </form>
        </div>
    )
};

export default WriteBoard;