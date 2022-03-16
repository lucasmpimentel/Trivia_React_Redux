import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* import { getQuestionsAPI } from '../redux/actions/fetch'; */
import { changeScore } from '../redux/actions';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Dashboard extends Component {
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(changeScore({ score: 1 }));
  }

  render() {
    const { handleClick } = this;
    return (
      <main>
        <Header />
        <Questions />
        <button type="button" onClick={ handleClick }>TESTE ACTION SCORE</button>
      </main>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Dashboard);
