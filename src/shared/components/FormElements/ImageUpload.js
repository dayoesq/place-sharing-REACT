import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
// Image preview using built-in FileReader from the browser
  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => { 
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickHandler = e => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
    
  };

  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        ref={filePickerRef}
        accept=".jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={pickHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
      <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
    
  );
};


export default ImageUpload;