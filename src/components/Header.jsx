import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getItem from '../services/syncLocal';
import logo from '../trivia.png';
import '../styles/Header.css';

class Header extends Component {
  state = {
    userName: '',
    userEmail: '',
    userScore: 0,
  }

  // Tive problemas ao usar arrow na didmount, por isso mantive nesse padrão.
  componentDidMount() {
    const getPlayerJSON = getItem('player');
    const recoveryPlayer = JSON.parse(getPlayerJSON);
    this.setState({
      userName: recoveryPlayer.name,
      userEmail: recoveryPlayer.gravatarEmail,
    });
  }

  render() {
    const { userNameRedux, userScoreRedux } = this.props;
    const { userEmail, userName, userScore } = this.state;
    return (
      <header className="header-container">
        <div className="profile-container">
          <img
            className="profile-image"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${userEmail}` }
            alt="profile"
          />
          { userNameRedux !== '' ? (
            <h2
              className="player-name"
              data-testid="header-player-name"
            >
              {userNameRedux}
            </h2>
          ) : (
            <h2 className="player-name" data-testid="header-player-name">{userName}</h2>
          )}
        </div>
        <div className="logo-container">
          <img className="trivia-logo" src={ logo } alt="logo" />
        </div>
        <div className="score-container">
          { userScoreRedux ? (
            <h2 data-testid="header-score">{`Placar: ${userScoreRedux}`}</h2>
          ) : (
            <h2 data-testid="header-score">{ `Placar: ${userScore}` }</h2>
          )}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userNameRedux: state.player.name,
  /* userEmailRedux: state.player.gravatarEmail, */
  userScoreRedux: state.player.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  /* userEmailRedux: PropTypes.string.isRequired, */
  userNameRedux: PropTypes.string.isRequired,
  userScoreRedux: PropTypes.number.isRequired,
};
