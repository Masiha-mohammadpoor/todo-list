import styles from "./todoCharts.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, getDatasetAtEvent } from 'react-chartjs-2';
import React, { useRef } from "react";



const TodoCharts = ({allCategories , todos }) => {

    const removedDuplicateMember = [...new Set(allCategories)];

    ChartJS.register(ArcElement, Tooltip, Legend);      

    const dataObject = {};
    const colors = [];

    const generateRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
      

    (() => {
        removedDuplicateMember.map(c => {
            return dataObject[c + ` : ${allCategories.filter(t => t === c).length}`] = allCategories.filter(t => t === c).length;
        })

        removedDuplicateMember.map(b => {
            return colors.push(generateRandomColor());
        })
    })();

    const data = {
        labels: [...Object.keys(dataObject)],
        datasets: [
            {
                data: [...Object.values(dataObject)],
                backgroundColor: [...colors],
            },
        ],
    };

    const chart = useRef();



    return (
        <section className={styles.charts} style={{display : todos.length === 0 ? "none" : "flex"}}>            <div className={styles.chartContainer} >
                <h3>Chart by category</h3>
                <Doughnut data={data} ref={chart} className="notInvert"/>
            </div>
        </section>
    );
}

export default TodoCharts;
