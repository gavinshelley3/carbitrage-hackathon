// use firebase to get data from the cars collection
// and set it to the data state variable

//write a function that takes in an array of objects and runs it through an algorithm
// return the objects and their scores

const getScores = (inputArray) => {
    const carsCollection = collection(db, "cars");
    const carsSnapshot = getDocs(carsCollection);

    const carsList = carsSnapshot.docs.map((doc) => doc.data());

    setData(carsList);

    const scores = {
        MakeScore : 0,
        ModelScore : 0,
        YearScore : 0,
        PriceScore : 0,
        MileageScore : 0,
        ColorScore : 0,
      };

    const carScores = {
        item: [],
        score: []
    };
    carsList.forEach((item) => {
        new scores;
        
        if (item.make.toLowerCase().trim() === inputArray.MakeText.toLowerCase()) {MakeScore = 0} else {MakeScore = 1};
        if (item.model.toLowerCase().trim() === inputArray.ModelText.toLowerCase()) {ModelScore = 0} else {ModelScore = 1};
        if (item.paint.toLowerCase().trim() === inputArray.ColorText.toLowerCase()) {ColorScore = 0} else {ColorScore = 1};
        
        const yearDiff = (item.makeYear - inputArray.YearText);
        YearScore = yearDiff * inputArray.YearWeight;

        const priceDiff = (item.price - inputArray.PriceText);
        PriceScore = priceDiff/inputArray.Pricetext * inputArray.PriceWeight * 10;

        const mileageDiff = (item.mileage - inputArray.MileageText);
        MileageScore = mileageDiff/inputArray.MileageText * inputArray.MileageWeight * 10;

        const totalScore = MakeScore + ModelScore + YearScore + PriceScore + MileageScore + ColorScore;


        // const itemScore = scores.MakeScore + scores.ModelScore + scores.YearScore + scores.PriceScore + scores.MileageScore + scores.ColorScore;
        const itemScore = 100 - totalScore;
        carScores.item.push(item);
        carScores.score.push(itemScore);
    });
    return carScores;
    };

const getAverage = (array) => {

    const scores = getScores(array);
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = sum / scores.length;
    return average;
};

