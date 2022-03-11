import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import getTokenAPI from '../redux/actions/fetch';
import { token, player } from '../redux/actions';
import logo from '../trivia.png';
import '../styles/Login.css';

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
    const { userEmail, userName } = this.state;
    const { dispatch, history } = this.props;
    const encryptEmail = md5(userEmail).toString();
    const playerState = {
      name: userName,
      gravatarEmail: encryptEmail,
    };
    const playerJSON = JSON.stringify(playerState);
    const tokenUser = await getTokenAPI();
    window.localStorage.setItem('token', tokenUser);
    window.localStorage.setItem('player', playerJSON);
    dispatch(token(tokenUser));
    dispatch(player(playerState));
    history.push('/dashboard');
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { handleChange, handleSubmit, handleClick } = this;
    const { buttonDisabled, userEmail, userName } = this.state;
    return (
      <main className="App">
        <div>
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
          </header>
        </div>
        <form className="login-container" onSubmit={ handleSubmit }>
          <input
            className="input-login"
            type="text"
            data-testid="input-player-name"
            placeholder="Nome"
            name="userName"
            value={ userName }
            onChange={ handleChange }
          />
          <input
            className="input-login"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            name="userEmail"
            onChange={ handleChange }
            value={ userEmail }
          />
          <button
            className="input-login button-login"
            type="submit"
            data-testid="btn-play"
            disabled={ buttonDisabled }
          >
            Play
          </button>
          <button
            className="input-login button-settings"
            type="button"
            data-testid="btn-settings"
            onClick={ handleClick }
          >
            Configurações
          </button>
        </form>
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
