import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeScore } from '../redux/actions';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Dashboard extends Component {
state = {
  isAnswered: false,
  countDown: 30,
}

// shouldComponentUpdate()  {
// }

componentDidMount() {
  const { isAnswered } = this.state;
  this.setTimer();
  console.log(isAnswered.toString());
}

  handleAnswerClick = () => {
    this.setState({ isAnswered: true });
  }

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(changeScore({ score: 1 }));
  }

  setTimer = () => {
    const oneSecond = 1000;
    const timer = setInterval(() => {
      this.setState(({ countDown }) => ({
        countDown: countDown - 1,
      }), () => {
        const { countDown } = this.state;
        if (countDown === 0) {
          clearInterval(timer);
          this.setState({
            isAnswered: true,
          });
        }
      });
    }, oneSecond);
  }

  render() {
    const { handleClick, handleAnswerClick } = this;
    const { countDown, isAnswered } = this.state;
    return (
      <main>
        <Header />
        <p>{countDown}</p>
        <p>{isAnswered.toString()}</p>
        <Questions isAnswered={ isAnswered } handleAnswerClick={ handleAnswerClick } />
        <button type="button" onClick={ handleClick }>TESTE ACTION SCORE</button>
      </main>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Dashboard);
