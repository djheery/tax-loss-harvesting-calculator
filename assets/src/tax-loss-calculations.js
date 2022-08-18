const TAX_LOSS_HARVESTING_CALCULATIONS = (() => {

  const results = {
    taxSavings: 0,
    TLHInvestmentAmt: 0,
    finalSaleNoTLHAmt: 0,
    finalSaleWithTLHAmt: 0,
    taxBillNoTLH: 0,
    taxBillWithTLH: 0,
    resultAfterTaxNoTLH: 0,
    resultAfterTaxWithTLH: 0,
    netResult: 0
  };

  const calcTaxSavings =  (initValue, currentValue, taxRate) => {
    const taxSavings = (initValue * taxRate) - (currentValue * taxRate);
    results.taxSavings = taxSavings;
  };

  const calcTLHInvestmentAmount =  (currentValue) => {
    const newInvestmentAmount = currentValue + results.taxSavings
    results.TLHInvestmentAmt = newInvestmentAmount;
  };

  const calcFinalSaleNoTLH =  (currentValue, gain) => {
    const finalSaleNoTLH = currentValue + (currentValue * gain);
    results.finalSaleNoTLHAmt = finalSaleNoTLH;
  };

  const calcFinalSaleWithTLH =  (gain) => {
    const finalSaleWithTLH = results.TLHInvestmentAmt + (results.TLHInvestmentAmt * gain);
    results.finalSaleWithTLHAmt = finalSaleWithTLH;
  };

  const calcTaxBillNoTLH =  (initial, estimatedTax) => {
    const taxNoTLH = (results.finalSaleNoTLHAmt - initial) * estimatedTax;
    results.taxBillNoTLH = taxNoTLH;
  };

  const calcTaxBillWithTLH =  (estimatedTax) => {
    const taxWithTLH = (results.finalSaleWithTLHAmt - results.TLHInvestmentAmt) * estimatedTax;
    results.taxBillWithTLH = taxWithTLH;
  };

  const calcResultAfterTaxNoTLH =  () => {
    const returnNoTLH = results.finalSaleNoTLHAmt - results.taxBillNoTLH;
    results.resultAfterTaxNoTLH = returnNoTLH;
  };

  const calcResultAfterTaxWithTLH =  () => {
    const returnWithTLH = results.finalSaleWithTLHAmt - results.taxBillWithTLH;
    results.resultAfterTaxWithTLH = returnWithTLH;
  };

  const calcNetResult =  () => {
    const netResult = results.resultAfterTaxWithTLH - results.resultAfterTaxNoTLH;
    results.netResult = netResult;
  };

  const destructureCurrentState = (currentState) => {
    const initialInvestment = currentState[inputKeys.initialInvestment];
    const currentInvestmentValue= currentState[inputKeys.currentInvestment];
    const currentTaxRate = currentState[inputKeys.currentTaxRate];
    const estimatedGain = currentState[inputKeys.estimatedGain];
    const estimatedTaxRate = currentState[inputKeys.estimatedTaxRate];
    return [initialInvestment, currentInvestmentValue, currentTaxRate, estimatedGain, estimatedTaxRate];
  }

  const isTLHProfitable = () => {
    return results.netResult > 0;
  }

  return {
    performCalculations: (currentState) => {
      [initialInvestment, currentInvestmentValue, currentTaxRate, estimatedGain, estimatedTaxRate] = destructureCurrentState(currentState);
      calcTaxSavings(initialInvestment, currentInvestmentValue, currentTaxRate);
      calcTLHInvestmentAmount(currentInvestmentValue);
      calcFinalSaleNoTLH(currentInvestmentValue, estimatedGain);
      calcFinalSaleWithTLH(estimatedGain);
      calcTaxBillNoTLH(initialInvestment, estimatedTaxRate);
      calcTaxBillWithTLH(estimatedTaxRate);
      calcResultAfterTaxNoTLH();
      calcResultAfterTaxWithTLH();
      calcNetResult();
    },
    getResults: () => {
      return [results, isTLHProfitable()];
    }
  }
})()