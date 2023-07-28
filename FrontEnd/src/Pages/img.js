import React, { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";

function App() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState([]);

  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  };

  const uploadTrigger = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
    setResults([]);
  };

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);
  useEffect(() => {
    // Trigger detection only if the model is loaded and imageUrl is not null
    if (model && imageUrl) {
      detectImage();
    }
  }, [model, imageUrl]);


  if (isModelLoading) {
    return <h2 style={{ textAlign: "center" }}>Initializing</h2>;
  }

const detectImage = async () => {
  try {
    textInputRef.current.value = "";
    const imageElement = imageRef.current;

    // Make sure the image has loaded and has non-zero dimensions
    
    if (imageElement.complete && imageElement.width && imageElement.height) {
      const results = await model.classify(imageElement);
      setResults(results);
    } else {
      console.log("Invalid image dimensions or image not loaded yet.");
    }
  } catch (error) {
    console.error("Error during image classification:", error);
  }
};


const firstResultName = results.length > 0 ? results[0].className : null;


  return (
    <div>
      <h1 className="header">Image Detection</h1>
      <div className="inputField">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          onChange={uploadImage}
          ref={fileInputRef}
        />

        <button className="uploadImage" onClick={uploadTrigger}>
          Upload Image
        </button>

        <span className="or">OR</span>

        <input
          type="text"
          placeholder="Enter Image URL"
          ref={textInputRef}
          onChange={handleInputChange}
        />

      </div>
      <div className="imageWrapper">
        <div className="imageContent">
          <div className="imageArea">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Image Preview"
                crossOrigin="anonymous"
                ref={imageRef}
              />
            )}
          </div>


         <p>{firstResultName}</p>
         
        </div>
        {imageUrl && (
          <button className="button" onClick={detectImage}>
            Detect Image
          </button>
        )}
      </div>
    </div>
  );
}

export default App;