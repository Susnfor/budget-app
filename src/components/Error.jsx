import { Link, useRouteError, useNavigate} from "react-router-dom"
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'


const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();


  return (
    <div className="error">
      <h1>Oops! Something went wrong!</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark"onClick={()=> nagivate(-1)}><ArrowLeftIcon width={20}/><span>Go Back</span></button>
      <Link to="/" className="btn btn--dark"><HomeIcon width={20}/><span>Go Home</span></Link>
      </div>
      
      

    </div>
  )
}

export default Error