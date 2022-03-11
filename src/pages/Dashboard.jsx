import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeScore } from '../redux/actions';
import Header from '../components/Header';

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
        Olá
        <button type="button" onClick={ handleClick }>TESTE ACTION SCORE</button>
      </main>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Dashboard);
