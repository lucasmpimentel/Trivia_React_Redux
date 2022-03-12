import React, { Component } from 'react';
import { refreshTokenAPI } from '../redux/actions/fetch';

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

  render() {
    const { handleClick } = this;
    const { questions } = this.state;
    return (
      <section>
        <div className="card-question-container">
          { questions.map((item, index) => (
            <p key={ index }>
              pergunta
            </p>
          ))}
        </div>
        <button type="button" data-testid="btn-next" onClick={ handleClick }>
          Next
        </button>
      </section>
    );
  }
}
