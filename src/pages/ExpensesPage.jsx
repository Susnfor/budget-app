
import { getFromStorage, formatDate, formatter, getBudgetName} from "../helpers";
import { useLoaderData } from "react-router-dom";
import DeleteExpenseForm from "../components/DeleteExpenseForm";

export function expensesLoader() {
    const userName = getFromStorage("userName");
    const budgets = getFromStorage("budgets");
    const expenses = getFromStorage("expenses")
    return { userName, budgets, expenses };
  }

const ExpensesPage = () => {
    const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
        {
            expenses && expenses.length > 0 ? (
                <div>
                    <h2>All Expenses</h2>
                    <div className="expenses">
                        <table>
                            <thead>
                                <tr>
                                    <th>Expense</th>
                                    <th>Amount</th>
                                    <th>Budget</th>
                                    <th>Date</th>
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
                                            <DeleteExpenseForm expenses={expenses}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>Add an expense to get started!</p>
            )
        }
    </div>
  )
}

export default ExpensesPage