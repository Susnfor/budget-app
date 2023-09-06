import React from 'react'
import { formatter, spentSoFar } from '../helpers'
import DeleteBudgetForm from './DeleteBudgetForm';

const BudgetItem = ({budget}) => {
    const { name, amount, id } = budget;
    const spent = spentSoFar(id)
    const percentage = ((spent/amount) * 100).toFixed(0);
    const remaining = amount - spent;

  return (
    <div className='budget'>
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatter.format(amount)}</p>
        </div>
        <div className="progress-bar">
            <progress max={amount} value={spent}></progress>
            <div className="percentage">
                <p>{percentage}% spent</p>
            </div>
            <div className="progress-text">
                <p>{formatter.format(spent)}</p>
                <p>{formatter.format(remaining)}</p>
            </div>
            <div className="deleteBudget">
                <DeleteBudgetForm budget={{id}}/>
            </div>
            </div>
        </div>
  )
}

export default BudgetItem