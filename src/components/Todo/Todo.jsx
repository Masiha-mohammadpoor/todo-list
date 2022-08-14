import { FaEdit, FaTrashAlt } from "react-icons/fa";
import styles from "./todo.module.scss";
import Moment from 'react-moment';
import React, { useState, useRef } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Todo = ({ text, date, isCompleted, category, onEdit, onDelete, onComplete }) => {

    const [workTime, setWorkTime] = useState(false);
    const deleteBtn = useRef(null);


    const time = new Date(date);
    const nowTime = new Date();


    (() => {
        let currenTime;
        const savedTime = new Date(time.toLocaleDateString());
        return setInterval(() => {
            currenTime = new Date(nowTime.toLocaleDateString());
            if (currenTime > savedTime) {
                setWorkTime(true)
            } else {
                setWorkTime(false)
            }
        }, 1000)
    })();


    return (
        <article className={styles.todo}>
            <div className={styles.todoName}>
                <Tippy content={text.length >= 15 ? text : null} placement="bottom" disabled={text.length >= 15 ? false : true}>
                <p className={isCompleted ? styles.completeTodo : ""}>
                    {text.length > 14 ? text.slice(0, 14) + "..." : text}
                </p>
                </Tippy>
                <small className={`${workTime ? styles.passedDate : styles.date} notInvert`}>
                    {time.toLocaleDateString() === nowTime.toLocaleDateString()
                        ?  "today"
                        : <Moment format="YYYY/MM/DD" interval={0}>{date}</Moment>}
                </small>
            </div>
            <Tippy content={category.length > 12 ? category : ""} placement="bottom" disabled={category.length > 12 ? false : true}>
            <div className={category === "add category" || category === "no category" ? "" : styles.category}>
                {category === "add category" || category === "no category" ? "" : category.slice(0, 12) + `${category.length > 12 ? " ..." : ""}`}
            </div>
            </Tippy>
            <div className={styles.options}>
                <button style={{ color: "#4361ee" }} onClick={onEdit} className="notInvert"><FaEdit /></button>
                <button style={{ color: "#d90429" }} ref={deleteBtn} onClick={onDelete} className="notInvert"><FaTrashAlt /></button>
                <Tippy content="The deadline is over" disabled={!workTime} placement="bottom">
                <span>
                    <input type="checkbox" 
                    onChange={onComplete}
                    disabled={workTime ? true : false}
                    checked={isCompleted ? true : false}
                    />
                </span>
                </Tippy>
            </div>
        </article>
    );
}
export default Todo;

