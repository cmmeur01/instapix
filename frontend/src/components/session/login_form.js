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
      <div className='login-form-container'>
        <div className='login-form-header'>
          <span className='app-title'><h1>Instapix</h1></span>
        </div>
        <form onSubmit={this.handleSubmit} className='login-form'>
          <div className='login-form-inputs'>
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
            <input type="submit" value="Log In" />
            {this.renderErrors()}
          </div>
        </form>
        <div className='login-form-footer'>
          <span className='form-or'>OR</span>
          <button onClick={this.props.demoLogin}>Log in as Demo User</button>
          <h4>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </h4>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);