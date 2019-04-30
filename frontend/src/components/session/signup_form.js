import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      username: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/');
    }

    // this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      username: this.state.username
    };
    this.props.signup(user, this.props.history); 
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.demoLogin();
  }

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <div className="form-section">
          <h1 className="header-logo">Instapix</h1>

          <div className="form-content">
              <h2 className="form-h2">
                Sign up to see photos and videos from your friends.
              </h2>
              <div className="fb-section">
                <button className="fb-btn" onClick={this.demoLogin}>
                  Sign in as demo user
                </button>
              </div>
              <div className="separator">
                <div className="border-line" />
                <div className="or">or</div>
                <div className="border-line" />
              </div>
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="login-form">
                <div className="input-div">
                  <input
                    className="form-input"
                    type="text"
                    value={this.state.email}
                    onChange={this.update("email")}
                    placeholder="Email"
                  />
                </div>
                <div className="input-div">
                  <input
                    className="form-input"
                    type="text"
                    value={this.state.name}
                    onChange={this.update("name")}
                    placeholder="Full Name"
                  />
                </div>
                <div className="input-div">
                  <input
                    className="form-input"
                    type="text"
                    value={this.state.username}
                    onChange={this.update("username")}
                    placeholder="Username"
                  />
                </div>
                <div className="input-div">
                  <input
                    className="form-input"
                    type="password"
                    value={this.state.password}
                    onChange={this.update("password")}
                    placeholder="Password"
                  />
                </div>
                <div className="signup-btn-div">
                  <button className="signup-btn" type="submit">
                    Sign up
                  </button>
                </div>
                <div className="errors">{this.renderErrors()}</div>
              </div>
            </form>
          </div>
        </div>
        <div className="login-section">
          <p>
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
        <div className="app-section">
          <p className="app-p">Get the app.</p>
          <div className="apps">
            <a className="z1VUo" href="https://www.apple.com/itunes">
              <img
                alt="Available on the App Store"
                className="Rt8TI"
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
              />
            </a>
            <a className="z1VUo" href="https://play.google.com/store">
              <img
                alt="Available on Google Play"
                className="Rt8TI"
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
              />
            </a>
          </div>
        </div>
    </div> )
  }
}

export default withRouter(SignupForm);