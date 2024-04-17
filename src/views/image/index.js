import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IP from "../../type/data";

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState('');
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        async function fetchImageList() {
            try {
                const response = await axios.get(IP.serverip+'upload/list');
                setImageList(response.data);
            } catch (error) {
                console.error('Error fetching image list:', error);
            }
        }

        fetchImageList();
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Veuillez sélectionner un fichier');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(IP.serverip+'/upload', formData);
            setResponse(response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
            setResponse('Erreur lors du téléchargement de l\'image.');
        }
    };

    const handleImageClick = (imageName) => {
        // Handle image click logic (e.g., open image in a new tab)
        window.open(IP.serverip+`upload/${imageName}`);
    };

    return (
        <div>
            <h1>Télécharger une image</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Télécharger</button>
            {response && (
                <div>
                    <h2>Réponse du serveur :</h2>
                    <p>{response}</p>
                </div>
            )}
            <h2>Liste des images :</h2>
            <ul>
                {imageList.map((imageName, index) => (
                    <li key={index} onClick={() => handleImageClick(imageName)}>

                        <img src={IP.serverip+`upload/${imageName}`} alt={imageName} style={{ width: '100px', height: 'auto' }} />
                        <br />
                        {imageName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ImageUpload;
