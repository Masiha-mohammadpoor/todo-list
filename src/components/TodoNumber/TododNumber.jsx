import styles from "./todoNumber.module.scss";


const TodoNumber = ({todos , completed , unCompleted}) => {
    return (  
        <section className={styles.todoNumber}>
        <article >
            <p>All</p>
            <h1>{todos}</h1>
        </article>
        <article>
            <p>done</p>
            <h1>{completed}</h1>
        </article>
        <article>
            <p>undone</p>
            <h1>{unCompleted}</h1>
        </article>
        </section>
    );
}
 
export default TodoNumber;