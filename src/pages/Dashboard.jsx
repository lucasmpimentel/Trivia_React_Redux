import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  restartState = () => {
    this.setState({ isAnswered: false, countDown: 30 });
  }

  render() {
    const { handleAnswerClick, restartState } = this;
    const { countDown, isAnswered } = this.state;
    return (
      <main className="main-container">
        <Header />
        <p>{`Tempo restante: ${countDown}`}</p>
        <p>{isAnswered.toString()}</p>
        <Questions
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
};

export default connect()(Dashboard);
