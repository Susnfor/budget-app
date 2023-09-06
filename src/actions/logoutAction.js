import { redirect } from "react-router-dom";
import { deleteFromStorage } from "../helpers";
import {toast} from "react-toastify";

export async function logoutAction(){
    //delete user
    deleteFromStorage("userName");
    deleteFromStorage("budgets");
    deleteFromStorage("expenses");
    toast.success("Deleted your account successfully!");
    //redirect to login/homepage
    return redirect("/");
}