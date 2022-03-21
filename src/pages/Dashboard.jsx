import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsClock } from 'react-icons/bs';
import { changeScore } from '../redux/actions';
import Header from '../components/Header';
import Questions from '../components/Questions';
import '../styles/Dashboard.css';

class Dashboard extends Component {
state = {
  isAnswered: false,
  countDown: 30,
}

// shouldComponentUpdate()  {
// }

componentDidMount() {
  this.setTimer();
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

  restartState = () => {
    this.setState({ isAnswered: false, countDown: 30 });
  }

  render() {
    const { handleAnswerClick, restartState } = this;
    const { countDown, isAnswered } = this.state;
    const { history } = this.props;
    return (
      <main className="main-container">
        <Header />
        <p className="timer">
          {'Tempo restante: '}
          <BsClock />
          {countDown}
        </p>
        <Questions
          historyProp={ history.push }
          countDown={ countDown }
          isAnswered={ isAnswered }
          handleAnswerClick={ handleAnswerClick }
          restartState={ restartState }
        />
      </main>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Dashboard);
