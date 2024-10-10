// src/Upload.js
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFileUrl(response.data.fileUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Upload Excel Sheet</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {fileUrl && (
                <div>
                    <h2>File uploaded successfully!</h2>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
                </div>
            )}
        </div>
    );
};

export default Upload;
