import React from "react";
import Cropper from "cropperjs";
import axios from "axios";
import { connect } from "react-redux";
import { editProfile } from "./../../actions/user_actions";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFile(e) {
    let preview = document.getElementById("profile-img-upload");
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
        viewMode: 2
      });
    };
    if (file) {
      reader.readAsDataURL(file);
      // let submit = document.getElementById('post-caption');
      // submit.classList.add("new-post-caption");
      // submit.classList.remove("post-caption-hidden");
      // let upload = document.getElementById("dropzone-section");
      // upload.classList.remove("dropzone-section");
      // upload.classList.add("dropzone-section-hidden");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let that = this;
    this.cropper.getCroppedCanvas({

    }).toBlob(function (blob) {
      const formData = new FormData();
      formData.append('image', blob);

      axios.post("/api/users/images/upload", formData)
        .then((url) => that.props.editProfile(url.data.imageUrl, that.props.currentUserId))
        .then((user) => that.props.history.push(`/users/${user.username}`));
    });
  }

  render() {
    return <div>hello</div>;
  }
}


const msp = (state, ownProps) => ({
  currentUserId: () => state.session.user.id
});

const mdp = dispatch => ({
  editProfile: (image_url, user) => dispatch(editProfile(image_url, user))
});

export default connect(msp, mdp)(EditProfile);