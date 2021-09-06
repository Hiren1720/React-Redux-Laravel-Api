import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import EmployeeServices from "../_services/EmployeeServices";
import LoginService from "../_services/LoginService";

const Dashboard = (props) => {
  const [totalEmployees, setTotalEmployees] = useState("");
  const [countEmployees, setCountEmployees] = useState("");
  useEffect(() => {
    const type = localStorage.getItem("type");
    if (type == "Admin") {
      EmployeeServices.getCountEmployees().then((res) => {
        //   console.log("count", res);
        setCountEmployees(res.data.countEmployees);
        setTotalEmployees(res.data.totalEmployees);
      });
    }
  }, [totalEmployees]);

  return (
    <div className="row">
      <div className="col-lg-3 col-6">
        <div className="small-box bg-info">
          <div className="inner">
            <h3>{countEmployees}</h3>

            <p>My Employees</p>
          </div>
          <div className="icon">
            <i className="fa fa-users"></i>
          </div>
          <Link to="/employee" className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right"></i>
          </Link>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="small-box bg-success">
          <div className="inner">
            <h3>
              53<sup style={{ fontSize: 20 }}>%</sup>
            </h3>

            <p>Bounce Rate</p>
          </div>
          <div className="icon">
            <i className="ion ion-stats-bars"></i>
          </div>
          <a href="#" className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right"></i>
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="small-box bg-warning">
          <div className="inner">
            <h3>{totalEmployees}</h3>

            <p>Total Employees</p>
          </div>
          <div className="icon">
            <i className="ion ion-person-add"></i>
          </div>
          <Link to="/employees" className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right"></i>
          </Link>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="small-box bg-danger">
          <div className="inner">
            <h3>65</h3>

            <p>Unique Visitors</p>
          </div>
          <div className="icon">
            <i className="ion ion-pie-graph"></i>
          </div>
          <a href="#" className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
