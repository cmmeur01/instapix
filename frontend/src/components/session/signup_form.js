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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
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
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      username: this.state.username
    };

    this.props.signup(user, this.props.history); 
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
        <div className='signup-form-header'>
          <span className='app-title'><h1>Instapix</h1></span>
          <span><h3>Sign up to see photos and videos from your friends.</h3></span>
          <button onClick={this.props.demoLogin}>Log in as Demo User</button>
          <span className='form-or'>OR</span>
        </div>
        <form onSubmit={this.handleSubmit} className='signup-form'>
          <div className="signup-form-inputs">
            <br/>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
            <br/>
              <input type="text"
                value={this.state.name}
                onChange={this.update('name')}
                placeholder="Full Name"
              />
            <br/>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username"
              />
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
            <br/>
            <input type="submit" value="Sign up" />
            {this.renderErrors()}
          </div>
        </form>
        <div className='signup-form-footer'>
          <h4>
            Have an account? <Link to='/login'>Log in</Link>
          </h4>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);