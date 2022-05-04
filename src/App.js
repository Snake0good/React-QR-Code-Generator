import React, { useState } from 'react'
import loadingImg from './images/blocks-loading.gif'
import jacobWebsite from './images/jacob-website.PNG'
import noAddress from './images/noAddress.PNG'


function App() {
  const [img, setImg] = useState(jacobWebsite); 
  const [website, setWebsite] = useState(''); 
  const [color, setColor] = useState('');

  const fetchImage = async () => {  
    if (!website) {
      setImg(noAddress)
    } else {
      setImg(loadingImg)
      const URL = `http://api.qrserver.com/v1/create-qr-code/?data=${website}&size=200x200&color=${color}`
      const res = await fetch(URL);
      const imageBlob = await res.blob()
      const imageObjectURL = window.URL.createObjectURL(imageBlob);
      setImg(imageObjectURL)
    }

    
    // console.log(imageObjectURL)
    // console.log('website: ', website)
    // console.log('color: ', color)
  }

  const getWebsite = (e) => {
    setWebsite(e.target.value)
  }

  const getColor = (e) => {
    setColor(e.target.value.substring(1))
  }

  return (
    <div className="App">
      <header>
        <h1>
          QR Generator
        </h1>
          Create a Personal QR Code in Seconds
        <p></p>
      </header>
      <div className="qr-code">
        <img src={img} alt='generated-qr-code'/>
      </div>

      <div className='inputs'>
        <label htmlFor="web-address">
          Enter Your Website
        </label>
        <input 
          id='web-address'  
          placeholder='www.websitename.com' 
          onChange={getWebsite}
        />

        <label htmlFor="color-selector">
          Choose a QR Color
        </label>
        <input 
          id='color-selector'
          type='color'
          onChange={getColor}
        />

       <button id="button" onClick={fetchImage}>
            Generate QR Code
        </button>
      </div>
    </div>
  );
}

export default App;
