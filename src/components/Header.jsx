import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { userNameRedux, userScoreRedux, userEmailRedux } = this.props;
    return (
      <header className="header-container">
        <div className="profile-container">
          <img
            className="profile-image"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${userEmailRedux}` }
            alt="profile"
          />
          <h2
            className="names"
            data-testid="header-player-name"
          >
            {userNameRedux}
          </h2>
        </div>
        <div className="logo-container">
          <img className="trivia-logo" src={ logo } alt="logo" />
        </div>
        <div className="score-container">
          <h2 className="names">
            {'Placar: '}
            <span data-testid="header-score">
              {userScoreRedux}
            </span>
          </h2>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userNameRedux: state.player.name,
  userEmailRedux: state.player.gravatarEmail,
  userScoreRedux: state.player.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userEmailRedux: PropTypes.string.isRequired,
  userNameRedux: PropTypes.string.isRequired,
  userScoreRedux: PropTypes.number.isRequired,
};
