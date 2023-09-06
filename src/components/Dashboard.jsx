import { Link, useLoaderData } from "react-router-dom";
import { delaySumbit, getFromStorage, createBudget, createExpense, formatter, formatDate, getBudgetName, deleteFromStorage, deleteExpense, deleteBudget  } from "../helpers"; //import local storage info
import SplashPage from "./SplashPage";
import { toast } from "react-toastify";
import AddBudgetForm from "./AddBudgetForm";
import AddExpenseForm from "./AddExpenseForm";
import BudgetItem from "./BudgetItem";
import DeleteExpenseForm from "./DeleteExpenseForm";

//loader function -> export it to be accesible in App.jsx, loader function runs before the component is rendered
export function dashboardLoader() {
  const userName = getFromStorage("userName");
  const budgets = getFromStorage("budgets");
  const expenses = getFromStorage("expenses")
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
  // await delaySumbit(); //delay the form submit to simulate a real request
  //once form submitted, request is sent with the data, so retrieving it here
  const data = await request.formData(); //get the data from the request

  //new user action
  if (data.get("__action") === "newUser") { // if the form has an input with name __action and value newUser
  try {
    const userName = data.get("userName"); //get the username from the data
    localStorage.setItem("userName", JSON.stringify(userName)); //store the username in local storage (convert to string first or error)
    return toast.success(`Welcome ${userName}!`); //success message
  } catch (error) {
    // throw new Error("There was a problem creating your account.")
    return toast.error(` Error creating your account`); //error message
  }
  }

  //new budget action
  if (data.get("__action") === "newBudget") {
    const budgetName = data.get("budgetName"); //get the budget name from the data/form
    const budgetAmount = data.get("budgetAmount"); //get the budget amount from the data/form
    try {
      createBudget(  //call the createBudget function
        budgetName,
        budgetAmount,
      ); //pass the data from the form to the function
      return toast.success(`New budget ${budgetName} added!`); //success message
    } catch (error) {
      // throw new Error("There was a problem creating your budget.")
      return toast.error(`Error adding new budget`); //error message
    }
  }


  //new expense action
  if (data.get("__action") === "newExpense") {
    const expenseName = data.get("expenseName"); //get the expense name from the form
    const expenseAmount = data.get("expenseAmount"); //get the expense amount from the form
    const budgetId = data.get("expenseBudget"); //get the budget id from the form
    try {
       createExpense(  //call the createExpense function
        expenseName,
        expenseAmount,
        budgetId
      ); //pass the data from the form to the function
      return toast.success(`New expense ${expenseName} added!`); //success message
      
    } catch (error) {
      // throw new Error("There was a problem creating your expense.")
      return toast.error(`Error adding new expense`); //error message
      
    }
  }

  // delete budget action
  if (data.get("__action") === "deleteBudget") {
    const budgetId = data.get("budgetId"); //get the budget id from the form
    try {
      deleteBudget(budgetId); //call the deleteFromStorage function
      return toast.success(`Budget deleted`); //success message
    } catch (error) {
      return toast.error(`Error deleting budget, try again ${error.message}`); //error message
    }
  }

  
  // delete expense action
  if (data.get("__action") === "deleteExpense") {
    const expenseId = data.get("expenseId"); //get the expense id from the form
    try {
      deleteExpense(expenseId); //call the deleteExpense function
      return toast.success(`Expense deleted`); //success message
    } catch (error) {
      return toast.error(`Error deleting expense, try again ${error.message}`); //error message 
    }
  }

  
}


const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData(); //custom hook to access loader data

  return (
    <div>
      {/*If there's a username show username, else go to login page*/}
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">

            {budgets && budgets.length > 0 ? (
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
                <AddExpenseForm budgets={budgets}/>
              </div>
              <h2>Budgets</h2>
              <div className="budgets">
                {budgets.map((budget) => ( 
                <BudgetItem key={budget.id} budget={budget}/>) )}
                </div>
                {
                  expenses && expenses.length > 0 ? (
                    <div>
                      <div className="flex-lg">
                      <h2>Expenses</h2>
                      {expenses.length > 3 && (
                          <Link to="expenses" className="btn btn--dark">
                            View all expenses
                          </Link>
                        ) }
                      </div>
                      
                      <div className="expenses">
                        <table>
                          <thead>
                        <tr>
                          <th>Expense</th>
                          <th>Amount</th>
                          <th>Budget</th>
                          <th>Date Added</th>
                          <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {expenses.map((expense) => (
                          <tr key={expense.id}>
                            <td>{expense.name}</td>
                            <td>{formatter.format(expense.amount)}</td>
                            <td>{getBudgetName(expense.budgetId)}</td>
                            <td>{formatDate(expense.created)}</td>
                            <td>
                              <DeleteExpenseForm expenses={expense}/>
                            </td>
                            </tr>
                        ))
                        }
                        </tbody>
                        </table>
                        {expenses.length > 0 ? (
                          <p className="total">
                            Total Spent:{" "}
                            <span className="accent">
                              {formatter.format(
                                expenses.reduce(
                                  (acc, expense) => acc + expense.amount,
                                  0
                                )
                              )}
                            </span>
                          </p>
                        ) : null}

                      </div>
                    </div>
                  ) : (
                    <p>Add an expense to get started!</p>
                  )
                }
            </div>) 
            : 
            (<div className="grid-lg">
            <p>Add a budget to get started!</p>
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>)}
            
          </div>
        </div>
      ) : (
        //if there's no username, show splash page
        <div>
        <SplashPage />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
