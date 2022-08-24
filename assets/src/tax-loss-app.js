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
    const [results, profit] = calculator.getResults();
    ui.showResults(results, profit);
  }

  const startCalculations = (e) => {
    ui.cleanAllErrors(selectors.inputs);
    const input = e.target;
    const inputFor = getInputType(input);
    const inputValue = getInputValue(input);
    const errors = errorHandler.checkForInputErrors(selectors.inputs);
    
    if(Object.keys(errors).length > 0) {
      handleInputErrors(errors);
      return;
    }

    state.updateCurrentState(inputFor, inputValue);
    const currentState = state.getCurrentState(); 
    calculator.performCalculations(currentState);
    const [results, profit] = calculator.getResults();
    ui.showResults(results, profit);
  }

  const getInputType = (input) => input.dataset.inputtype;

  const getInputValue = (input) => {
    if(getInputErrorCheckType(input) === 'percentage') {
      return formatPercentage(parseFloat(input.value));
    } else {
      return parseFloat(input.value);
    } 
  };

  const getInputErrorCheckType = (input) => input.dataset.errorCheck;

  const handleInputErrors = (inputs) => ui.showInputErrors(inputs);
  
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