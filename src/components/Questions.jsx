import React, { Component } from 'react';
import { refreshTokenAPI } from '../redux/actions/fetch';
import { ReactComponent as Loading } from '../image/Eclipse-1s-200px.svg';

export default class Questions extends Component {
  state = {
    questions: [],
    indexQuestions: 0,
  }

  async componentDidMount() {
    const getQuestions = await refreshTokenAPI();
    this.setState({ questions: getQuestions });
  }

  handleClick = () => {
    const { indexQuestions } = this.state;
    this.setState({ indexQuestions: indexQuestions + 1 });
  };

  randomNumber = () => {
    const answersNumber = 5;
    return Math.random() * answersNumber;
  }

  render() {
    const { handleClick } = this;
    const { questions } = this.state;
    console.log(questions);
    return (
      <section>
        <div className="card-question-container">
          { questions.length === 0 ? <Loading />
            : questions.map((item) => {
              /* const { results } = item; */
              const {
                category,
                question,
                correct_answer: correctAnswer,
                incorrect_answers: incorrectAnswers,
              } = item;
              console.log(item);
              const arr = incorrectAnswers.push(correctAnswer);
              console.log(incorrectAnswers);
              console.log(correctAnswer);
              console.log(arr);
              return (
                <section key={ question }>
                  <h4 data-testid="question-category">{category}</h4>
                  <p data-testid="question-text">{question}</p>
                  <div data-testid="answer-options">
                    <button
                      type="button"
                      data-testid="correct-answer"
                    >
                      {correctAnswer}
                    </button>
                    <button
                      type="button"
                      data-testid="wrong-answer"
                    >
                      {incorrectAnswers}
                    </button>
                  </div>
                </section>
              );
            }) }
        </div>

        <button type="button" data-testid="btn-next" onClick={ handleClick }>
          Next
        </button>
      </section>
    );
  }
}
