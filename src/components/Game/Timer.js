import './Timer.css';

function Timer({ timer, timerStartValue, formatTimer }) {

    const timerPercentage = () => {
        let timePercentage = (timer / timerStartValue) * 100;
        timePercentage = Math.floor(timePercentage);
        return timePercentage;
    }

    return (
        <div className='timer-bar'>
            <div className='timer-progress'
                style={{
                    width: `${timerPercentage()}%`,
                    backgroundColor: (timerPercentage() <= 50 ? (
                        timerPercentage() <= 25 ? 'red' : 'orange'
                    ) : 'blue')
                }}
            ></div>
            <p className='timer'
                style={{
                    color: (timerPercentage() <= 25 ? 'red' : 'black')
                }}
            >{formatTimer(timer)}</p>
        </div>
    )
}

export default Timer;