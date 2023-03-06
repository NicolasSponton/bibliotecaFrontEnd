import moment from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
            name: "Libros",
            data: props.seriesData || []
        }],
        // series: [{
        //   name: "Libros",
        //   data: props.seriesData || []
        // }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: { enabled: false }
          },
          dataLabels: { enabled: false },
          stroke: { curve: 'straight' },
          title: { text: 'Libros Prestados Por Mes ' + moment().year(), align: 'left' },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep','Oct','Nov','Dic'], }
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="line"/>
</div>


      );
    }
  }

  export default LineChart