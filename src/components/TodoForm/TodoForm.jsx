import Select from "react-select";
import styles from "./todoForm.module.scss";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import { useState, useRef } from "react";
import swal from 'sweetalert';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';



const TodoForm = ({ submitTodo, options, setOptions }) => {

    const calendar = useRef();

    const [value, setValue] = useState("");

    const [select, setSelect] = useState({ value: "no category", label: "no category" });

    const [date, setDate] = useState(new Date());

    const submitHandler = (e) => {
        e.preventDefault();

        if (value === "") {
            swal({
                text: "please input something",
                icon: "warning",
            });
        } else {
            submitTodo({ value, select, date });
            setValue("");
            setSelect({ value: "no category", label: "no category" });
            setDate(new Date());
        }
    }

    const changeHandler = (e) => {
        setValue(e.target.value);
    }

    const selectHandler = (e) => {
        if (e.value === "add category") {
            swal({
                title: "enter category name:",
                closeOnClickOutside: false,
                content: {
                    element: "input",
                }
            }).then(value => {
                if (value === "") {
                    swal("", "please input something", "warning");
                } else {
                    setOptions([...options, { value, label: value }]);
                    setSelect({ value: value, label: value });
                    swal("", "category added", "success");
                }
            })
        } else {
            setSelect(e)
        }
    }

    const dateHandler = (e) => {
        setDate(e)
    }

    const showCalendar = () => {
        if (calendar.current.style.display === "none") {
            calendar.current.style.display = "flex";
        }
        else {
            calendar.current.style.display = "none";
        }
    }


    return (
        <>
            <section className={styles.formContainer}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="input Todo..."
                        onChange={changeHandler}
                        value={value}
                    />
                    <div className={styles.categoryAndDate}>
                        <Select
                            className={styles.select}
                            options={options}
                            onChange={selectHandler}
                            value={select}
                        />
                        <Tippy content="calendar" placement="bottom">
                            <div className={styles.calendar}><FaCalendarAlt onClick={showCalendar} />
                                <div className={styles.calenderContainer} ref={calendar}>
                                    <h3 style={{ color: "#3c6cf2" }}>Set a date to do the job</h3>
                                    <Calendar onChange={dateHandler} value={date} className={styles.calender} />
                                    <button type="button" className={styles.okDate} onClick={() => calendar.current.style.display = "none"}>Ok</button>
                                </div>
                            </div>
                        </Tippy>
                    </div>
                    <button type="submit" className={styles.btn}>add</button>                
                </form>

            </section>
        </>

    );
}

export default TodoForm;
//<FaPlus style={{ marginRight: "10px" }} />