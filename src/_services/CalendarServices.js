import { axios } from "../http";

const CALENDAR_EVENT_API_BASE_URL = "http://localhost:8000/api/event";

class CalendarService {
  getEvent() {
    // console.log("EMPLOYEE", employee);
    return axios.get(CALENDAR_EVENT_API_BASE_URL);
  }
  createEvent(calendarEvent) {
    // console.log(calendarEvent);
    return axios.post(CALENDAR_EVENT_API_BASE_URL + "/store", calendarEvent);
  }

  getEventById(eventId) {
    return axios.get(CALENDAR_EVENT_API_BASE_URL + "/edit/" + eventId);
  }

  updateEvent(event, eventId) {
    return axios.post(
      CALENDAR_EVENT_API_BASE_URL + "/update/" + eventId,
      event
    );
  }

  deleteEvent(eventId) {
    return axios.delete(CALENDAR_EVENT_API_BASE_URL + "/destroy/" + eventId);
  }
  //   bulkDeleteEmployees(employees) {
  //     return axios.post(EMPLOYEE_API_BASE_URL + "/destroy", employees);
  //   }
}
export default new CalendarService();
