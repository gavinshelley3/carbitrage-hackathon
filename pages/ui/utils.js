// use firebase to get data from the cars collection
// and set it to the data state variable

//write a function that takes in an array of objects and runs it through an algorithm
// return the objects and their scores



const getAverage = (array) => {

    const scores = getScores(array);
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = sum / scores.length;
    return average;
};

