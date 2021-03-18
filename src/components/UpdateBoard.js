import { useEffect, useState } from "react";
import '../css/updateBoard.css'

const UpdateBoard = (props) => {
    const { boardNo } = props.match.params;
    const [updateBoardInfo, setUpdateBoardInfo] = useState([]);
    const [title , setTitle] = useState();
    const [content, setContent] = useState();
    //const [id, setId] = useState();

    useEffect(() => {
        //클릭 한 게시글 데이터 가져오기
        fetch(`http://localhost:3001/api/select/list/${boardNo}`)
            .then(res => res.json())
            .then(data => {
                setUpdateBoardInfo(data[0]);
                setTitle(data[0].title);
                setContent(data[0].content);
            });
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

        fetch('http://localhost:3001/api/update', {
            method: 'post',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json());
        
        window.location.href = '/'; //작성 완료 후 게시글 페이지로 이동
    }

    return (
        <div className="updateBoard">
            <form>
                <ul>
                    <li>
                        <span>제목: </span>
                        <input type="text" name="title" onChange={changeValue} value={title} />
                    </li>
                    <li>
                        <span>작성자: </span>
                        <span>{updateBoardInfo.id}</span>
                    </li>
                    <li>
                        <span>내용</span>
                        <br />
                        <textarea name="content" onChange={changeValue} value={content} />
                    </li>
                </ul>
            </form>

            <button onClick={update}>수정하기</button>
            <button onClick={() => window.history.back()}>돌아가기</button>
        </div>
    )
};

export default UpdateBoard;