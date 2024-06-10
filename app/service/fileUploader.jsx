import React from "react";
import {axiosInstance} from './api';
import { axiosUploadInstance } from "./api";

function FileUploader(){
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [loadedBytes, setLoadedBytes] = useState(0);
    const [totalBytes, setTotalBytes] = useState(0);

    const uploadFile = (event) => {
        const file = event.target.files[0];
        setFile(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append('file', file);

        axiosUploadInstance.post('/files/upload', formData, {
            onUploadProgress: (ProgressEvent) =>{
                const loaded = ProgressEvent.loaded;
                const total = ProgressEvent.total;
                setLoadedBytes(loaded);
                setTotalBytes(total);
                const percent = (loaded/total) * 100;
                setStatus(Math.round(percent)+"% uploaded ...");
                setUploadProgress(Math.round(percent));

            }

        }).then((response) => {
            setStatus("Upload successful!");
            setUploadProgress(100);
            console.log(response.data);

        }).catch((error) => {
            setStatus("Upload failed!");
            console.error(error);
        });
    };

    return(
        <div className="file-uploader-container">
        <input type="file" name="file" onChange={uploadFile} />
        <label>
          File progress: <progress value={uploadProgress} max="100" />
        </label>
        <p>{status}</p>
        <p>uploaded {loadedBytes} bytes of {totalBytes}</p>
        {file && <img src={file} alt="Preview" style={{ width: "300px", height: "100px" }} />}
      </div>
    );
}

export default FileUploader;