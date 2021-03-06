const calculateImpact = (number, data) => {
    console.log("in impactfunction");
    const hosBed = Math.floor(0.35 * data.totalHospitalBeds);
    console.log(hosBed);
    // const incomPop = data.region.avgDailyIncomePopulation;
    // const incomUSD = data.region.avgDailyIncomeInUSD;
    const incomPop = data.avgDailyIncomePopulation;
    const incomUSD = data.avgDailyIncomeInUSD;
    let days;
    if (data.periodType === 'days') {
      days = data.timeToElapse;
    } else if (data.periodType === 'weeks') {
      days = data.timeToElapse * 7;
    } else if (data.periodType === 'months') {
      days = data.timeToElapse * 30;
    }
    const factor = Math.trunc(days / 3);
    console.log(factor);
    //  CHALLENGE 1
    const currentlyInfected = Math.floor(data.reportedCases * number);
    console.log(currentlyInfected);
    const infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** factor));
    //  CHALLENGE 2
    const severeCasesByRequestedTime = Math.trunc(0.15 * infectionsByRequestedTime);
    const hospitalBedsByRequestedTime = Math.ceil(hosBed - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = Math.floor(0.05 * infectionsByRequestedTime);
    //  CHALLENGE 3
    const casesForVentilatorsByRequestedTime = Math.floor(0.02 * infectionsByRequestedTime);
    const impactInfection = infectionsByRequestedTime;
    const dollarsInFlight = Math.floor((impactInfection * incomPop * incomUSD) / days);
    console.log("dollars" + dollarsInFlight);
    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };


  // const covid19ImpactEstimator = (data) => ({    
  //   data,
  //   impact: calculateImpact(10, data),
  //   severeImpact: calculateImpact(50, data)    
  // });


  const covid19ImpactEstimator = (data) => {
    console.log("in estimator function");
    // console.log("infectionsByRequestedTime," + infectionsByRequestedTime);
    var result1 = calculateImpact(10, data);
    var result2 = calculateImpact(50, data);
    return{
    data,
    impact: calculateImpact(10, data),
    severeImpact: calculateImpact(50, data)
    };    
  };


  // export default covid19ImpactEstimator;
  