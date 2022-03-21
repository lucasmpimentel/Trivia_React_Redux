import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItem } from '../services/syncLocal';
/* import Header from '../components/Header'; */
import '../styles/Ranking.css';

class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const getRankingJSON = getItem('ranking');
    const rankingStorage = JSON.parse(getRankingJSON);
    const sortedRanking = rankingStorage.sort((a, b) => b.score - a.score);
    this.setState({ ranking: sortedRanking });
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <main className="ranking-container">
        <header className="ranking-header">
          <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
        </header>
        <section className="ranking-table-container">
          { ranking.map((player, index) => (
            <div className="ranking-line" key={ index }>
              <img src={ `https://www.gravatar.com/avatar/${player.picture}` } alt="Player Avatar" />
              <h3 className="ranking-table-text" data-testid={ `player-name-${index}` }>{ player.name }</h3>
              <h4 className="ranking-table-text">
                {'Score: '}
                <span data-testid={ `player-score-${index}` }>{ player.score }</span>
              </h4>
            </div>
          )) }
        </section>
        <button
          className="exit-btn"
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Sair
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
