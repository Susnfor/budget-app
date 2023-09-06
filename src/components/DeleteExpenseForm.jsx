import { useFetcher } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/solid'


const DeleteExpenseForm = ({expenses}) => {
    const fetcher = useFetcher(); //fetches data from the form
  return (
    <div>
        <fetcher.Form method="POST">
            <input type="hidden" name="__action" value="deleteExpense" />
            <input type="hidden" name="expenseId" value={expenses.id} />
             <button className="btn btn--warning"type="submit"><TrashIcon className="icon" width={20}/></button>
        </fetcher.Form>



    </div>
  )
}

export default DeleteExpenseForm