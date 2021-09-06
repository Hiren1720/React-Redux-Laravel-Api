import React, { useCallback, useState, useEffect } from "react";
import CalendarService from "../_services/CalendarServices";
import Modal from "react-bootstrap";
const EditEvent = (props) => {
  console.log("PROPS ID", props);
  const id = props.publicId;
  //   const editEvents = props.editEvents;
  const updateEvent = props.updateEvent;
  //   console.log("PROPS ID", editEvents);
  //   console.log("PROPS ID", updateEvent);
  const [editEvents, setEditEvents] = useState({
    title: "",
    start: "",
    end: "",
    reminder_time: "",
  });
  useEffect(() => {
    CalendarService.getEventById(id).then((res) => {
      setEditEvents(res.data.event);
    });
  }, []);
  const { title, start, end, reminder_time } = editEvents;
  const onEditChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    editEvents[name] = value;
    setEditEvents(editEvents);
    updateEvent(editEvents);
  };
  const onSubmit = () => {
    updateEvent(editEvents);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            defaultValue={title}
            onChange={onEditChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Start_dateTime:</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Start"
            name="start"
            defaultValue={start}
            onChange={onEditChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label>End_DateTime:</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="End"
            name="end"
            defaultValue={end}
            onChange={onEditChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Reminder Time:</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Reminder Time"
            name="reminder_time"
            defaultValue={reminder_time}
            onChange={onEditChange}
          />
        </div>
      </div>
    </form>
  );
};
export default EditEvent;
