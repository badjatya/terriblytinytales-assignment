// Importing Modules
import React, { useState } from "react";
import Chart from "react-apexcharts";

// Importing data
import testData from "./data/test.txt";

// Importing Styles
import "./App.css";

const App = () => {
  // State
  const [showButton, setShowButton] = useState(true);
  const [words, setWords] = useState([]);
  const [frequencies, setFrequencies] = useState([]);

  // Fetch data function
  const fetchData = async () => {
    try {
      setShowButton(false);
      const dataBuffer = await fetch(testData);
      const data = await dataBuffer.text();
      findFrequencyOfWords(data.toLowerCase());
    } catch (error) {
      console.log("Something went wrong while fetching data");
      console.log(error);
    }
  };

  // finding the frequency of occurrence of each word
  const findFrequencyOfWords = (string) => {
    // Replacing characters and splitting into array
    let words = string.replace(/[,.!-?]+/g, "").split(/\s/);
    let freqMap = {};
    let wordFrequency = [];

    // Finding frequency of words
    words.forEach((word) => {
      if (!freqMap[word]) {
        freqMap[word] = 0;
      }
      freqMap[word] += 1;
    });

    // Converting object into array
    Object.keys(freqMap).forEach((word) => {
      let wordObject = { word: "", frequency: null };
      wordObject.word = word;
      wordObject.frequency = freqMap[word];
      wordFrequency.push(wordObject);
    });

    // Sorting wordFrequency array in descending order
    wordFrequency.sort((a, b) => b.frequency - a.frequency);

    // Removing the empty character from the array
    if (wordFrequency[0].word === "") {
      wordFrequency.shift();
    }

    // making two array words and frequencies
    let wordsArray = [];
    let frequencyArray = [];
    for (let i = 0; i < 20; i++) {
      wordsArray.push(wordFrequency[i].word);
      frequencyArray.push(wordFrequency[i].frequency);
    }
    setFrequencies(frequencyArray);
    setWords(wordsArray);
  };

  // Options for chart
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: words,
    },
    colors: ["#ffc23e"],
  };
  const series = [
    {
      name: "frequency",
      data: frequencies,
    },
  ];

  return (
    <div className="App">
      {showButton ? (
        <button className="btn" onClick={fetchData}>
          Submit
        </button>
      ) : (
        <div>
          <Chart options={options} series={series} type="bar" width="1024px" />
        </div>
      )}
    </div>
  );
};

export default App;
