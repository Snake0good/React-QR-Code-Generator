import React, { useState } from 'react'

function Button() {
    const [imageBlob, setImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    const URL = `http://api.qrserver.com/v1/create-qr-code/?data=HelloWorld!&size=100x100`

    const callAPI = () => {
        fetch(URL)
            .then(response => {
                if(response.ok) {
                    return response.blob()
                }
                throw response
            })
            .then (imageBlob => {
                const imageObjectURL = window.URL.createObjectURL(imageBlob)
                setImage(imageObjectURL)
                console.log(imageObjectURL)

            })
            .catch(error => {
                console.error("Error fetching data: ", error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <button id="button" onClick={callAPI}>
            Generate QR Code
        </button>
    )
}


export default Button