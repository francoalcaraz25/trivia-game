import './ResultsModal.css';

function ResultsModal(props) {
    const {
        category,
        difficulty,
        correctQuestionsNumber,
        totalQuestions,
        totalPoints,
        timer,
        timerStartValue,
        formatTimer,
        startGame,
        setAppSection
    } = props

    //--Selects a message based on percentage of correct answers
    const getResultsMessage = (corrects, total) => {
        const percentage = corrects / total * 100;
        switch (true) {
            case (percentage === 100): return "Perfect!";
            case (percentage >= 80): return "You're great!";
            case (percentage >= 60): return "That was good!";
            case (percentage >= 40): return "Not bad!"
            case (percentage >= 20): return "You can do better!";
            case (percentage >= 0): return "Maybe go back to the basics?";
            default: return "...";
        }
    }

    return (
        <div className="modal ResultsModal">
            {timer > 0
                ? <h3 className='modal-title finished'>Finished!</h3>
                : <h3 className='modal-title timeout'>Time Out!</h3>
            }
            <h4 className='modal-category'>
                {category} / {difficulty}
            </h4>
            <h2 className='modal-message'>{
                getResultsMessage(correctQuestionsNumber, totalQuestions)
            }</h2>
            <div className='modal-info'>
                <h4>Correct Answers</h4>
                <p>{correctQuestionsNumber}/{totalQuestions}</p>
                <h4>Time Elapsed</h4>
                <p>{formatTimer(timerStartValue - timer)}</p>
                <h4>Points Earned</h4>
                <p>{totalPoints} pts</p>
            </div>
            <div className='modal-buttons'>
                <button className='btn goback'
                    onClick={() => setAppSection("menu")}
                >Back to Menu
                </button>
                <button className='btn newgame'
                    onClick={startGame}
                >Play Again
                </button>
            </div>
        </div>
    )
}

export default ResultsModal;