import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import React from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);

export function Graph(props) {

  const chartRef = React.useRef();
  const options = { responsive: true };
  const labels = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: props.data,
        backgroundColor: 'rgba(220, 62, 34, 0.7)',
      },
    ],
  };

  function handleClick(event) {
    const weekDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    const currentIndex = getElementAtEvent(chartRef.current, event)[0]?.index;
    props.setDay(weekDays[currentIndex]);
  }

  return (
    <div className="graph">
      <Bar options={options} data={data} onClick={handleClick} ref={chartRef} />
    </div>
  )
}