import React from 'react';
import Cropper from 'cropperjs';
import axios from "axios";
import { connect } from 'react-redux';
import { sendPost } from './../../actions/post_actions';


class UploadComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      description: '',
      likes: []
    };
    // let cropper;
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state.user = this.props.currentUserId();
  }

  handleSubmit(e) {
    e.preventDefault();
    let that = this;
    this.cropper.getCroppedCanvas({

    }).toBlob(function (blob) {
      const formData = new FormData();
      formData.append('image', blob);

      axios.post("/api/users/images/upload", formData)
        .then((url) => that.props.sendPost({ imgUrl: url.data.imageUrl, likes: [], user: that.state.user, description: that.state.description }))
        .then((id) => that.props.history.push(`/posts/${id}`));
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
      let submit = document.getElementById('post-caption');
      submit.classList.add("new-post-caption");
      submit.classList.remove("post-caption-hidden");
    }
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {

    return (
      <div className="new-post-container">
        <div className="new-post-title">
          Choose a picture, add a description, and share!
        </div>
        <form className="new-post-form" onSubmit={this.handleSubmit}>
          <div><input type="file" onChange={this.handleFile} /></div>
          <div className="post-caption-hidden" id="post-caption">
            <div className="new-post-desc"><input type="text" placeholder="Write a caption" onChange={this.update("description")} /></div>
            <div><button type="submit" className="shr-btn">Share</button></div>
          </div>
          <img className="img-upload" id="img-upload" src="" alt="" />
        </form>
      </div>
    );
  }

}


const msp = (state, ownProps) => ({
  currentUserId: () => state.session.user.id
});

const mdp = dispatch => ({
  sendPost: (post) => dispatch(sendPost(post))
});

export default connect(msp, mdp)(UploadComponent);

