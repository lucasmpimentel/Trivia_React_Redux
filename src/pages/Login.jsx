import React, { Component } from 'react';

export default class Login extends Component {
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

  render() {
    const { handleChange } = this;
    const { buttonDisabled, userEmail, userName } = this.state;
    return (
      <main>
        <section className="login-container">
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
        </section>
      </main>
    );
  }
}
