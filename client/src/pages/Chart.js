import React,{useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

//제목 옵션
export const options = {
    responsive:true,
    plugins: {
        legend: {
            position: 'top',
        },

        title: {
            display: true,
            text: 'Chart.js Line Chart',
            position: 'top'
    },
    },
};

//x축 이름
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [0,0,0,100,200,0,10000],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export default function Chart(){
    const {news} = useSelector((state)=>state)
    console.log(news)
    // console.log(data)
    ChartJS.register(LineElement, PointElement, LinearScale, Title);
    // const age = useSelector((state)=>state)
    return <Line options={options} data={data} />;
}