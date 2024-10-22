import React, { useState } from 'react';
import './quiz.css'
import { data } from "../Assets/data";


function Quiz() {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);

    const nextBtn = () => {
        setIndex(index + 1)
    }
    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
            }
        }
    }
    return <>
        <div className='container'>
            <h1>Quiz app</h1>
            <hr />
            <h3>{index + 1}.{question.question}</h3>
            <ul>
                <li onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                <li onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                <li onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                <li onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
            </ul>
            <button onClick={nextBtn}>Next</button>
            <p>1 of 5 questions</p>
        </div>

    </>
}

export default Quiz