import React from "react";
import ImageUploading from "react-images-uploading";

const UploadImage = (props) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
    props.dataFromImageComponent(imageList[0].data_url)
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="container">
            <button
              className="btn btn-primary"
              onClick={onImageUpload}
              {...dragProps}
            >
              Selecciona o arrastra tu imagen aca
            </button>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="container">
                <div className="row mt-2">
                  <img
                    src={image.data_url}
                    alt=""
                    width="500vw"
                    className="rounded mx-auto d-block"
                  />
                </div>
                <div className="row mt-2">
                  <button onClick={() => onImageUpdate(index)} className="col btn btn-success">
                    Seleccionar
                  </button>
                  <button onClick={() => onImageRemove(index)} className="col btn btn-danger">
                    Elegir otra
                  </button>
                </div>
                
                  
                
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default UploadImage;
