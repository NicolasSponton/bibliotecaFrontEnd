import React from "react";
import ReactApexChart from "react-apexcharts";

class Donut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 41, 17, 15],
      options: {
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
        chart: { type: 'donut', },
        legend: { show: false },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name:{
                  show:true
                },
                total:{
                  show:true
                }
              }
            }
          }
        }
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
      </div>
    );
  }
}


export default Donut