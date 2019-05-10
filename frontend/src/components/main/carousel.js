import React from "react";
import Slider from "react-slick";
import { fetchExploreUsers } from './../../actions/user_actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CarouselItem from './carousel-item';
import FollowButton from "../user_profile/follow_button";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.getUsers = this.getUsers.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchExploreUsers()
    .then(() => this.setState({users: this.props.users}));
  }

  getCurrentUser() {
    // let currentUser;

    // this.props.users.forEach(user => {
    //   if (user._id === this.props.currentUser.id) {
    //     currentUser = user;
    //   }
    // });
    debugger;
    return this.props.currentUser;
  }

  getUsers() {
    // if (this.state.users.length === 0) return null;
    const users = this.state.users;
    return users.map((user,i) => {
      if (user._id !== this.props.currentUser._id) {
        return <CarouselItem user={user} key={i}/>
      }
    }
    )}
    // let that = this;

    // let newUsers = users.map((user, i) => {
    //   let popular;
    //   // debugger;
    //   if (user.following.includes(that.props.currentUser._id)) {
    //     popular = <p className="carousel-follows">Follows you</p>;
    //   } else {
    //     popular = <p className="carousel-follows">Popular</p>;
    //   }

    //   return (
    //     <div className="card-info" key={i}>
    //       <div className="d-block">
    //         <div className="caro-card">
    //           <div className="inner-caro-div">
    //             <Link to={`users/${user.username}`}>
    //               <img
    //                 className="carousel-img"
    //                 src={user.image_url}
    //                 alt="user"
    //               />
    //             </Link>
    //           </div>
    //           <div className="carousel-username">
    //             <Link to={`users/${user.username}`}>{user.username}</Link>
    //           </div>
    //           <div className="popular">{popular}</div>
    //           <div className="btn-div carousel-btn">
    //             <FollowButton
    //               currentUser={this.props.currentUser}
    //               owner={user}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });

    // return newUsers;
  

  render() {
    var settings = {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: true
    };

    return (
      <div>
        <Slider {...settings}>{this.getUsers()}</Slider>
      </div>
    );
  }
}

const mstp = state => ({
  users: Object.values(state.entities.users),
  currentUser: state.entities.users[state.session.user.id]
});

const mdtp = dispatch => ({
  fetchExploreUsers: () => dispatch(fetchExploreUsers())
})

export default connect(mstp, mdtp)(Carousel);
