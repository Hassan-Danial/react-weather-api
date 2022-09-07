import React from "react";
import BarChart from "react-bar-chart";
import './Metrics.css'

function Metrics(props) {
  const metrics_data = props.metrics_data;
  const listGraph = props.listGraph;
  const searchTerm = props.searchTerm;
  const data = [
    { text: "Temp=" + metrics_data[0] + "", value: metrics_data[0] },
    { text: "Pressure=" + metrics_data[2], value: metrics_data[2] },
    { text: "Humidity=" + metrics_data[1], value: metrics_data[1] },
  ];
  return (
    <div>
      {console.log(listGraph)}
      <div style={{ width: "40%" }}>
        <BarChart
          ylabel="Value"
          width={450}
          height={500}
          margin={{ top: 50, right: 20, bottom: 30, left: 50 }}
          data={data}
          style={{ color: "red" }}
        />
        <h3 >{searchTerm}</h3>
      </div>
    </div>
  );
}

export default Metrics;
