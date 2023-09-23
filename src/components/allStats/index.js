import React, { useEffect, useState } from "react";
import allData from "../../utils/data.json";
import AllStatsTable from "./statsTable";

const AllStats = () => {
  const [dataStats, setDataStats] = useState({});
  
  useEffect(() => {
    const newData = processData(allData);
    setDataStats(newData);
  }, []);

  const processData = (data) => {
    const newData = {};

    data.forEach((item) => {
      const classNum = item?.Alcohol;
      const flavanoid = parseFloat(item?.Flavanoids);
      const ash = parseFloat(item?.Ash);
      const hue = parseFloat(item?.Hue);
      const magnesium = parseFloat(item?.Magnesium);

      if (!classNum || isNaN(flavanoid) || isNaN(ash) || isNaN(hue) || isNaN(magnesium)) {
        return;
      }

      if (!newData[classNum]) {
        newData[classNum] = {
          flavanoids: [flavanoid],
          gamma: [(ash * hue) / magnesium],
        };
      } else {
        const { flavanoids, gamma } = newData[classNum];
        flavanoids.push(flavanoid);
        gamma.push((ash * hue) / magnesium);
      }
    });

    return newData;
  };
  const calculateMean = (arr) => {
    if (arr.length === 0) {
        return 0;
    }
    const sum = arr.reduce((currentSum, currentValue) => {
        return currentSum + currentValue
    }, 0)

    return sum / arr.length;
}
const calculateMode = (arr) => {
    if (arr.length === 0) {
        return 0;
    }
    let map = {};
    let max = 0, count = 0;
    arr.forEach(element => {
        if (element in map) {
            map[element]++;
        }
        else {
            map[element] = 1;
        }
        if (count < map[element]) {
            max = element;        // current max element found.
            count = map[element] // current max count for that element.
        }
    });
    return max;

}
const calculateMedian = (arr) => {
    if (arr.length === 0) {
        return 0;
    }
    let values = [...arr].sort((first, second) => first - second);
    const middleValue = Math.floor(values.length / 2);
    return values.length % 2 ? values[middleValue] :  (values[middleValue - 1] + values[middleValue]) / 2;
    
}
  return (
    <React.Fragment>
      <AllStatsTable
        dataStats={dataStats}
        calculateMean={calculateMean}
        calculateMode={calculateMode}
        calculateMedian={calculateMedian}
        gammaOrFlavanoid="flavanoids"
      />
      <AllStatsTable
        dataStats={dataStats}
        calculateMean={calculateMean}
        calculateMode={calculateMode}
        calculateMedian={calculateMedian}
        gammaOrFlavanoid="gamma"
      />
    </React.Fragment>
  );
};

export default AllStats;
