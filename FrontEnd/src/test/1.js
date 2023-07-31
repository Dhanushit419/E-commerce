import React, { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";

function App() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState([]);

  const imageRef = useRef();
  const fileInputRef = useRef();

  const uploadImage = (e) => {
    const { files } = e.target;
    console.log("upload started")
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
      console.log("uploaded")
      if(model && imageUrl){
        detectImage()
      }
    } else {
      setImageUrl(null);
    }
  };

  const uploadTrigger = () => {
    fileInputRef.current.click();
  };

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
      console.log("Model Loaded")
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    loadModel();

  }, []);

  if (isModelLoading) {
    return <h2 style={{ textAlign: "center" }}>Initializing</h2>;
  }

  const detectImage = async () => {
    try{
      const results = await model.classify(imageRef.current);
    setResults(results);
    console.log("results set")
    }
    catch(err){
      console.log("not classified  : "+err.message)
    }
  };

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
          style={{display:'none'}}
        />
        <button className="uploadImage" onClick={uploadTrigger}>
          Upload Image
        </button>
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
                style={{display:'none'}}
              />
            )}
          </div>
          {results.length > 0 ? (
            <h1 className="imageResult">
              {results.map((result, index) => {
                return (
                  <div className="result" key={result.className}>
                    <span className="accuracy">
                      {index === 0 && (
                        <span className="bestGuess"><span className="name">{result.className}</span>Best Guess</span>
                      )}
                    </span>
                  </div>
                );
              })
              }
            </h1>
          )
          :
          <h1>nOT DETENSJHSkjdh</h1>}
        </div>
      </div>
    </div>
  );
}

export default App;