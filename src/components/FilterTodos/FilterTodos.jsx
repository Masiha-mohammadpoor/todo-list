import Select from "react-select";
import styles from "./filterTodos.module.scss";
import {useState} from "react";

const FilterTodos = (props) => {

    const {doneStatus , onSelectDoneFilter , categoryOptions , categoryStatus , onSelectCategory} = props;
    const FilterByDone = [
        {value : "All" , label : "All"},
        {value : "completed" , label : "done"},
        {value : "unCompleted" , label : "undone"}
    ];

    return ( 
        <section className={styles.filtersContainer}>
            <article>
                <h3>filter by Done:</h3>
                <Select
                className={styles.select}
                options={FilterByDone} 
                value={doneStatus}
                onChange={onSelectDoneFilter}/>
            </article>
            <article>
                <h3>filter by category:</h3>
                <Select 
                className={styles.select}
                options={categoryOptions}
                value={categoryStatus}
                onChange={onSelectCategory}
                />
            </article>
        </section>
     );
}
 
export default FilterTodos;