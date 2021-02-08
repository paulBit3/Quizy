import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
      //initial list of questions
      this.state = {
        score: 0,
        questions: [
          {
            QS:"What animal barks?",
            PossibleAnswers: ["Dog", "Cat"],
            correctAnswer: "Dog",
            pChoice: null
          },
          {
            QS:"Which of the following cellular device company is NOT headquartered in China?",
            PossibleAnswers: ["Nokia", "Samsung"],
            correctAnswer: "Nokia",
            pChoice: null
          },
          {
            QS:"Who was the longest-serving Senator in US history, serving from 1959 to 2010?",
            PossibleAnswers: ["Joe Biden", "Rober Byrd"],
            correctAnswer: "Rober Byrd",
            pChoice: null
          },
          {
            QS:"Who is the 46th President of the United State?",
            PossibleAnswers: ["Bill Clinton", "Joe Biden"],
            correctAnswer: "Joe Biden",
            pChoice: null
          },
          {
            QS:"Who is the capital of France?",
            PossibleAnswers: ["Dublin", "Paris"],
            correctAnswer: "Paris",
            pChoice: null
          },
        ],
      };
  }


  /* function to display answers. This function, if the player has not answer yet, it will display nothing.
  if the answer is correct, it will display the correct answer, otherwise it will display the wrong answer. */
  displayAnswers(index) {
    const question = this.state.questions[index];
    //adding a guard clause to avoid unnecessary work
    if (!question.pChoice) { return; }
    if (question.pChoice === question.correctAnswer) {
      return (
        <p className="correct-answer">
          Your answer is correct!
        </p>
      );
    } else {
      return (
        <p className="wrong-answer">
          Your answer is incorrect!
        </p>
      );
    }
  }



  //function to display the questions to the user
  displayQuestion(index) {
    //If the player score is less than the index, return nothing
    // if (!this.state.score < index) { return; }
    const question = this.state.questions[index];
    return (
      
      <div className="question-display" key={`q-${index}`}>{/*  Fixing this Warning error message: Each child in a list should have a unique "key" prop. */}
        <p className="question-text">
          {question.QS}
        </p>
        <br/>
        
        <button className="question-choice" onClick ={() =>
        this.answerQuestion(index, question.PossibleAnswers[0])}>
          {question.PossibleAnswers[0]}
        </button>
        <button className="question-choice" onClick ={() =>
        this.answerQuestion(index, question.PossibleAnswers[1])}>
          {question.PossibleAnswers[1]}
        </button>
        <br/>
        {this.displayAnswers(index)}
      </div>
    );
  }


  //function to answer each question. it has the answer chosen and an question index as arguments
  answerQuestion(index, choice) {
    const answer = this.state.questions[index];
    answer.pChoice = choice;
    const allQuestions = this.state.questions;
    allQuestions[index] = answer;
    this.setState({
      questions: allQuestions
    }, () => {
      this.updateScore();
    });
  }

  /* function to recalculate player's score per question. This function will 
  filter the lif of questions down to the question that answered correctly
  and will assign a point for each */
  updateScore() {
    const playerScore = this.state.questions.filter(
      q => q.correctAnswer === q.pChoice).length;
      this.setState({ playerScore });
      console.log("New score:", playerScore);
  }

  //function to render questions. This function render the questions from a list instead of adding each question
  renderQuestions() {
    return this.state.questions.map((question, index) => 
    this.displayQuestion(index)
    );
  }



  render() {
    return (
      <div className="App">
        <h1>Welcome to Quizy</h1>
        <br/>
        <small>Improve your personal growth</small>
        <hr/>
        {/* {this.displayQuestion(0)}
        {this.displayQuestion(1)}
        {this.displayQuestion(2)}
        {this.displayQuestion(3)} */}
        {/* make it simple by calling our render function. */}
        {this.renderQuestions()}
      </div>
    );
  }
}

export default App;
