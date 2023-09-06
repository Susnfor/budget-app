import { useFetcher } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/solid'



const DeleteBudgetForm = ({budget}) => {
    const fetcher = useFetcher(); //fetches data from the form
  return (
    <div>
         <fetcher.Form method="POST">
            <input type="hidden" name="__action" value="deleteBudget" />
            <input type="hidden" name="budgetId" value={budget.id} />
             <button className="btn btn--warning"type="submit">Delete<TrashIcon className="icon" width={20}/></button>
        </fetcher.Form>
    </div>
  )
}

export default DeleteBudgetForm