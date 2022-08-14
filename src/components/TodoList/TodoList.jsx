import styles from "./todoList.module.scss";
import Todo from "../Todo/Todo";

const TodoList = ({todos , editTodo , deleteTodo , completeTodo}) => {

    const renderTodos = () => {
        if(todos.length === 0){
            return <div className={styles.nothingTodos}>There Are Nothing Todo</div>
        }else{
            return todos.map(todo => {
                return <Todo 
                key={todo.id}
                text={todo.text} 
                date={todo.date}
                isCompleted={todo.isComplete}
                category={todo.category}
                onEdit={(e) => editTodo(todo.id , todo.text)}
                onDelete={() => deleteTodo(todo.id)}
                onComplete={(e) => completeTodo(todo.id , e)}/>
            })
        }
    }

    return (  
        <section className={styles.todoList}>
            {renderTodos()}
        </section>
    );
}
 
export default TodoList;