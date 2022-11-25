import logo from '../../trivia-logo.png';
import './Header.css';
import QuestionsBar from './QuestionsBar';
import Timer from './Timer';

function Header(props) {
    const {
        category,
        difficulty,
        currentQuestionNumber,
        questions,
        totalPoints,
        timer,
        timerStartValue,
        formatTimer
    } = props;

    //--get Total Number of Questions
    const totalQuestionsNumber = questions.length;

    return (
        <header className='Header'>
            <img className='trivia-logo'
                src={logo} alt='Trivia Game Logo'
            ></img>
            <h1 className='trivia-title'>Trivia Game</h1>
            <h3 className='category'>
                {category} / {difficulty}
            </h3>
            <h4 className='current-question-number'>
                {currentQuestionNumber}/{totalQuestionsNumber}
            </h4>
            <h4 className='total-points'>
                {totalPoints} pts
            </h4>
            <QuestionsBar
                questions={questions}
            />
            <Timer
                timer={timer}
                timerStartValue={timerStartValue}
                formatTimer={formatTimer}
            />
        </header>
    )
}

export default Header;