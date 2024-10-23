import React, { useRef, useState } from 'react';
import './quiz.css';
import { data } from "../Assets/data";

function Quiz() {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let optArray = [option1, option2, option3, option4];

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                optArray[question.ans - 1].current.classList.add("correct");
            }
        }
    };

    const nextBtn = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                return;
            }
            setIndex(prevIndex => prevIndex + 1); // Correctly increment index
            setQuestion(data[index + 1]); // Update question to next one
            setLock(false);
            optArray.forEach(option => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
            });
        }
    };

    const resetQuiz = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
    };

    return (
        <div className='container'>
            <h1>Quiz app</h1>
            <hr />
            {result ? (
                <>
                    <h3>You Scored {score} out of {data.length}</h3>
                    <button onClick={resetQuiz}>Reset</button>
                </>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option2}</li>
                        <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option1}</li>
                        <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <p>{index + 1} of {data.length} questions</p>
                    <button onClick={nextBtn}>Next</button>
                </>
            )}
        </div>
    );
}

export default Quiz;