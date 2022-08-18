const TAX_LOSS_HARVESTING_APP = (() => {
  const ui = TAX_LOSS_HARVESTING_UI;
  const state = TAX_LOSS_HARVESTING_STATE;
  const calculator = TAX_LOSS_HARVESTING_CALCULATIONS;
  const errorHandler = TAX_LOSS_HARVESTING_ERROR_HANDLERS;
  const selectors = ui.getSelectors();

  const loadEventListeners = () => {
    selectors.inputs.forEach(i => i.addEventListener('blur', startCalculations));
    selectors.tooltips.forEach(tt => tt.addEventListener('click', ui.displayToolTip));
    selectors.toolTipClose.forEach(ttc => ttc.addEventListener('click', ui.closeToolTip));
  }

  const populateStateValues = () => {
    selectors.inputs.forEach(i => {
      state.updateCurrentState(getInputType(i), getInputValue(i));
    });
    calculator.performCalculations(state.getCurrentState());
    console.log(calculator.getResults())
  }

  const startCalculations = (e) => {
    // Clean all errors
    ui.cleanAllErrors();
    // Set up local variables
    const input = e.target;
    const inputFor = getInputType(input);
    const errorCheckType = getInputErrorCheckType(input);
    const inputValue = getInputValue(input);
    // Check for errors 
    const errors = errorHandler.checkForInputErrors(inputValue, errorCheckType)
    // Handle Errors if any 
    if(errors !== null) {
      handleInputErrors(input);
      return;
    }
    // Update state to new values
    state.updateCurrentState(inputFor, inputValue);
    // Pass state into calculator
    const currentState = state.getCurrentState(); 
    calculator.performCalculations(currentState);
    // Get the final calculations
    const calculationResults = calculator.getCalculationResults();
    // Display Calculations 
    ui.showResults(calculationResults);
  }

  const getInputType = (input) => input.dataset.inputtype;

  const getInputValue = (input) => {
    console.log(getInputErrorCheckType(input));
    if(getInputErrorCheckType(input) === 'percentage') {
      return formatPercentage(parseFloat(input.value));
    } else {
      return parseFloat(input.value);
    } 
  };

  const getInputErrorCheckType = (input) => input.dataset.errorCheck;

  const handleInputErrors = (input) => ui.showInputError(input);
  
  const formatPercentage = (number) => number / 100;
  
  return {
    init: () => {
      loadEventListeners();
      populateStateValues();
    }
  }
})(TAX_LOSS_HARVESTING_UI, 
   TAX_LOSS_HARVESTING_CALCULATIONS, 
   TAX_LOSS_HARVESTING_ERROR_HANDLERS,
   TAX_LOSS_HARVESTING_STATE)

TAX_LOSS_HARVESTING_APP.init();