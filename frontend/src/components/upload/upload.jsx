import React from 'react';
import Cropper from 'cropperjs';
import axios from "axios";

class UploadComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      description: ''
    };
    let cropper;
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let that = this;
    this.cropper.getCroppedCanvas({

    }).toBlob(function (blob) {
      const formData = new FormData();
      formData.append('image', blob);

      axios.post("/api/users/images/upload", formData)
        .then((url) => that.setState({ imageUrl: url.data.imageUrl }))
        .then(() => console.log(that.state));
    });
  }

  handleFile(e) {
    let preview = document.getElementById('img-upload');
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      preview.src = reader.result;
      this.cropper = new Cropper(preview, {
        // aspectRatio: 16/9,
        cropBoxResizable: false,
        dragMode: false,
        toggleDragModeOnDblclick: false,
        data: { width: 600, height: 600 }
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }


  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFile} />
          <button>Submit</button>
        </form>

        <img id="img-upload" src="" alt="" />
      </div>
    );
  }


}

export default UploadComponent;

