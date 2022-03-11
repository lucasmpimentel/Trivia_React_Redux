import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getTokenAPI from '../redux/actions/fetch';
import { token } from '../redux/actions';
import logo from '../trivia.png';
// import '../App.css';

class Login extends Component {
  state = {
    buttonDisabled: true,
    userEmail: '',
    userName: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(({ [name]: value }), () => {
      const { userEmail, userName } = this.state;
      const buttonValidate = (userEmail.length > 0 && userName.length > 0);
      this.setState(({ buttonDisabled: !buttonValidate }));
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const tokenUser = await getTokenAPI();
    const saveTokenUser = (item) => localStorage.setItem('token', item);
    saveTokenUser(tokenUser);
    dispatch(token(tokenUser));
    history.push('/dashboard');
  }

  handleClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { handleChange, handleSubmit, handleClick } = this;
    const { buttonDisabled, userEmail, userName } = this.state;
    return (
      <main>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
          </header>
        </div>
        <form className="login-container" onSubmit={ handleSubmit }>
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Nome"
            name="userName"
            value={ userName }
            onChange={ handleChange }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            name="userEmail"
            onChange={ handleChange }
            value={ userEmail }
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ buttonDisabled }
          >
            Play
          </button>
        </form>
        <nav>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ handleClick }
          >
            Configurações
          </button>
        </nav>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
