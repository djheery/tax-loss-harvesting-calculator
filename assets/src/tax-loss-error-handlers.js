const TAX_LOSS_HARVESTING_ERROR_HANDLERS = (() => {
  const errorWarnings = {
    numberLessThanZero: "Please enter a number greater than zero",
    percentageGreaterThan100: "Please enter a percentage less than 100"
  }
  
  let inputErrors = {};
  
  const checkNumberWithinBound = (input, number) => {
    if(number < 0)
      inputErrors[input] = errorWarnings.numberLessThanZero;
  }

  const checkPercentage = (input, percent) => {
    if(percent > 1) 
      inputErrors[input] = errorWarnings.percentageGreaterThan100
  }
  
  return {
    checkForInputErrors: (inputs) => {
      inputErrors = [];
      inputs.forEach(i => {
        checkNumberWithinBound(i.dataset.inputtype, parseFloat(i.value));
        if(i.dataset.errorCheck === 'percentage')
          checkPercentage(i.dataset.inputtype, parseFloat(i.value / 100));
      })

      return inputErrors;
    } 
  }
})();