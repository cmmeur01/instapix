import React from 'react';
import Cropper from 'cropperjs';
import axios from "axios";
import { connect } from 'react-redux';
import { sendPost } from './../../actions/post_actions';
import Dropzone from "react-dropzone";
import {
  picLoaded,
  picLoading
} from "./../../actions/modal_actions";
import * as progressBar from "./../../assets/images/ajax-loader.gif";


class UploadComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      description: '',
      likes: []
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state.user = this.props.currentUserId();
  }

  handleSubmit(e) {
    e.preventDefault();
    let that = this;
    this.props.picLoading();
    this.cropper.getCroppedCanvas({

    }).toBlob(function (blob) {
      const formData = new FormData();
      formData.append('image', blob);

      axios.post("/api/users/images/upload", formData)
        .then((url) => {
          that.props.sendPost({ imgUrl: url.data.imageUrl, likes: [], user: that.state.user, description: that.state.description })
            .then((id) => {
              that.props.picLoaded();
              that.props.history.push(`/posts/${id}`);
            });
        });
    });

  }

  handleFile(e) {
    let preview = document.getElementById('img-upload');
    const file = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      preview.src = reader.result;
      this.cropper = new Cropper(preview, {
        cropBoxResizable: false,
        dragMode: false,
        toggleDragModeOnDblclick: false,
        data: { width: 1, height: 1 },
        minCropBoxHeight: 614,
        minCropBoxWidth: 614,
        viewMode: 2,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
      let submit = document.getElementById('post-caption');
      submit.classList.add("new-post-caption");
      submit.classList.remove("post-caption-hidden");
      let upload = document.getElementById("dropzone-section");
      upload.classList.remove("dropzone-section");
      upload.classList.add("dropzone-section-hidden");
    }
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    let bar = <img src={progressBar} alt="" />;
    if (this.props.modal.picLoading) {
      return (
        <div className="loading-bar">
          <span>Uploading, please wait</span>
          <div>{bar}</div>
        </div>
      );
    } 
    return (
      <div className="outter-post">
        <div className="new-post-container">
          <form className="new-post-form" onSubmit={this.handleSubmit}>
            <div>
              {/* <input type="file" onChange={this.handleFile} /> */}
              <Dropzone onDrop={this.handleFile}>
                {({ getRootProps, getInputProps }) => (
                  <section
                    className="dropzone-section"
                    id="dropzone-section"
                  >
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      <h1>
                        Drag 'n' drop some files here, or click to
                        select files
                      </h1>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="post-caption-hidden" id="post-caption">
              <div className="new-post-desc">
                <input
                  type="text"
                  placeholder="Write a caption"
                  onChange={this.update("description")}
                />
              </div>
              <div>
                <button type="submit" className="shr-btn">
                  Share
                </button>
              </div>
            </div>
            <img className="img-upload" id="img-upload" src="" alt="" />
          </form>
        </div>
      </div>
    );
  }

}


const msp = (state, ownProps) => ({
  currentUserId: () => state.session.user.id,
  modal: state.ui.modal
});

const mdp = dispatch => ({
  sendPost: (post) => dispatch(sendPost(post)),
  picLoading: () => dispatch(picLoading()),
  picLoaded: () => dispatch(picLoaded())
});

export default connect(msp, mdp)(UploadComponent);

