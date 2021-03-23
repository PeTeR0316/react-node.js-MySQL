import { useEffect, useState } from "react";
import axios from 'axios';

import '../css/updateBoard.css'

const UpdateBoard = (props) => {
    const { boardNo } = props.match.params;
    const [updateBoardInfo, setUpdateBoardInfo] = useState([]);
    const [title , setTitle] = useState();
    const [content, setContent] = useState();
    //const [id, setId] = useState();

    useEffect(() => {
        //클릭 한 게시글 데이터 가져오기
        axios.get(`http://localhost:3001/api/select/list/${boardNo}`)
            .then(response => {
                setUpdateBoardInfo(response.data[0]);
                setTitle(response.data[0].title);
                setContent(response.data[0].content);
            })
    },[]);

    const changeValue = (e) => {
        const targetName = e.target.name;

        if(targetName === "title") {
            setTitle(e.target.value)
        } else if(targetName === "content") {
            setContent(e.target.value)
        }
    }

    const update = () => {
        if(title == '') {
            setTitle(updateBoardInfo.title);
        }

        const updateData = {
            inTitle : title,
            inContent : content,
            inId : updateBoardInfo.id,
            indexNo : boardNo,
        };

        axios.post('http://localhost:3001/api/update',updateData)
            .then(() => {console.log('update')})
            .catch(err => console.log(err));
        
        window.location.href = '/'; //작성 완료 후 게시글 페이지로 이동
    }

    const historyBack = () => {
        let confirmValue = window.confirm("현재 작업이 저장되지 않습니다.");

        if(confirmValue) {
            window.history.back(); 
        };
    }

    return (
        <div className="updateBoard">
            <form>
                <ul>
                    <li>
                        <input type="text" name="title" onChange={changeValue} value={title} />
                    </li>
                    <li>
                        <span>{updateBoardInfo.id}</span>
                    </li>
                    <li>
                        <textarea name="content" onChange={changeValue} value={content} />
                    </li>
                </ul>
            </form>

            <div className="btns">
                <button onClick={update}>수정하기</button>
                <button onClick={historyBack}>돌아가기</button>
            </div>
        </div>
    )
};

export default UpdateBoard;