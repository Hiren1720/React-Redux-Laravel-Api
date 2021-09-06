import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeServices from "../_services/EmployeeServices";
import swal from "sweetalert";
import Pagination from "react-pagination-bootstrap";
const Rooms = () => {
    const [employees, setEmployees] = useState(null);
    const [current_page, setCurrent_page] = useState(1);
    const [total, setTotal] = useState();
    const [last_page, setLast_page] = useState();

    let perpage = 2;
    //   useEffect(
    //     () => {
    //       if (employees == null) {
    //         EmployeeServices.getEmployees().then((res) => {
    //           setEmployees(res.data.employees.data);
    //           setCurrent_page(res.data.employees.current_page);
    //           setLast_page(res.data.employees.last_page);
    //           setTotal(res.data.employees.total);
    //         });
    //       }
    //     },
    //     [current_page],
    //     [employees]
    //   );
    //   const handleSearch = (page) => {
    //     EmployeeServices.getEmployees(page).then((res) => {
    //       console.log("PAGE all", res.data);
    //       setEmployees(res.data.employees.data);
    //       setCurrent_page(res.data.employees.current_page);
    //       setLast_page(res.data.employees.last_page);
    //       setTotal(res.data.employees.total);
    //     });
    //   };
    //   const onClick = (event) => {
    //     let id = event.target.id;
    //     swal({
    //       title: "Are you sure?",
    //       text: "Once deleted, you will not be able to recover this imaginary file!",
    //       icon: "warning",
    //       buttons: true,
    //       dangerMode: true,
    //     }).then((willDelete) => {
    //       if (willDelete) {
    //         EmployeeServices.deleteEmployee(id).then((res) => {
    //           setEmployees(res.data);
    //         });
    //         swal("Poof! Your imaginary file has been deleted!", {
    //           icon: "success",
    //         });
    //       } else {
    //         swal("Your imaginary file is safe!");
    //       }
    //     });
    //   };
    return (
        <div className="row">
            <div className="card bg-light d-flex flex-fill">
                <div className="card-header text-muted border-bottom-0">
                    Digital Strategist
                </div>
                <div className="card-body pt-0">
                    <div className="row">
                        <div className="col-7">
                            <h2 className="lead">

                            </h2>
                            <p className="text-muted text-sm">

                            </p>
                            <ul className="ml-4 mb-0 fa-ul text-muted">
                                <li className="small">
                                    <span className="fa-li">
                                        <i className="fa fa-calendar"></i>
                                    </span>{" "}

                                </li>
                                <li className="small">
                                    <span className="fa-li">
                                        <i className="fas fa-lg fa-building"></i>
                                    </span>{" "}
                                    <strong>Address:</strong>

                                </li>
                                <li className="small">
                                    <span className="fa-li">
                                        <i className="fas fa-lg fa-phone"></i>
                                    </span>{" "}

                                </li>
                                <li className="small">
                                    <span className="fa-li">
                                        <i className="fa fa-envelope"></i>
                                    </span>{" "}

                                </li>
                                <li className="small">
                                    <span className="fa-li">
                                        <i className="fa fa-star"></i>
                                    </span>{" "}
                                    <strong>Hobby:</strong>

                                </li>
                            </ul>
                        </div>
                        {/* <div className="col-5 text-center">
                            <img
                                src={item.profile_url}
                                alt="user-avatar"
                                className="img-circle"
                                width="100"
                                height="100"
                            />
                        </div> */}
                    </div>
                </div>
                <div className="card-footer">
                    <div className="text-right">
                        &nbsp;
                        {/* <Link to={`/salary/report/${item.id}`}> */}
                        <i
                            className="fas fa-money-bill-alt fa-2x text-warning"
                            title="Salary Report"
                        ></i>
                        {/* </Link> */}
                        &nbsp; &nbsp;
                        <i
                            className="fas fa-trash-alt fa-2x text-danger"
                            // id={item.id}
                            // onClick={onClick}
                            title="Delete Employee"
                        ></i>
                    </div>
                </div>
            </div>

            {/* <Pagination
        activePage={current_page}
        totalItemsCount={total}
        itemsCountPerPage={perpage}
        totalItemsCount={6}
        pageRangeDisplayed={5}
        onChange={handleSearch}
      /> */}
        </div>
    );
};
export default Rooms;
