import { axios } from "../http";
import {ApiUrl} from "./ApiUrl";
import {Event} from './ApiHelper';

class CalendarService {
  getEvent() {
    // console.log("EMPLOYEE", employee);
    return axios.get(`${ApiUrl.UserApiUrl}${Event.getEvent}`);
  }
  createEvent(calendarEvent) {
    // console.log(calendarEvent);
    return axios.post(`${ApiUrl.UserApiUrl}${Event.addEvent}`, calendarEvent);
  }

  getEventById(eventId) {
    return axios.get(`${ApiUrl.UserApiUrl}${Event.editEvent}${eventId}` );
  }

  updateEvent(event, eventId) {
    return axios.post(
        `${ApiUrl.UserApiUrl}${Event.updateEvent}${eventId}`,
      event
    );
  }

  deleteEvent(eventId) {
    return axios.delete(`${ApiUrl.UserApiUrl}${Event.deleteEvent}${eventId}`);
  }
  //   bulkDeleteEmployees(employees) {
  //     return axios.post(EMPLOYEE_API_BASE_URL + "/destroy", employees);
  //   }
}
export default new CalendarService();
