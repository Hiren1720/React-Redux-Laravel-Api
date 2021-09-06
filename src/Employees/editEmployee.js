import { Button, Checkbox } from "@material-ui/core";
import React, { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReeValidate from "ree-validate";
import EmployeeService from "../_services/EmployeeServices";
import classnames from "classnames";
const editEmployee = (props, { match }) => {
  let { id } = props.match.params;
  let { history } = props;
  const validator = new ReeValidate.Validator({
    name: "required|min:3|alpha_num",
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

  // console.log("EmplyeeEdit",employee)

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

  useEffect(
    () => {
      EmployeeService.getEmployeeById(id).then((res) => {
        let hobbies = JSON.parse(res.data.hobby);
        res.data.hobby = hobbies;
        setEmployee(res.data);
      });
    },
    [setEmployee],
    [employee]
  );
  // console.log("SET EMPLOYEE", employee);
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
  const validateAndSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    const { errors } = validator;
    const valid = validator.validateAll(employee);
    if (valid) {
      let hobbiesEdit = JSON.stringify(employee.hobby);
      setEmployee({ ...employee }, (employee.hobby = hobbiesEdit));
      for (let key in employee) {
        formData.append(key, employee[key]);
      }
      EmployeeService.updateEmployee(formData, id).then((res) => {
        // console.log("DATA", res.data);
        history.push("/employee")
      });
    } else {
      setErrors(errors);
    }
  };

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
    <div className="card-body row">
      <div className="col-5 text-center d-flex align-items-center justify-content-center">
        <div className="">
          <h2>
            Admin<strong>LTE</strong>
          </h2>
          <p className="lead mb-5">
            123 Testing Ave, Testtown, 9876 NA
            <br />
            Phone: +1 234 56789012
          </p>
        </div>
      </div>
      <div className="col-7">
        <form onSubmit={validateAndSubmit}>
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
                  checked={hobby.dancinng}
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
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Edit
              </button>
              &nbsp;&nbsp;
              <Link to="/employee" className="btn btn-danger">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default editEmployee;
