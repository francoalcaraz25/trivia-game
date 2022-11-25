import './Main.css';
import correctIcon from '../../images/correct-icon.png';
import wrongIcon from '../../images/wrong-icon.png';
import { useState, useEffect, useRef } from 'react';

function Main({ question, answerQuestion, questionPoints }) {

  //==DATA=====

  const {
    questionPrompt,
    type,
    correct_answer,
    incorrect_answers
  } = question;

  const [ answerSubmitted, setAnswerSubmitted ] = useState(() => (
    {
      status: "",
      index: -1
    }
  ));

  const resultsMessage = useRef("");
  const resultsPoints = useRef("");

  //==SETUP======

  //--Fisher-Yates Shuffle Algorithm used to mix the pool of answers
  //--(from https://bost.ocks.org/mike/shuffle)
  const shuffle = array => {
    let m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  //--Correct and incorrect answers mixed together
  const [ mixedAnswers, setMixedAnswers] = useState(() =>
    shuffle([correct_answer, ...incorrect_answers])
  );


   //--When the current question is changed, reset data
   useEffect(() => {
    setAnswerSubmitted({
      status: "",
      index: -1
    })
    resultsMessage.current = "";
    resultsPoints.current = "";

    setMixedAnswers(() => shuffle([correct_answer, ...incorrect_answers]))
  }, [question]);


  //==ACTIONS======


  //--Answer option button is clicked
  const selectAnswer = (answer, index) => {
    //--Answer is Submitted flag check
    if (answerSubmitted.status) return null;

    const text = answer.innerHTML;

    //--Set Results Message
    let status = "wrong";
    let points = 0;

    if (correct_answer === text ) {
      status = "correct";
      points = questionPoints;
    }

    resultsMessage.current = `${status.toLocaleUpperCase()}!`;
    resultsPoints.current = `${points > 0 ? '+' : ''}${points} pts`;

    setAnswerSubmitted({
      status: status,
      index: index
    });

    answerQuestion(status);
  }

  return (
    <main className="Main">
      <h4 className='question-prompt'>{questionPrompt}</h4>
      <div className={
        `answers-container ${type === 'boolean' ? 'true-false' : ''}`
      }>
        {mixedAnswers.map((answer, index) => 
          <h5
            className={`btn answer
              ${answerSubmitted.status ? 'no-hover' : ""}
              ${answerSubmitted.index === index ? answerSubmitted.status : " "}`}
            key={index}
            onClick={ev => selectAnswer(ev.target, index)}
          >
            {answer}
          </h5>
        )}
      </div>
      <div className='results'>
        <h3 className={`results-message ${answerSubmitted.status}`}>
          {resultsMessage.current}
        </h3>
        {answerSubmitted.status === 'correct'
          ? <img className='results-icon' src={correctIcon}/> : null
        }
        {answerSubmitted.status === 'wrong'
          ? <img className='results-icon' src={wrongIcon}/> : null
        }
        <p className='results-points'>{resultsPoints.current}</p>
      </div>
    </main>
  )
}

export default Main;