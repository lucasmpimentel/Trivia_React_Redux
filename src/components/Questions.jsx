import React, { Component } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { connect } from 'react-redux';
import { refreshTokenAPI } from '../redux/actions/fetch';
import { ReactComponent as Loading } from '../image/Eclipse-1s-200px.svg';
import { changeScore } from '../redux/actions';
import '../styles/Questions.css';

class Questions extends Component {
  state = {
    questions: [],
    index: 0,
  }

  async componentDidMount() {
    const getQuestions = await refreshTokenAPI();
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
    })) });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isAnswered } = this.props;
    if (nextProps.isAnswered !== isAnswered || nextState !== this.state) {
      return true;
    }
    return false;
  }

  changeScores = (answer) => {
    const { questions, index } = this.state;
    const { difficulty } = questions[index];
    const { player: {
      score,
      assertions }, dispatch, countDown } = this.props;
    const scoreByDifficulty = { hard: 3, medium: 2, easy: 1 };
    const BASE_PONTUATION = 10;
    let playerScore = 0;
    const assertionsCount = assertions + 1;
    if (answer) {
      playerScore = score + (
        BASE_PONTUATION + (
          countDown * scoreByDifficulty[difficulty]
        ));
      dispatch(changeScore({ score: playerScore, assertions: assertionsCount }));
    }
  }

  handleNextClick = () => {
    const { historyProp, restartState } = this.props;
    const { index } = this.state;
    const INDEX_QUESTIONS_NUMBER = 4;
    if (index < INDEX_QUESTIONS_NUMBER) {
      this.setState({ index: index + 1 });
      restartState();
    } else {
      historyProp('/feedback');
    }
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

  classNameDefinition = (question) => {
    const { isAnswered } = this.props;
    if (!isAnswered) return 'answer-button';
    if (isAnswered && question.isCorrect) return 'answer-button green-border';
    return 'answer-button red-border';
  }

  render() {
    const { isAnswered, handleAnswerClick } = this.props;
    const { handleNextClick, changeScores, randomAnswer, classNameDefinition } = this;
    const { questions, index } = this.state;
    return (
      <section className="questions-container">
        <div className="card-question-container">
          { questions.length === 0 ? <Loading />
            : (
              <section>
                <h4
                  className="question-category"
                  data-testid="question-category"
                >
                  {questions[index].category}
                </h4>
                <p
                  className="question-text"
                  data-testid="question-text"
                >
                  {questions[index].question}
                </p>
                <div className="answer-options" data-testid="answer-options">
                  { randomAnswer(questions[index].allAnswers).map((question, i) => (
                    <button
                      className={ classNameDefinition(question) }
                      key={ i }
                      type="button"
                      disabled={ isAnswered }
                      onClick={ (event) => {
                        handleAnswerClick(event);
                        changeScores(question.isCorrect);
                      } }
                      data-testid={ question
                        .isCorrect ? 'correct-answer' : 'wrong-answer' }
                    >
                      {question.answerText}
                    </button>
                  ))}
                </div>
              </section>
            )}
        </div>

        { isAnswered && (
          <button
            className="next-button"
            type="button"
            data-testid="btn-next"
            onClick={ handleNextClick }
          >
            Next
          </button>
        )}
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
  countDown: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  restartState: PropTypes.func.isRequired,
  player: PropTypes.objectOf(oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  historyProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Questions);
