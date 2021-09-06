import Login from "../LoginPage/LoginPage";
import Register from "../RegisterPage/RegisterPage";
import HomePage from "../HomePage/HomePage";
import FirstPage from "../HomePage/FirstPage";
import EditProfile from "../HomePage/EditProfile";
import Employees from "../Employees/employees";
import addEmployee from "../Employees/addEmployee";
import editEmployee from "../Employees/editEmployee";
import Layout from "../Layout/Layout";
import Dashboard from "../HomePage/Dashboard";
import Salary from "../Salary/Salary";
import AddSalary from "../Salary/AddSalary";
import EditSalary from "../Salary/EditSalary";
import EmployeeSalary from "../EmployeeLogin/EmployeeSalary";
import Contacts from "../Employees/Contacts";
import ForgotPassword from "../LoginPage/ForgotPassword";
import CreateNewPassword from "../LoginPage/CreateNewPassword";
import salarySearch from "../Salary/salarySearch";
import Calendar from "../Calendar/calendar";
import Rooms from "../Rooms/rooms";
import EmployeesAll from "../Employees/EmployeesAll";
const collectRoutes = [
  {
    path: "/profile",
    auth: true,
    exact: true,
    routeName: "Profile",
    component: HomePage,
  },
  {
    path: "/login",
    auth: false,
    exact: true,
    routeName: "Admin & Employee Login",
    component: Login,
  },
  {
    path: "/forgotPassword",
    exact: true,
    auth: false,
    routeName: "Forgot Password",
    component: ForgotPassword,
  },
  {
    path: "/createNewPassword",
    exact: true,
    auth: false,
    routeName: "Create New Password",
    component: CreateNewPassword,
  },
  {
    path: "/register",
    auth: false,
    exact: true,
    routeName: "Admin Register",
    component: Register,
  },
  {
    path: "/first",
    auth: false,
    exact: true,
    component: FirstPage,
  },
  {
    path: "/editProfile",
    auth: true,
    exact: true,
    routeName: "EditProfile",
    component: EditProfile,
  },
  // {
  //   path: "/employee/login",
  //   auth: false,
  //   exact: true,
  //   routeName: "Employee Login",
  //   component: EmployeeLogin,
  // },
  {
    path: "/employee",
    auth: true,
    exact: true,
    routeName: "Employees",
    component: Employees,
  },
  {
    path: "/addEmployee",
    auth: true,
    exact: true,
    routeName: "Add Employees",
    component: addEmployee,
  },
  {
    path: "/employee/edit/:id",
    auth: true,
    useHash: true,
    exact: true,
    routeName: "Edit Employees",
    component: editEmployee,
  },
  {
    path: "/layout",
    auth: true,
    exact: true,
    component: Layout,
  },
  {
    path: "/",
    exact: true,
    auth: true,
    routeName: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/salary/report/:id",
    exact: true,
    auth: true,
    useHash: true,
    routeName: "Salary",
    component: Salary,
  },
  {
    path: "/addsalary/:id",
    exact: true,
    auth: true,
    useHash: true,
    routeName: "AddSalary",
    component: AddSalary,
  },
  {
    path: "/salary/edit/:id",
    exact: true,
    auth: true,
    useHash: true,
    routeName: "EditSalary",
    component: EditSalary,
  },
  {
    path: "/employeeSalary",
    exact: true,
    auth: true,
    routeName: "Salary",
    component: EmployeeSalary,
  },

  {
    path: "/salarySearch",
    exact: true,
    auth: true,
    routeName: "Search Salary",
    component: salarySearch,
  },
  {
    path: "/contacts",
    exact: true,
    auth: true,
    routeName: "Contacts",
    component: Contacts,
  },
  {
    path: "/calendar",
    exact: true,
    auth: true,
    routeName: "Calendar",
    component: Calendar,
  },
  {
    path: "/rooms",
    exact: true,
    auth: true,
    routeName: "Rooms",
    component: Rooms
  },
  {
    path: "/employees",
    exact: true,
    auth: true,
    routeName: "EmployeesAll",
    component: EmployeesAll
  },
];
export default collectRoutes;
