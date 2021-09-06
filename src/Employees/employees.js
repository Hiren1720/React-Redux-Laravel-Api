import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeServices from "../_services/EmployeeServices";
import swal from "sweetalert";
import { Checkbox } from "@material-ui/core";
import ReeValidate from "ree-validate";
import Pagination from "react-pagination-bootstrap";
import { Modal, Button } from "react-bootstrap";
import classnames from "classnames";

window.React = React;
const Employees = (props) => {
  let { history } = props;
  const [employees, setEmployees] = useState(null);
  const [current_page, setCurrent_page] = useState(1);
  const [total, setTotal] = useState();
  const [last_page, setLast_page] = useState();

  const validator = new ReeValidate.Validator({
    name: "required|min:3|max:6|alpha_num",
    role: "required",
    email: "required|email",
    phone: "required|numeric|digits:10",
    birthdate: "required",
    gender: "required",
    hobby: "required|length:6",
    profile: "required",
    city: "required",
    address: "required",
  });

  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: "",
    hobby: {
      reading: "",
      dancing: "",
      travelling: "",
      driving: "",
      photoGraphy: "",
    },
    profile: "",
    city: "",
    address: "",
  });

  let [errors, setErrors] = useState(validator.errors);

  const [modal, setModal] = useState({
    isOpen: false,
    id: "",
  });

  const toggleModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const [loading, setLoading] = useState(false);
  const closeModal = () => setModal({ ...modal, isOpen: false });

  const editClick = (event) => {
    let id = event.target.id;
    EmployeeServices.getEmployeeById(id).then((res) => {
      let hobbies = JSON.parse(res.data.hobby);
      res.data.hobby = hobbies;
      setEmployee(res.data);
    });
    setModal({ ...modal, isOpen: true, id: id });
  }

  const updateEmployee = (e) => {
    e.preventDefault();
    setLoading(true)
    let formData = new FormData();
    const { errors } = validator;
    let id = modal.id;
    const valid = validator.validateAll(employee);
    if (valid) {
      let hobbiesEdit = JSON.stringify(employee.hobby);
      setEmployee({ ...employee }, (employee.hobby = hobbiesEdit));
      for (let key in employee) {
        formData.append(key, employee[key]);
      }
      EmployeeServices.updateEmployee(formData, id).then((res) => {
        history.push("/employee")
        setModal({ ...modal, isOpen: false });
      });
    } else {
      setErrors(errors);
    }
  };

  const onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let { errors } = validator;
    errors.remove(name);
    // employee[name] = value;
    setEmployee({ ...employee, [name]: value });
    validator.validate(name, value).then(() => {
      setErrors(errors);
    });
  };

  const fileUpload = (e) => {
    const file = e.target.files[0];
    const value = e.target.value;
    if (file) {
      setEmployee({ ...employee, profile: file });
    } else {
      setEmployee(employee);
    }
  };
  const getValue = (e) => {
    let checked = e.target.checked;
    let name = e.target.name;

    if (checked == true) {
      employee.hobby[name] = checked;
      setEmployee({ ...employee });
    } else {
      employee.hobby[name] = checked;
      setEmployee({ ...employee });
    }
  };
  let perpage = 2;
  useEffect(
    () => {
      if (employees == null) {
        EmployeeServices.getEmployees(current_page).then((res) => {
          // console.log("PAGE all", res.data);
          setEmployees(res.data.employees.data);
          setCurrent_page(res.data.employees.current_page);
          setLast_page(res.data.employees.last_page);
          setTotal(res.data.employees.total);
        });
      }
    },
    [current_page],
    [employees]
  );

  const handleSearch = (page) => {
    EmployeeServices.getEmployees(page).then((res) => {
      // console.log("PAGE all", res.data);
      setEmployees(res.data.employees.data);
      setCurrent_page(res.data.employees.current_page);
      setLast_page(res.data.employees.last_page);
      setTotal(res.data.employees.total);
    });
  };

  const onClick = (event) => {
    let id = event.target.id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        EmployeeServices.deleteEmployee(id).then((res) => {
          setEmployees(res.data);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  const [checked, setChecked] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const chceckAll = (e) => {
    let check = e.target.checked;
    console.log("CHECKED", check)
    if (check == false) {
      setChecked(true);
      setCheckedAll(true);
    } else if (check == true) {
      setChecked(false);
      setCheckedAll(false);
    }
  }
  const checkChange = (e) => {
    let _check = e.target.checked;
    console.log("CHECK--->", _check)
    if (_check == false) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }
  let {
    name,
    role,
    email,
    phone,
    birthdate,
    gender,
    hobby,
    profile,
    city,
    address,
  } = employee;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card-body">
            <table className="table table-hover table-responsive">
              <thead>
                <tr>
                  <th><input type="checkbox" name="checkAll" checked={checkedAll ? true : false} onChange={chceckAll} /></th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Birth Date</th>
                  <th>Gneder</th>
                  <th>Hobby</th>
                  <th>Profile</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees != null &&
                  employees.length > 0 &&
                  employees.map((item, index) => (
                    <tr key={index}>
                      <td><input type="checkbox" name="check" value={item.id} checked={checked} onChange={checkChange} /></td>
                      <td>{item.name}</td>
                      <td>{item.role}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.birthdate}</td>
                      <td>{item.gender}</td>
                      <td>
                        {/* {item.hobby} */}
                        {Object.keys(JSON.parse(item.hobby)).filter(
                          (hobby) => JSON.parse(item.hobby)[hobby]
                        ) + ""}
                      </td>
                      <td>
                        <img src={item.profile_url} width="50" height="50" />
                      </td>
                      <td>{item.city}</td>
                      <td>{item.address}</td>
                      <td>
                        <Link to={`/addsalary/${item.id}`}>
                          <i
                            className="far fa-plus-square fa-2x text-info"
                            title="Add Salary"
                          ></i>
                        </Link>
                        &nbsp;
                        <Link to={`/salary/report/${item.id}`}>
                          <i
                            className="fas fa-money-bill-alt fa-2x text-warning"
                            title="Salary Report"
                          ></i>
                        </Link>
                        &nbsp;
                        {/* <Link to={`/employee/edit/${item.id}`}> */}
                        <i
                          className="fas fa-edit fa-2x text-success"
                          title="Edit Employee"
                          id={item.id}
                          onClick={editClick}
                        ></i>
                        {/* </Link> */}
                        &nbsp;
                        <i
                          className="fas fa-trash-alt fa-2x text-danger"
                          id={item.id}
                          onClick={onClick}
                          title="Delete Employee"
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <Pagination
              activePage={current_page}
              totalItemsCount={total}
              itemsCountPerPage={perpage}
              totalItemsCount={6}
              pageRangeDisplayed={5}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <Modal show={modal.isOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Salary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="card-body">
              <div
                className={classnames("form-group", {
                  error: errors.has("name"),
                })}
              >
                <label>Name:</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    defaultValue={name}
                    onChange={onChange}
                  />
                </div>
                {errors.has("name") && (
                  <div
                    id="name-error"
                    className="error text-danger"
                    htmlFor="name"
                  >
                    {errors.first("name")}
                  </div>
                )}
              </div>
              <div
                className={classnames("form-group", {
                  error: errors.has("role"),
                })}
              >
                <label>Role:</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Role"
                    name="role"
                    value={role}
                    onChange={onChange}
                  />
                </div>
                {errors.has("role") && (
                  <div
                    id="name-error"
                    className="error text-danger"
                    htmlFor="role"
                  >
                    {errors.first("role")}
                  </div>
                )}
              </div>
              <div
                className={classnames("form-group", {
                  error: errors.has("email"),
                })}
              >
                <label>Email:</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    defaultValue={email}
                    onChange={onChange}
                  />
                </div>
              </div>
              {errors.has("email") && (
                <div
                  id="name-error"
                  className="error text-danger"
                  htmlFor="email"
                >
                  {errors.first("email")}
                </div>
              )}

              <div
                className={classnames("form-group", {
                  error: errors.has("phone"),
                })}
              >
                <label>Phone:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-phone"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    data-mask
                    name="phone"
                    defaultValue={phone}
                    onChange={onChange}
                  />
                </div>
              </div>
              {errors.has("phone") && (
                <div
                  id="name-error"
                  className="error text-danger"
                  htmlFor="phone"
                >
                  {errors.first("phone")}
                </div>
              )}
              <div
                className={classnames("form-group", {
                  error: errors.has("birthdate"),
                })}
              >
                <label>Birthdate:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="far fa-calendar-alt"></i>
                    </span>
                  </div>
                  <input
                    type="date"
                    className="form-control"
                    data-inputmask-alias="datetime"
                    data-inputmask-inputformat="dd/mm/yyyy"
                    data-mask
                    name="birthdate"
                    defaultValue={birthdate}
                    onChange={onChange}
                  />
                </div>
              </div>
              {errors.has("birthdate") && (
                <div
                  id="name-error"
                  className="error text-danger"
                  htmlFor="birthdate"
                >
                  {errors.first("birthdate")}
                </div>
              )}
              <label>Gender:</label>
              <div
                className={classnames("form-group clearfix", {
                  error: errors.has("gender"),
                })}
              >
                <div className="icheck-primary d-inline">
                  <input
                    type="radio"
                    id="Male"
                    name="gender"
                    onChange={onChange}
                    value="male"
                    checked={gender === "male"}
                  />
                  <label htmlFor="Male">Male</label>
                </div>
                <div className="icheck-primary d-inline">
                  <input
                    type="radio"
                    id="Female"
                    name="gender"
                    onChange={onChange}
                    value="female"
                    checked={gender === "female"}
                  />
                  <label htmlFor="Female">Female</label>
                </div>
              </div>
              {errors.has("gender") && (
                <div
                  id="name-error"
                  className="error text-danger"
                  htmlFor="gender"
                >
                  {errors.first("gender")}
                </div>
              )}
              <label>Hobby:</label>
              <div
                className={classnames("form-group clearfix", {
                  error: errors.has("hobby"),
                })}
              >
                <div className="icheck-danger d-inline">
                  <input
                    type="checkbox"
                    id="reading"
                    name="reading"
                    defaultValue="reading"
                    onChange={getValue}
                    checked={hobby.reading}
                  />
                  <label htmlFor="reading">Reading</label>
                </div>
                <div className="icheck-danger d-inline">
                  <input
                    type="checkbox"
                    id="dancing"
                    name="dancing"
                    defaultValue="dancing"
                    onChange={getValue}
                    checked={hobby.dancing}
                  />
                  <label htmlFor="dancing">Dancing</label>
                </div>
                <div className="icheck-danger d-inline">
                  <input
                    type="checkbox"
                    id="travelling"
                    name="travelling"
                    defaultValue="travelling"
                    onChange={getValue}
                    checked={hobby.travelling}
                  />
                  <label htmlFor="travelling">Travelling</label>
                </div>
                <div className="icheck-danger d-inline">
                  <input
                    type="checkbox"
                    id="driving"
                    name="driving"
                    defaultValue="driving"
                    onChange={getValue}
                    checked={hobby.driving}
                  />
                  <label htmlFor="driving">Driving</label>
                </div>
                <div className="icheck-danger d-inline">
                  <input
                    type="checkbox"
                    id="photoGraphy"
                    name="photoGraphy"
                    defaultValue="photoGraphy"
                    onChange={getValue}
                    checked={hobby.photoGraphy}
                  />
                  <label htmlFor="photoGraphy">PhotoGraphy</label>
                </div>
              </div>
              {errors.has("hobby") && (
                <div
                  id="name-error"
                  className="error text-danger"
                  htmlFor="hobby"
                >
                  {errors.first("hobby")}
                </div>
              )}

              <div
                className={classnames("form-group", {
                  error: errors.has("file"),
                })}
              >
                <label htmlFor="exampleInputFile">File input</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="exampleInputFile"
                      name="profile"
                      defaultValue={profile}
                      onChange={fileUpload}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="exampleInputFile"
                    >
                      Choose file
                    </label>
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text">Upload</span>
                  </div>
                </div>
              </div>
              {errors.has("file") && (
                <div
                  id="name-error"
                  className="error text-danger"
                  htmlFor="profile"
                >
                  {errors.first("file")}
                </div>
              )}
              <div
                className={classnames("form-group", {
                  error: errors.has("city"),
                })}
              >
                <label>City:</label>
                <select
                  name="city"
                  value={city}
                  className="form-control"
                  onChange={onChange}
                >
                  <option>--Please Select City--</option>
                  <option value="Surat">Surat</option>
                  <option value="Rajkot">Rajkot</option>
                  <option value="Junagadh">Junagadh</option>
                  <option value="Ahemedabad">Ahemedabad</option>
                  <option value="Amreli">Amreli</option>
                </select>
              </div>

              {errors.has("city") && (
                <div id="name-error" className="error text-danger" htmlFor="city">
                  {errors.first("city")}
                </div>
              )}
              <div
                className={classnames("form-group", {
                  error: errors.has("address"),
                })}
              >
                <label>Address:</label>
                <textarea
                  name="address"
                  defaultValue={address}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              {errors.has("address") && (
                <div
                  id="name-error"
                  className="error text-danger"
                  htmlFor="address"
                >
                  {errors.first("address")}
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" id={modal.id} onClick={updateEmployee}>
            {loading ? <i className="fas fa-circle-notch fa-spin" /> : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Employees;
