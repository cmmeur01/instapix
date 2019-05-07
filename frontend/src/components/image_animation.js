import React from "react";

const IMAGES = [
  "https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg",
  "https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg",
  "https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg"
];

class ImageAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0,
      fadeIn: true
    };
    this.animateImages = this.animateImages.bind(this);
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ fadeIn: false });
    }, 4500);
    this.animateImages();
  }

  componentWillUnmount() {
    clearInterval(this.imageInterval);
    clearTimeout(this.timeout);
  }

  animateImages() {
    this.imageInterval = setInterval(() => {
      const imageIndex = (this.state.imageIndex + 1) % IMAGES.length;

      this.setState({ imageIndex, fadeIn: true });

      this.timeout = setTimeout(() => {
        this.setState({ fadeIn: false });
      }, 4500);
    }, 2000);
  }

  render() {
    const { fadeIn, imageIndex } = this.state;
    const image = IMAGES[imageIndex];
    return (
      <div className="image-div">
        <img
          className={fadeIn ? "image-fade-in" : "image-fade-out"}
          src={image}
          alt="instagram-pic"
        />
      </div>
    );
  }
}

export default ImageAnimation;