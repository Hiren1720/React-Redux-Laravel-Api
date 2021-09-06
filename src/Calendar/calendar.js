import React, { useCallback, useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
import swal from "@sweetalert/with-react";
import CalendarService from "../_services/CalendarServices";
import EditEvent from "./EditEvent";
import { Modal, Button } from "react-bootstrap";
const Calendar = (props) => {
  let eventGuid = 0;
  let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
  let date = "2021-07-18 15:30:00";
  const [INITIAL_EVENTS, setINITIAL_EVENTS] = useState([
    {
      id: 0,
      title: "All-day event",
      start: todayStr,
    },
  ]);
  const [events, setEvents] = useState(null);

  function createEventId() {
    return String(eventGuid++);
  }
  useEffect(() => {
    // if (events == null) {
    CalendarService.getEvent().then((res) => {
      // console.log("res----", res.data);
      setINITIAL_EVENTS(INITIAL_EVENTS.concat(res.data.events));
    });
    // }
  }, []);
  // console.log("EVENTS", events);
  // console.log("INITIAL_EVENTS", INITIAL_EVENTS);

  const [calendarEvent, setCalendarEvent] = useState({
    title: "",
    start: "",
    end: "",
    reminder_time: "",
  });
  const { history } = props;
  const dateClick = (selectInfo) => {
    let startDate = selectInfo.start,
      startDateformat =
        [
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate(),
        ].join("-") +
        " " +
        [
          startDate.getHours(),
          startDate.getMinutes(),
          startDate.getSeconds(),
        ].join(":");
    let endDate = selectInfo.end,
      endDateformat =
        [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()].join(
          "-"
        ) +
        " " +
        [endDate.getHours(), endDate.getMinutes(), endDate.getSeconds()].join(
          ":"
        );
    calendarEvent["start"] = startDateformat;
    calendarEvent["end"] = endDateformat;
    setCalendarEvent(calendarEvent);

    const onChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      console.log("EVENT", name, value);
      calendarEvent[name] = value;
      setCalendarEvent(calendarEvent);
      console.log("EVENT TITLE", calendarEvent);
    };

    const { title, start, end, reminder_time } = calendarEvent;
    console.log("EVENT NAME", title);
    swal({
      title: "New Event",
      content: (
        <form method="post">
          <div className="form-group">
            <label>Title:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="title"
                defaultValue={title}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Start:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="start"
                defaultValue={start}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>End:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="end"
                defaultValue={end}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Reminder Time:</label>
            <div className="input-group mb-3">
              <input
                type="time"
                className="form-control"
                name="reminder_time"
                defaultValue={reminder_time}
                onChange={onChange}
              />
            </div>
          </div>
        </form>
      ),
    }).then((result) => {
      if (result == true) {
        let formData = new FormData();
        for (let key in calendarEvent) {
          formData.append(key, calendarEvent[key]);
        }
        CalendarService.createEvent(formData).then((res) => {
          // window.location.href = "/";
          // console.log("CREATE RESPONSE", res);
          setINITIAL_EVENTS(INITIAL_EVENTS.concat(res.data.event));
          history.push("/calendar")
        });
      }
    });
  };
  const [editEvents, setEditEvents] = useState({
    title: "",
    start: "",
    end: "",
    reminder_time: "",
  });

  const onEditChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    editEvents[name] = value;
    setEditEvents(editEvents);
  };
  const { title, start, end, reminder_time } = editEvents;

  const [modal, setModal] = useState({
    isOpen: false,
    id: "",
  });

  const openModal = ({ event }) => {
    let { publicId } = event._def;

    CalendarService.getEventById(publicId).then((res) => {
      setEditEvents(res.data.event);
    });
    setModal({ ...modal, isOpen: true, id: publicId });
  };
  const closeModal = () => setModal({ ...modal, isOpen: false });
  const updateEvent = (event) => {
    let id = event.target.id;
    let formData = new FormData();
    for (let key in editEvents) {
      formData.append(key, editEvents[key]);
    }
    CalendarService.updateEvent(formData, id).then((res) => {
      INITIAL_EVENTS[res.data.events.id] = res.data.events;
      setINITIAL_EVENTS(INITIAL_EVENTS);
      history.push("/calendar")

    });
    setModal({ ...modal, isOpen: false });
  };
  const eventDelete = (event) => {
    console.log("EVENT", event.target.id);
    let id = event.target.id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        CalendarService.deleteEvent(id).then((res) => {
          setINITIAL_EVENTS(
            INITIAL_EVENTS.filter((INITIAL_EVENTS) => INITIAL_EVENTS.id != id)
          );
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    setModal({ ...modal, isOpen: false });
  };
  const toggleModal = () => {
    setModal({ ...modal, isOpen: false });
  };
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="sticky-top mb-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Events</h4>
            </div>
            <div className="card-body">
              {INITIAL_EVENTS != null &&
                INITIAL_EVENTS.length > 0 &&
                INITIAL_EVENTS.map((event, index) => (
                  <div
                    className="external-event bg-success navbar navbar-expand "
                    key={index}
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <div className="card card-primary">
          <div className="card-body p-0">
            {/* <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              weekends={true}
              dayMaxEvents={true}
              select={dateClick}
              events={INITIAL_EVENTS}
              // eventContent={renderEventContent}
              eventClick={openModal}
            // eventsSet={handleEvents}
            /> */}
          </div>
        </div>
      </div>
      <Modal show={modal.isOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
                  type="time"
                  className="form-control"
                  placeholder="Reminder Time"
                  name="reminder_time"
                  defaultValue={reminder_time}
                  onChange={onEditChange}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" id={modal.id} onClick={updateEvent}>
            Update
          </Button>
          <Button variant="danger" onClick={eventDelete} id={modal.id}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Calendar;
