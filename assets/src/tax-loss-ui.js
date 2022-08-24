const TAX_LOSS_HARVESTING_UI = (() => {
  const DOMselectors = {
    inputs: Array.from(document.querySelectorAll('.bacc-calc-input')),
    tooltips: Array.from(document.querySelectorAll('.bacc-tooltip-icon')),
    toolTipClose: Array.from(document.querySelectorAll('.bacc-tooltip-close')),
    resultsSummary: document.querySelector('.bacc-results-container__summary')
  };

  const formatNumberWithCommas = (x) => {
    if(x % 1 != 0) 
     x = x.toFixed(2);

    let newNum = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return newNum;
  }
  
  return {
    getSelectors: () => {
      return DOMselectors;
    }, 
    showResults: (results, profit) => {
      const accentClass = profit ? 'accent-clr' : 'bacc-warning';
      const profitOrLoss = profit ? 'profit' : 'loss'
      const taxSavings = results.taxSavings;
      const newInvestmentAmt = results.TLHInvestmentAmt;
      const saleNoTLH = results.finalSaleNoTLHAmt;
      const saleWithTLH = results.finalSaleWithTLHAmt;
      const taxBillNoTLH = results.taxBillNoTLH;
      const taxBillWithTLH = results.taxBillWithTLH;
      const returnNoTLH = results.resultAfterTaxNoTLH;
      const returnWithTLH = results.resultAfterTaxWithTLH;
      const net = results.netResult;
      DOMselectors.resultsSummary.innerHTML = '';
      DOMselectors.resultsSummary.innerHTML = `
      <p>Below are some of the figures that indicate whether tax loss harvesting (<span class="fw-bold">TLH</span>) would prove beneficial based on the figures that you have provided. According to the figures that you have entered you would make a <span class="${accentClass} fw-bold">net ${profitOrLoss}</span> if you were to utilize <span class="fw-bold">TLH</span>.</p><br>
      <p>Your tax savings <span class="fw-bold">with TLH</span> could be: <span class="accent-clr fw-bold">$${formatNumberWithCommas(taxSavings)}</span></p>
        <p>Your new investment amount <span class="fw-bold">with TLH</span> could be: <span class="accent-clr fw-bold">$${formatNumberWithCommas(newInvestmentAmt)}</span><p>
        <p>Your investment worth <span class="fw-bold">without TLH</span> would be: <span class="fw-bold accent-clr">$${formatNumberWithCommas(saleNoTLH)}</span></p>
        <p>Your Investment worth <span class="fw-bold">with TLH</span> would be: <span class="fw-bold accent-clr">$${formatNumberWithCommas(saleWithTLH)}</span></p>
        <p>Your tax bill <span class="fw-bold">without TLH</span> would be: <span class="fw-bold accent-clr">$${formatNumberWithCommas(taxBillNoTLH)}</span></p>
        <p>Your tax bill <span class="fw-bold">with TLH</span> would be: <span class="fw-bold accent-clr">$${formatNumberWithCommas(taxBillWithTLH)}</span></p>
        <p>Your return after tax <span class="fw-bold">without TLH</span> would be: <span class="fw-bold accent-clr">$${formatNumberWithCommas(returnNoTLH)}</span></p>
        <p>You return after tax <span class="fw-bold">with TLH</span> would be: <span class="fw-bold accent-clr">$${formatNumberWithCommas(returnWithTLH)}</span><p>
        <p>Your <span class="fw-bold ${accentClass}">net ${profitOrLoss}</span> after tax using <span class="fw-bold">TLH</span> would be: <span class="fw-bold ${accentClass}">$${formatNumberWithCommas(Math.abs(net))}</span></span></p>
        <br>
      `;


    },
    cleanAllErrors: (inputs) => {
      inputs.forEach(i => {
        i.parentElement.classList.remove('input-error');
        console.log(i.parentElement.classList);
      });
    },
    showInputErrors: (inputs) => {
    
      for(const i in inputs) {
        const input = document.querySelector(`[data-inputType="${i}"]`);
        input.parentElement.dataset.error = inputs[i];
        input.parentElement.classList.add('input-error');
      }
    },
    removeInputError: (input) => {
      input.parentElement.classList.remove('input-error')
    },
    closeAllToolTips: () => {
      DOMselectors.tooltips.forEach(tt => {
        tt.nextElementSibling.classList.remove('bacc-tooltip-displayed')
      })
    },
    displayToolTip: (e) => {
      TAX_LOSS_HARVESTING_UI.closeAllToolTips();
      if(!e.target.classList.contains('bacc-tooltip-icon')) return
      e.target.nextElementSibling.classList.add('bacc-tooltip-displayed')
    },
    closeToolTip: (e) => {
      if(!e.target.classList.contains('bacc-tooltip-close')) return;
      if(e.target.classList.contains('bacc-tooltip-close')) e.target.parentElement.classList.remove('bacc-tooltip-displayed')
    }
  }
})()