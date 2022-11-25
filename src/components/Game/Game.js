import './Game.css';
import { capitalizeWord } from '../UtiltyFunctions.js';
import Header from './Header.js';
import Main from './Main.js';
import ResultsModal from './ResultsModal.js';
import QuitModal from './QuitModal.js';
import { useState, useEffect, useRef } from 'react';

function Game(props) {
    //--Game Settings Data------------
    const {
        categoryNumber,
        categoryName,
        difficulty,
        totalQuestions,
        setAppSection //--Lets you go back to the Main Menu
    } = props;

    //--Game State Data----------------

    const [ currentQuestionNumber, setCurrentQuestionNumber] = useState(() => 1);
    const [ questions, setQuestions ] = useState(() => []);
    const [ totalPoints, setTotalPoints ] = useState(0);
    const questionPoints = useRef(0);

    const [ timer, setTimer ] = useState(0);
    const timerStartValue = parseInt(totalQuestions) * 12; //12s seconds per question
    const timerInterval = useRef(0);

    const fetchedQuestions = useRef(false);

    const [ gameOn, setGameOn ] = useState(false); //--tracks if game is started or finished
    const [ quitting, setQuitting ] = useState(false); //--check if the game is about to be quited (displays Quit Modal)


    //==Setting Up Game========================

    //--Start Game-------
    const startGame = () => {
        //--Fectch questions from API------------
        if (!fetchedQuestions.current) {
            fetchedQuestions.current = true;
            setQuestions(() => []); //--flush previous game questions
    
            const url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${categoryNumber}&difficulty=${difficulty}`;
            
            
            fetch(url)
                .then(res => res.json())
                .then(apiQuestions => {
                    //--game starts when questions arrive & get processed
                    setQuestions(processQuestions(apiQuestions.results));
                });
        }

        //--Set Correct question points value
        let points = 0;
        switch (difficulty) { //--more points based on difficulty
            case "easy": points = 10; break;
            case "medium": points = 20; break;
            case "hard": points = 30; break;
        }
        questionPoints.current = points;
        setTotalPoints(0); //--reset points counter
    }

    

    //--HTML Parser----
    const parseHTMLEntities = string => {
        const txt = new DOMParser().parseFromString(string, "text/html");
        return txt.documentElement.textContent;
    }

    //--Prepare recieved Questions to start the game
    const processQuestions = questionObject => {
        //--Subset of only the needed Question Object properties
        const processedQuestions = questionObject.map(questionObject => {

            //--parse HTML entities present in given text
            const question = parseHTMLEntities(questionObject.question);

            const { type } = questionObject;            

            const correct_answer = parseHTMLEntities(questionObject.correct_answer);

            const incorrect_answers = questionObject.incorrect_answers
                .map(answer => parseHTMLEntities(answer));


            const postQuestion = {
                questionPrompt: question,
                type: type,
                correct_answer: parseHTMLEntities(correct_answer),
                incorrect_answers: incorrect_answers,
                status: "pending" //--status: pending, current, wrong, correct
            };

            return postQuestion;
        });

        //--Set first question as current one
        processedQuestions[0].status = "current"; //--set first question to current
        setCurrentQuestionNumber(() => 1);

        //--start game & timer
        setGameOn(true);
        startTimer(timerStartValue);

        return processedQuestions;
    }
    
    //--Mounting------------
    useEffect(() => {
        startGame();
        return () => clearInterval(timerInterval.current);
    }, []);

    //--End Game----------
    const endGame = () => {
        fetchedQuestions.current = false;
        setGameOn(false);
        stopTimer();
    }

    //==Utility Functions============================

    //--Start Timer---------------------
    const startTimer = (startValue = 0) => {
        if (startValue > 0) {
            setTimer(startValue);
            timerInterval.current = setInterval(
                () => setTimer(prevTimer => prevTimer - 1
            ), 1000);
        }
    }

    //--Stop Timer--------------------
    const stopTimer = () => {
        clearInterval(timerInterval.current);
        timerInterval.current = 0;
    }

    //--Time Up!--------------
    useEffect(() => {  
        if (timer < 0 && gameOn) {
            setTimer(0); //--set timer back to 0 for GUI consistency
            endGame();
        }
    },[timer]);

    //--Format timer from seconds to minutes/seconds
    const formatTimer = timer => {
        timer = parseInt(timer);
        const minutes = Math.floor(timer / 60);
        const seconds = (timer % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`
    }

    //==Action Functions=============================

    //--Loading the Next Question-------------------------
    const nextQuestion = () => {

        //--Moving to Next Question
        setQuestions(prevQuestions => {            
            if (currentQuestionNumber + 1 <= prevQuestions.length) {
                const index = currentQuestionNumber - 1; //--index value is not the same as questionNum
                prevQuestions[index + 1].status = "current";
                setCurrentQuestionNumber(prevQuestionNumber =>
                    prevQuestionNumber + 1
                );
            } else {
                //--Trigger 'Game Finished' Code
                endGame();
            }
            return [...prevQuestions];
        })

        //--Unpause Timer
        startTimer(timer);
    }

    //--Answering Current Question-----
    const answerQuestion = status => {

        //--Adding Points
        const points = (status === "correct" ? questionPoints.current : 0);
        setTotalPoints(prevTotalPoints => prevTotalPoints + points);

        //--updating questions array
        setQuestions(prevQuestions => {
            prevQuestions[currentQuestionNumber - 1].status = status;
            return [...prevQuestions];   
        })

        //--pause timer
        stopTimer();

        // -set timeout for next question
        setTimeout(nextQuestion, 3000);
    }
    
    return (
        <div className='game-wrapper'>
            <button className='close-button'
                    onClick={() => {setQuitting(true);}}
            >&times;</button>
            { (!gameOn && questions.length <= 0) //--Draw game when it's on and questions arrive
                //--Loding Spinner
                ? <div className='loading'></div>
                : <div className='Game'>
                    <Header
                        category={categoryName}
                        difficulty={capitalizeWord(difficulty)}
                        currentQuestionNumber={currentQuestionNumber}
                        questions={questions}
                        totalPoints={totalPoints}
                        timer={timer}
                        timerStartValue={timerStartValue}
                        formatTimer={formatTimer}
                    />
                    <Main
                        question={questions[currentQuestionNumber - 1]}
                        answerQuestion={answerQuestion}
                        questionPoints={questionPoints.current}
                    />
                    
                    {!gameOn && questions.length > 0
                        ? <ResultsModal
                            category={categoryName}
                            difficulty={capitalizeWord(difficulty)}
                            correctQuestionsNumber={questions
                                .filter(question => question.status === "correct")
                                .length
                            }
                            totalQuestions={totalQuestions}
                            totalPoints={totalPoints}
                            timer={timer}
                            timerStartValue={timerStartValue}
                            formatTimer={formatTimer}
                            startGame={startGame}
                            setAppSection={setAppSection}
                        />
                        : null
                    }

                    {gameOn && quitting
                        ? <QuitModal
                            setQuitting={setQuitting}
                            setAppSection={setAppSection}
                        />
                        : null
                    }
                </div>
            }
        </div>
    )
}

export default Game;