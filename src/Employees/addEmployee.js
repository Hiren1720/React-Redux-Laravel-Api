import React, { Component, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Checkbox } from "@material-ui/core";
import ReeValidate from "ree-validate";
import classnames from "classnames";
import EmployeeService from "../_services/EmployeeServices";

const addEmployee = (props) => {
  console.log("PROPS", props)
  const { history } = props;
  const validator = new ReeValidate.Validator({
    name: "required|min:3|alpha_num",
    role: "required",
    email: "required|email",
    password: "required",
    phone: "required|numeric|digits:10",
    birthdate: "required",
    gender: "required",

    profile: "required",
    city: "required",
    address: "required",
  });

  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    phone: "",
    birthdate: "",
    gender: "",
    hobby: {
      reading: false,
      dancing: false,
      travelling: false,
      driving: false,
      photoGraphy: false,
    },
    profile: "",
    city: "",
    address: "",
  });

  let [errors, setErrors] = useState(validator.errors);
  // console.log("ERRORS Value",errors)
  const onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let { errors } = validator;
    errors.remove(name);
    setEmployee({ ...employee, [name]: value });
    validator.validate(name, value).then(() => {
      setErrors(errors);
    });
  };

  const getHobby = (e) => {
    if (!e) {
      errors.add({ field: "hobby", msg: "Required any one" });
      setErrors(errors);
    }
    let checked = e.target.checked;
    let name = e.target.name;
    if (checked == true) {
      employee.hobby[name] = checked;
      setEmployee({ ...employee });
    } else {
      employee.hobby[name] = checked;
      setEmployee({ ...employee });
      // setErrors({...errors},errors.hobby)
    }
    // console.log("EMPLOYEE HOBBY",employee.hobby)
  };
  const fileUpload = (e) => {
    const file = e.target.files[0];
    setEmployee({ ...employee, profile: file });
  };
  const validateAndSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    const { errors } = validator;
    const valid = validator.validateAll(employee);
    valid.then((success) => {
      if (success) {
        let hobbies = JSON.stringify(employee.hobby);

        setEmployee({ ...employee }, (employee.hobby = hobbies));
        for (let key in employee) {
          formData.append(key, employee[key]);
        }
        EmployeeService.createEmployee(formData).then((res) => {
          console.log("DATA", res.data);
          history.push("/employee");
        });
      } else {
        let hobbies = employee.hobby;
        console.log("emp", hobbies);
        let hobby = Object.keys(hobbies).filter((hobby) => hobbies[hobby]);
        if (hobby.length == 0) {
          errors.add({ field: "hobby", msg: "Required any one" });
          setErrors(errors);
          console.log("ERRORS", errors);
        }
      }
    });
  };

  let {
    name,
    role,
    email,
    password,
    phone,
    birthdate,
    gender,
    hobby,
    profile,
    city,
    address,
  } = employee;

  // console.log("ITEMS ERROR", errors);
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
                value={name}
                onChange={onChange}
              />
            </div>
            {errors.has("name") && (
              <div id="name-error" className="error text-danger" htmlFor="name">
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
              <div id="name-error" className="error text-danger" htmlFor="role">
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
                value={email}
                onChange={onChange}
              />
            </div>
          </div>
          {errors.has("email") && (
            <div id="name-error" className="error text-danger" htmlFor="email">
              {errors.first("email")}
            </div>
          )}
          <div
            className={classnames("form-group", {
              error: errors.has("password"),
            })}
          >
            <label>Password:</label>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            {errors.has("password") && (
              <div
                id="name-error"
                className="error text-danger"
                htmlFor="password"
              >
                {errors.first("password")}
              </div>
            )}
          </div>
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
                value={phone}
                onChange={onChange}
                placeholder="Phone"
              />
            </div>
          </div>
          {errors.has("phone") && (
            <div id="name-error" className="error text-danger" htmlFor="phone">
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
                value={birthdate}
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
          <div
            className={classnames("form-group clearfix", {
              error: errors.has("gender"),
            })}
          >
            <label>Gender:</label>
            <div className="icheck-primary d-inline">
              <input
                type="radio"
                id="Male"
                name="r1"
                name="gender"
                // value={gender}
                onChange={onChange}
                value="male"
              />
              <label htmlFor="Male">Male</label>
            </div>
            <div className="icheck-primary d-inline">
              <input
                type="radio"
                id="Female"
                name="r1"
                name="gender"
                // value={gender}
                onChange={onChange}
                value="female"
              />
              <label htmlFor="Female">Female</label>
            </div>
          </div>
          {errors.has("gender") && (
            <div id="name-error" className="error text-danger" htmlFor="gender">
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
                value="reading"
                onChange={getHobby}
                checked={hobby.reading}
              />
              <label htmlFor="reading">Reading</label>
            </div>
            <div className="icheck-danger d-inline">
              <input
                type="checkbox"
                id="dancing"
                name="dancing"
                value="dancing"
                onChange={getHobby}
                checked={hobby.dancinng}
              />
              <label htmlFor="dancing">Dancing</label>
            </div>
            <div className="icheck-danger d-inline">
              <input
                type="checkbox"
                id="travelling"
                name="travelling"
                value="travelling"
                onChange={getHobby}
                checked={hobby.travelling}
              />
              <label htmlFor="travelling">Travelling</label>
            </div>
            <div className="icheck-danger d-inline">
              <input
                type="checkbox"
                id="driving"
                name="driving"
                value="driving"
                onChange={getHobby}
                checked={hobby.driving}
              />
              <label htmlFor="driving">Driving</label>
            </div>
            <div className="icheck-danger d-inline">
              <input
                type="checkbox"
                id="photoGraphy"
                name="photoGraphy"
                value="photoGraphy"
                onChange={getHobby}
                checked={hobby.photoGraphy}
              />
              <label htmlFor="photoGraphy">PhotoGraphy</label>
            </div>
          </div>
          {errors.has("hobby") && (
            <div id="name-error" className="error text-danger" htmlFor="hobby">
              {errors.first("hobby")}
            </div>
          )}

          <div
            className={classnames("form-group", {
              error: errors.has("file"),
            })}
          >
            <label htmlFor="exampleInputFile">Profile</label>
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
                <label className="custom-file-label" htmlFor="exampleInputFile">
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
            <select name="city" className="form-control" onChange={onChange}>
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
              value={address}
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
              Submit
            </button>
            &nbsp;&nbsp;
            <Link to="/employee" className="btn btn-danger">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default addEmployee;
