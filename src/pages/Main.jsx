import { Outlet, useLoaderData } from 'react-router-dom'
import { getFromStorage } from '../helpers' //import local storage info
import Nav from '../components/Nav';


//loader function -> export it to be accesible in App.jsx
export function mainLoader() {
const userName = getFromStorage("userName");
return { userName };
}

const Main = () => {
    const { userName } = useLoaderData(); //custom hook to access loader data/ access username

  return (
    <div className='layout'>
        <Nav userName={userName}/> {/*pass userName to Nav component*/}
        <main>
        <Outlet />  {/* //any child routes will be rendered here */}
        </main>
    </div>
  )
}

export default Main