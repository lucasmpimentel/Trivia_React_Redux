import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { refreshTokenAPI } from '../redux/actions/fetch';
import { ReactComponent as Loading } from '../image/Eclipse-1s-200px.svg';
import { setItemRanking } from '../services/syncLocal';
import { changeScore } from '../redux/actions';

class Questions extends Component {
  state = {
    questions: [],
    indexQuestions: 0,
    index: 0,
    timer: 30,
  }

  async componentDidMount() {
    const getQuestions = await refreshTokenAPI();
    console.log(getQuestions);
    this.setState({ questions: (getQuestions.map((item) => {
      const allAnswers = [];
      item.incorrect_answers.forEach((wrongAnswer) => {
        allAnswers.push({
          answerText: wrongAnswer,
          isCorrect: false,
        });
      });
      allAnswers.push({
        answerText: item.correct_answer,
        isCorrect: true,
      });
      return ({
        category: item.category,
        question: item.question,
        difficulty: item.difficulty,
        allAnswers,
      });
    })) }, () => {
      const { questions } = this.state;
      const randomized = this.randomAnswer(questions[0].allAnswers);
      console.log(randomized);
    });
  }

  changeScores = (answer) => {
    const { questions, index, timer } = this.state;
    const { difficulty } = questions[index];
    const { player: { name, score, gravatarEmail, assertions }, dispatch } = this.props;
    const scoreByDifficulty = { hard: 3, medium: 2, easy: 1 };
    const pontuation = 10;
    let playerScore = 0;
    const assertionsCount = assertions + 1;
    if (answer) {
      playerScore = score + (pontuation + (timer * scoreByDifficulty[difficulty]));
      const newPlayerScore = { name, score: playerScore, picture: gravatarEmail };
      dispatch(changeScore({ score: playerScore, assertions: assertionsCount }));
      const newPlayerStorage = JSON.stringify(newPlayerScore);
      setItemRanking(newPlayerStorage);
    }
  }

  handleClick = () => {
    const { indexQuestions } = this.state;
    this.setState({ indexQuestions: indexQuestions + 1 });
  };

  randomAnswer = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  render() {
    const { isAnswered, handleAnswerClick } = this.props;
    const { handleClick, randomAnswer, changeScores } = this;
    const { questions, index } = this.state;
    return (
      <section>
        <div className="card-question-container">
          { questions.length === 0 ? <Loading />
            : (
              <section>
                <h4 data-testid="question-category">{questions[index].category}</h4>
                <p data-testid="question-text">{questions[index].question}</p>
                <div data-testid="answer-options">
                  {randomAnswer(questions[index].allAnswers)
                    .map((question, i) => (
                      <button
                        key={ i }
                        type="button"
                        disabled={ isAnswered }
                        onClick={ (e) => {
                          handleAnswerClick(e);
                          changeScores(question.isCorrect);
                        } }
                        data-testid={ question
                          .isCorrect ? 'correct-answer' : 'wrong-answer' }
                      >
                        {question.answerText}
                        {/* isAnswered.toString() */}
                      </button>
                    ))}
                </div>
              </section>
            )}
        </div>

        <button type="button" data-testid="btn-next" onClick={ handleClick }>
          Next
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Questions.propTypes = {
  isAnswered: PropTypes.bool.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default connect(mapStateToProps)(Questions);
