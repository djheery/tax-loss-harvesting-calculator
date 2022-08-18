const TAX_LOSS_HARVESTING_STATE = (() => {
  
  const currentState = {
    [inputKeys.initialInvestment]: 0,
    [inputKeys.currentInvestment]: 0,
    [inputKeys.currentTaxRate]: 0,
    [inputKeys.estimatedGain]: 0,
    [inputKeys.estimatedTaxRate]: 0
  }

  return {
    getCurrentState: () => {
      return currentState;
    },
    updateCurrentState: (stateToUpdate, value) => {
      if(typeof value !== 'number')
        throw console.error('Must provide a number to update the current state');
      
        currentState[stateToUpdate] = value;  
    }
  }
})();