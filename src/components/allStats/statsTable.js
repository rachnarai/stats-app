import React from "react";
import Table from "react-bootstrap/Table";

const AllStatsTable = React.memo(
  ({
    dataStats,
    calculateMean,
    calculateMode,
    calculateMedian,
    gammaOrFlavanoid
  }) => {
   
    console.log("gammaOrFlavanoid:", gammaOrFlavanoid);

    const tableCols = Object.keys(dataStats).map((element, index) => (
      <th key={index}>{`Class ${element}`}</th>
    ));

    const measureRows = [
      {
        measure: `${
          gammaOrFlavanoid === "flavanoids" ? "Flavanoids" : "Gamma"
        } Mean`,
        dataKey: "mean",
      },
      {
        measure: `${
          gammaOrFlavanoid === "flavanoids" ? "Flavanoids" : "Gamma"
        } Median`,
        dataKey: "median",
      },
      {
        measure: `${
          gammaOrFlavanoid === "flavanoids" ? "Flavanoids" : "Gamma"
        } Mode`,
        dataKey: "mode",
      },
    ];


    // Handles calculating different measures based on gammaOrFlavanoid value.
    const calculateAndRenderCell = (dataKey, element) => {
      if (dataKey === "mode") {
        return calculateMode(element[gammaOrFlavanoid]);
      } else if (dataKey === "median") {
        return calculateMedian(element[gammaOrFlavanoid]);
      } else {
        return calculateMean(element[gammaOrFlavanoid]);
      }
    };

    return (
      <Table responsive bordered striped >
        <caption className="table-caption">
          {gammaOrFlavanoid === "flavanoids"
            ? "Flavanoid Calculations"
            : "Gamma Calculations"}
        </caption>
        <thead>
          <tr>
            <th>Measure</th>
            {tableCols}
          </tr>
        </thead>
        <tbody>
          {measureRows.map((measure, measureIndex) => (
            <tr key={measureIndex}>
              <td>{measure.measure}</td>
              {Object.keys(dataStats).map((element, dataIndex) => (
                <td key={dataIndex} className={`${measure.dataKey} ${element}`}>
                  {calculateAndRenderCell(measure.dataKey, dataStats[element])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
);

export default AllStatsTable;
