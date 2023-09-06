import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher(); //fetches data from the form
  const isSubmitting = fetcher.state === "submitting"; //check if form is submitting / boolean

  const formRef = useRef(); //to clear form after submit
  const focusRef = useRef(); //to focus on the first input after submit

  //if form value is the default value, set selectedDefault to true, else set it to false (to disable button)
  const [selectedDefault, setSelectedDefault] = useState(true); //default value is true
  const [placeholder, setPlaceholder] = useState("selectedDefault"); //default placeholder




  useEffect(() => {
    // disable button if default value is selected
    if (placeholder === "selectedDefault") {
      setSelectedDefault(true);
    }
    else {
      setSelectedDefault(false);
    }
    //clear form and focus on first input after submit
    if (isSubmitting) {
      formRef.current.reset(); //clear form after submit
      focusRef.current.focus(); //focus on the first input after submit
    }

  }, [isSubmitting, placeholder]); //anytime isSubmitting, or selected value changes, useEffect will run

  return (
    <div className="form-wrapper">
      <h3>
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budget) => budget.name)}`}
          {/*if there's only one budget, show the budget name*/}
        </span>{" "}
        Expense
      </h3>

      {/*Expense Form*/}
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="expenseName">Expense Name</label>
            <input
              type="text"
              name="expenseName"
              id="expenseName"
              placeholder="e.g. Wifi"
              required
              ref={focusRef}
            />
            <label htmlFor="expenseAmount">Expense Amount</label>
            <input
              type="number"
              step="0.01"
              name="expenseAmount"
              id="expenseAmount"
              placeholder="e.g. £4.50"
              inputMode="decimal"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          {/*hide budget category if there's only one budget*/}
          <label htmlFor="expenseBudget">Budget Category </label>
          <select name="expenseBudget" id="expenseBudget" required defaultValue= {placeholder} onChange={e => setPlaceholder(e.target.value)}>
            {/*required so user can't submit form without selecting a budget*/}
            <option value={placeholder} disabled> Select a budget</option>
            {/*default option*/}
            {budgets.map(
              (
                budget //map through budgets array and make an option
              ) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              )
            )}
          </select>
        </div>
        <input type="hidden" name="__action" value="newExpense" />
        {/*hidden input to tell the action what to do*/}
        <button type="submit" className="btn btn--dark" disabled={isSubmitting || selectedDefault}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <span>
              Add Expense <PlusCircleIcon width={20} />
            </span>
          )}
           {/* disable button while isSubmitting = true or selectedDefault = true */}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
