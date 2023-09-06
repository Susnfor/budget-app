//Local storage functions stored here

//basically fetches the data from local storage (using key) and returns it
export const getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

//create budget item in local storage
export const createBudget = (name, amount) => {
    const newBudget = {
        id: crypto.randomUUID(),
        name: name,
        amount: Number(amount),
        created: Date.now(),
    }
    const budgetList = getFromStorage("budgets") ?? [];
    localStorage.setItem("budgets", JSON.stringify([...budgetList, newBudget]));

};

//create expense item in local storage
export const createExpense = (name, amount, budgetId) => {
    const newExpense = {
        id: crypto.randomUUID(),
        name: name,
        amount: Number(amount),
        created: Date.now(),
        budgetId: budgetId,
    }
    const expenseList = getFromStorage("expenses") ?? [];
    localStorage.setItem("expenses", JSON.stringify([...expenseList, newExpense]));

};

//delete item from local storage
export const deleteFromStorage = (key) => {
    localStorage.removeItem(key);
}

// delete expense from local storage
export const deleteExpense = (id) => {
    const currentData = getFromStorage("expenses")
        const newData = currentData.filter((item) => item.id !== id)
        return localStorage.setItem("expenses", JSON.stringify(newData))
}
//get budget name from id
export const getBudgetName = (budgetId) => {
    const budgetList = getFromStorage("budgets") ?? [];
    const budgetName = budgetList.find(budget => budget.id === budgetId).name;
    return budgetName;
}

//delete budget from local storage
export const deleteBudget = (id) => {
    const currentData = getFromStorage("budgets")
    const newData = currentData.filter((item) => item.id !== id)
    return localStorage.setItem("budgets", JSON.stringify(newData))
}

//expense spent so far
export const spentSoFar = (budgetId) => {
    const expenseList = getFromStorage("expenses") ?? []; //fetch expenses from local storage, if not found, return empty array
    // check if expense belongs to budget by comparing budgetId, if yes, add to accumulator (0), if not, return accumulator (0)
    const spent = expenseList.filter(expense => expense.budgetId === budgetId).reduce((acc, expense) => acc + expense.amount, 0);
    return spent;
}

export const delaySumbit = () => new Promise(resolve => setTimeout(resolve, Math.random() * 10000));

//currency formatter
export const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'GBP',
});


//date formatter
export const formatDate = (e) => new Date(e).toLocaleDateString();