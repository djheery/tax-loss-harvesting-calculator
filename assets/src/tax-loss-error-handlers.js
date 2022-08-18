const TAX_LOSS_HARVESTING_ERROR_HANDLERS = (() => {
  const errorWarnings = {
    numberLessThanZero: "Please enter a number greater than zero",
    percentageGreaterThan100: "Please enter a percentage less than 100"
  }
  
  let errors = null;
  
  const checkNumberWithinBound = (number) => {
    if(number < 0)
      errors = errorWarnings.numberLessThanZero;
  }

  const checkPercentage = (percent) => {
    if(number > 100) 
      errors = errorWarnings.percentageGreaterThan100
  }
  
  return {
    checkForInputErrors: (inputValue, inputType) => {
      checkNumberWithinBound(inputValue)
      if(inputType === 'percentage') 
        checkPercentage(inputValue);
      return errors;
    } 
  }
})();