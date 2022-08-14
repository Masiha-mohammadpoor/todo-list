import styles from "./navbar.module.scss";
import { FaGithub, FaSun, FaMoon } from "react-icons/fa";
import { useState } from "react";
import Badge from '@uiw/react-badge';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


const Navbar = ({ todoLength }) => {

    const [darkTheme, setDarkThmem] = useState(false);

    const darkModeHandler = () => {
        document.body.classList.toggle("darkmode");

        if(document.body.classList.contains("darkmode") === false){
            setDarkThmem(false)
        }else{
            setDarkThmem(true);
        }
    }

    return (
        <nav className={styles.nav}>
            <Tippy content={darkTheme ? "light" : "dark"}>
            <button className={styles.switch} onClick={darkModeHandler}>
                {darkTheme ? <FaSun /> : <FaMoon />}
            </button>
            </Tippy>
                <Badge count={todoLength} style={{marginLeft:"130px" , backgroundColor:"#3c6cf2"}}>
                <h1 className={styles.title}>Todo-List</h1>
                </Badge>
                <Tippy content="Github" placement="bottom">
                <a href="https://github.com/Masiha-mohammadpoor/todo-list.git" className={styles.github} target="_blank"><FaGithub /></a>
                </Tippy>
        </nav>
    );
}

export default Navbar;