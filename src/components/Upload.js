import { useEffect, useState  } from "react";
import '../css/updateBoard.css'

const Upload = (props) => {
    return (
        <div className="Upload">
            <form
                id='uploadForm' 
                action='http://localhost:3001/upload' 
                method='post' 
                encType="multipart/form-data">
                <input type="file" name="imageFile" />
                <input type='submit' value='Upload!' />
            </form>  
        </div>
    )
};

export default Upload;