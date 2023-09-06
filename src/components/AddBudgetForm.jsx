import { CurrencyPoundIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
  const fetcher = useFetcher(); //fetches data from the form
  const isSubmitting = fetcher.state === "submitting"; //check if form is submitting / boolean

  const formRef = useRef(); //to clear form after submit
  const focusRef = useRef(); //to focus on the first input after submit

  useEffect(() => {
    if (isSubmitting) {
      formRef.current.reset(); //clear form after submit
      focusRef.current.focus(); //focus on the first input after submit
    }
  }, [isSubmitting]); //anytime isSubmitting changes, useEffect will run

  return (
    <div className="form-wrapper">
      <h3>Add a new budget</h3>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="budgetName">Budget Name</label>
          <input
            type="text"
            name="budgetName"
            id="budgetName"
            placeholder="e.g. Utilities"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="budgetAmount">Budget Amount</label>
          <input
            type="number"
            step="0.01"
            name="budgetAmount"
            id="budgetAmount"
            placeholder="e.g. £1000"
            inputMode="decimal"
            required
          />
        </div>
        <input type="hidden" name="__action" value="newBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <span>
              Add Budget <CurrencyPoundIcon width={20} />
            </span>
          )}
        </button>
        {/* disable button while isSubmitting = true */}
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
