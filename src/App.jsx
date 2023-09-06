import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard , { dashboardLoader, dashboardAction } from "./components/Dashboard";
import Error from "./components/Error";
import Main, { mainLoader } from "./pages/Main";
import { logoutAction } from "./actions/logoutAction";


//notifs
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, { expensesLoader } from "./pages/ExpensesPage";


//Routes

const router = createBrowserRouter([
  //allows us to use tools like loader, actions and fetchers
  { //creating route object
    path: "/",
    element: <Main />, //components that will be rendered
    loader: mainLoader,//load this as soon as route is loaded
    errorElement: <Error />, //custom error message
    children: [
      {
      index: true,
      element: <Dashboard />, //components that will be rendered
      loader: dashboardLoader,//load this as soon as route is loaded
      action: dashboardAction, //action to be performed when form is submitted
      errorElement: <Error /> //custom error message
      },
      {
        path: "expenses",
        element: <ExpensesPage />, //components that will be rendered
        loader: expensesLoader,//load this as soon as route is loaded
        },
      {
        path: "logout",
        action: logoutAction
        },
    ]
  },
]);

function App() {

  return (
    <>
      <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
      </div>
    </>
  )
}

export default App
