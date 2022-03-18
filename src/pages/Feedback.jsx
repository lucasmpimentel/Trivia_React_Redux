import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { player: { assertions, score }, history } = this.props;
    const FEEDBACK_NUMBER = 3;
    return (
      <>
        <Header />
        <main>
          { assertions < FEEDBACK_NUMBER
            ? <h1 data-testid="feedback-text">Could be better...</h1>
            : <h1 data-testid="feedback-text">Well Done!</h1> }
          <div>
            <h3 data-testid="feedback-total-score">
              {score}
            </h3>
            <h3 data-testid="feedback-total-question">
              {assertions}
            </h3>
          </div>
          <button
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={ () => history.push('/ranking') }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  player: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
