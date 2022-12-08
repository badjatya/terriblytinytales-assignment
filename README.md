# Terribly Tiny Tales Assignment

## Screenshots of web page

### Home Page

![Home Page](./src/assets/Home.png)

### Charts

![Charts](./src/assets/charts.png)

### Chart with download functionality

![Charts Download](./src/assets/download.jpg)

### Chart after download

![Chart after download](./src/assets/chart.png)

## Library Used

- react-apexcharts
- apexcharts

## Code Components

- ### States of the app

  1. To toggle the button show, when user clicks the button `showButton` will become false.
  2. Array of words
  3. Array of frequencies

  ```javascript
  const [showButton, setShowButton] = useState(true);
  const [words, setWords] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  ```

- ### Fetch data function

  1. This function will be called when user clicks on the button
  2. Reading file text
  3. Calling function `findFrequencyOfWords(string)` to find frequency of words

  ```javascript
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
  ```

- ### Find Frequency function

  1. This function will be called inside the `fetchData()`
  2. Step 1 replacing all the characters like ! . ?
  3. Step 2 converting string to array
  4. Step 3 finding frequency of words and storing them in `freqMap` object
  5. Step 4 converting object into array
  6. Step 5 sorting frequency in descending order
  7. Step 6 removing the empty character
  8. Step 7 Creating two arrays of `wordsArray` and `frequencyArray` for charts library
  9. Step 8 Storing in the state

  ```javascript
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
  ```

- ### Options for chart

  1. Options for apexcharts
  2. Chart having id as `frequency-of-words`
  3. Configuring x-axis should have words
  4. Configuring y-axis should have frequencies
  5. Configuring colors

  ```javascript
  const options = {
    chart: {
      id: "frequency-of-words",
    },
    xaxis: {
      categories: words,
    },
    colors: ["#ffc23e"],
    series: [
      {
        name: "frequency",
        data: frequencies,
      },
    ],
  };
  ```

- ### App Component

  1. Rendering button based on `showButton` state
  2. If `showButton` is true showing button
  3. If `showButton` is false showing Chart
  4. Button has a click function which will be called when user clicks on button

  ```javascript
  <div className="App">
    {showButton ? (
      <button className="btn" onClick={fetchData}>
        Submit
      </button>
    ) : (
      <Chart
        options={options}
        series={options.series}
        type="bar"
        width="1024px"
      />
    )}
  </div>
  ```
