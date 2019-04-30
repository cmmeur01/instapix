import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './../../assets/stylesheets/login.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/tweets');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(user); 
  }

  renderErrors() {
    return(
      <ul className="list-errors">
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
      <div className="login-form-div">
        <div className='login-form-container'>
          <div className="login-form-sec">
            <div className='login-form-header'>
              <span className='app-title'><h1>Instapix</h1></span>
            </div>
            <form onSubmit={this.handleSubmit} className='login-form'>
              <div className='login-form-inputs'>
                
                <div className="input-div">
                  <input type="text"
                   className="form-input"
                    value={this.state.username}
                    onChange={this.update('username')}
                    placeholder="Username"
                  />
                </div>
                <div className="input-div"> 
                  <input type="password"
                   className="form-input"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Password"
                  />
                </div>
               
                <div className="login-btn-div">
                  <input className="login-btn" type="submit" value="Log In" />
                  {this.renderErrors()}
                  <div className="separator">
                    <div className="border-line" />
                    <div className="or">or</div>
                    <div className="border-line" />
                  </div>
                </div>
              </div>
            
            
            </form>
              <div className='login-btn-div'>
                
                <button className="login-btn" onClick={this.props.demoLogin}>Log in as Demo User</button>
              </div>
          </div>

          <div className="signup-div">
            <p className="signup-p">
              Don't have an account? <Link to='/signup'>Sign up</Link>
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

        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);