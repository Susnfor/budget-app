import { Form, NavLink } from "react-router-dom";
import logomark from "../assets/logomark.svg";
import {TrashIcon} from "@heroicons/react/24/solid"

const Nav = (props) => {
  return (
    <nav>
      <NavLink to="/">
        <img src={logomark} alt="logomark" height={40} />
        <span>Budget Tracker</span>
      </NavLink>
      {/*if username exists then show the delete button */}
      {props.userName && (
        <Form method="post" action="/logout" onSubmit={(event) => {
            if (!confirm("Are you sure you want to logout?")) { //if they say no prevent default (action)/don't sumbit form
              event.preventDefault();
            }
        }}>
          <button type="submit" className="btn btn--warning">
            <span> Delete User</span>
            <TrashIcon className="icon" width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
