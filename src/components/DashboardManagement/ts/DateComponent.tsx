import { useState, useEffect } from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { database } from "../../../firebase";
import { ref, child, get } from "firebase/database";
ChartJS.register(
  LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
);

interface Progression {
  id: string;
  Id_Pr: string;
  NameSv_Pr: string;
  DateStart_Pr: string;
  DateEnd_Pr: string;
  Status_Pr: string;
  Produce_Pr: string;
  NameUsers_Pr: string;
}

const DateComponent = () => {
  const [filteredEquipment, setFilteredEquipment] = useState(false);
  const [filteredProgression, setFilteredProgression] = useState<Progression[]>(
    []
  );
  const [progression, setProgression] = useState<Progression[]>([]);
  const [dateT, setDateT] = useState<number>();

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "Progression")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const userArray = Object.keys(data).map((key) => {
          return {
            id: key,
            NameSv_Pr: data[key].NameSv_Pr,
            Id_Pr: data[key].Id_Pr,
            DateStart_Pr: data[key].DateStart_Pr,
            DateEnd_Pr: data[key].DateEnd_Pr,
            Status_Pr: data[key].Status_Pr,
            Produce_Pr: data[key].Produce_Pr,
            NameUsers_Pr: data[key].NameUsers_Pr,
          };
        });
        setProgression(userArray);
      }
    });

   
    // const calculateTotalIdsByDate = (date: string): number => {
    //   const filteredData: Progression[] = progression.filter(
    //     (item: Progression) => {
    //       const dateMoment = moment(item.DateStart_Pr, "HH:mm:ss - DD/MM/YYYY");
    //       const dateFromField = dateMoment.format("DD");
    //       // setDateT(dateFromField);
    //       return dateFromField === date;
    //     }
    //   );

    //   return filteredData.length;
    // };
  
    
    
    
    
    
      
  
  }, []);

  
  
  const listNgay = [
    ...new Set(
      progression.map((item) =>
        moment(item.DateStart_Pr, "HH:mm:ss - DD/MM/YYYY").format("DD")
      )
    ),
  ];
     
      
      
      
      const list = [];
      for( let i = 0 ;i< listNgay.length ; i++ ){
        var count = 0;
      var downcount = 0;
        const dateToCalculate = progression.map((item)=>( (moment(item.DateStart_Pr, "HH:mm:ss - DD/MM/YYYY").format("DD")) === listNgay[i] ))
        // const totalIdsByDate = calculateTotalIdsByDate(dateToCalculate);
        
        dateToCalculate.map(a => (a === true ? count++ : downcount++))
          
        
        list.push(count)
        console.log(list);
        
      }
      
  const data = {
    labels: [
      ...new Set(
        progression.map((item) =>
          moment(item.DateStart_Pr, "HH:mm:ss - DD/MM/YYYY").format("DD")
        )
      ),
    ],

    datasets: [
      {
        backgroundColor: "transparent",
        background: "#FF8A48",
        pointBorderColor: "transparent",
        data: list,
        fill: {
          target: "origin",
          above: "rgba(81, 133, 247, 0.15)",
      },
        borderColor: "#2980b9",
        tension: 0.4,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "#FF8A48",
    },
      legend: {
        display: false, 
      },
      interaction: {
        intersect: false,
    },
    },
     
  };

  return (
    <div>
      <Line data={data} height={400} options={options} />{" "}
    </div>
  );
};

export default DateComponent;
