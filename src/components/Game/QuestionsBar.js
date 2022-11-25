import './QuestionsBar.css'

function QuestionsBar({ questions }) {

    return (
        <div className="QuestionsBar">
            {questions.map((question, index) => 
                <span className={ `question-dot ${question.status}`} key={index}></span>
            )}
        </div>
    )
}

export default QuestionsBar;