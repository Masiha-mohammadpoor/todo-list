import TodoForm from "../TodoForm/TodoForm";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from "../Navbar/Navbar";
import TodoList from "../TodoList/TodoList";
import TodoNumber from "../TodoNumber/TododNumber";
import swal from "sweetalert";
import FilterTodos from "../FilterTodos/FilterTodos";
import TodoCharts from "../TodoCharts/TodoCharts";
import Confetti from 'react-confetti';


const TodoApp = () => {

    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [filterByCategory, setFilterByCategory] = useState([]);
    const [filterDoneValue, setFilterDoneValue] = useState("All");
    const [category, setCategory] = useState("All");
    const [options, setOptions] = useState([
        { value: "no category", label: "no category" },
        { value: "add category", label: "add category ?" },
        { value: "sport", label: "sport" },
        { value: "job", label: "job" }
    ]);


    useEffect(() => {
        filterTodosByDone(filterDoneValue);
    }, [todos, filterDoneValue]);

    useEffect(() => {
        filterTodosCategory(category);
    }, [filteredTodos, category]);

    //! saved todos
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos"));
        if(savedTodos) setTodos(savedTodos);
    } , []);

    useEffect(() => {
        localStorage.setItem("todos" , JSON.stringify(todos));
    } , [todos]);


    //! saved category
    useEffect(() => {
        const savedCategory = JSON.parse(localStorage.getItem("category"));
        if(savedCategory) setOptions(savedCategory);
    } , [])

    useEffect(() => {
        localStorage.setItem("category" , JSON.stringify(options));
    } , [options]);



    const addTodo = (input) => {
        const newTodo = {
            id: uuidv4(),
            text: input.value,
            isComplete: false,
            category: input.select.value,
            date: input.date.toString()
        }

        setTodos([...todos, newTodo]);
    }

    const editTodo = (id, e) => {
        const index = todos.findIndex(t => t.id === id);
        const todo = { ...todos[index] };
        const alltodos = [...todos];
        swal("Please enter the new value", {
            content: {
                element: "input",
                attributes: {
                    value: e
                }
            },
        })
            .then((value) => {
                if (value !== "") {
                    todo.text = value;
                    alltodos[index] = todo;
                    setTodos(alltodos);
                    swal("updated", "The todo was updated", "success");
                } else {
                    swal("ooops!", "please input something", "warning");
                }
            });
    }

    const deleteTodo = id => {
        const filteredTodos = todos.filter(t => t.id !== id);
        setTodos(filteredTodos);
    }

    const endTodos = () => {
        if(todos.length >= 1 && todos.filter(t => t.isComplete === false).length === 0){
            return <Confetti
            width={window.innerWidth}
            height={document.body.offsetHeight}
            numberOfPieces={500}
            recycle={false}
            />    
        }else{
            return "";
        }
    }

    const completeTodo = (id, e) => {
        const index = todos.findIndex(t => t.id === id);
        const todo = { ...todos[index] };
        todo.isComplete = e.target.checked;
        const alltodos = [...todos];
        alltodos[index] = todo;
        setTodos(alltodos);
    }

    const filterTodosByDone = (e) => {
        switch (e) {
            case "completed": {

                return setFilteredTodos(todos.filter(todo => todo.isComplete === true));
            }
            case "unCompleted": {
                return setFilteredTodos(todos.filter(todo => todo.isComplete === false));
            }
            default: {
                return setFilteredTodos(todos);
            }
        }
    }

    const filterTodosCategory = (e) => {
        switch (e) {
            case "All":
                return setFilterByCategory(filteredTodos);
            default:
                const filteredTodosByCatrgory = filteredTodos.filter(todo => todo.category === e);

                return setFilterByCategory(filteredTodosByCatrgory);
        }
    }

    const selectDoneHandler = (e) => {
        setFilterDoneValue(e.value);
        filterTodosByDone(e.value);
    }

    const selectCategoryHandler = (e) => {
        setCategory(e.value);
        filterTodosByDone(filterDoneValue);
        filterTodosCategory(e.value);
    }



    return (
        <>
            {endTodos()}
            <Navbar todoLength={todos.filter(todo => todo.isComplete === false).length} />
            <TodoForm submitTodo={addTodo} options={options} setOptions={setOptions} />
            <FilterTodos
                doneStatus={{ value: filterDoneValue, label: filterDoneValue }}
                onSelectDoneFilter={selectDoneHandler}
                categoryOptions={[{ value: "All", label: "All" }, options[0], ...options.slice(2)]}
                categoryStatus={{ value: category, label: category }}
                onSelectCategory={selectCategoryHandler} />
            <TodoList
                todos={filterByCategory}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo} />
            <TodoNumber
                todos={todos.length}
                completed={todos.filter(t => t.isComplete === true).length}
                unCompleted={todos.filter(t => t.isComplete === false).length}
            />
            <TodoCharts allCategories={[...todos.map(t => t.category)]} todos={todos}/>
        </>
    );
}

export default TodoApp;