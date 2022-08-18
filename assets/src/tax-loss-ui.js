const TAX_LOSS_HARVESTING_UI = (() => {
  const DOMselectors = {
    inputs: Array.from(document.querySelectorAll('.bacc-calc-input')),
    tooltips: Array.from(document.querySelectorAll('.bacc-tooltip-icon')),
    toolTipClose: Array.from(document.querySelectorAll('.bacc-tooltip-close')),
    resultsSummary: document.querySelector('.bacc-results-container')
  };
  
  return {
    getSelectors: () => {
      return DOMselectors;
    }, 
    showResults: (calculations) => {
      DOMselectors.resultsSummary.innerHTML = '';
      DOMselectors.resultsSummary.innerHTML = `
      
      `;
    },
    cleanAllErrors: () => {
      DOMselectors.forEach(i => {
        if(i.classList.contains('input-error'))
          removeInputError(i);
      });
    },
    showInputError: (input) => {
      input.classList.add('input-error');
    },
    removeInputError: (input) => {
      input.classList.remove('input-error');
    },
    formatNumberWithCommas: (number) => {

    },
    displayToolTip: (e) => {

    },
    closeToolTip: (e) => {

    }
  }
})()