import EventApi from "../services/EventApi";
import UserApi from "../services/UserApi";
import AuthApi from "../services/auth";
import CepApi from "../services/CepApi";
import EnrollmentApi from "../services/EnrollmentApi";
import TicketApi from "../services/TicketApi";
import HotelApi from "../services/HotelApi";
import RoomApi from "../services/RoomApi";
import EventDayApi from "../services/EventDayApi";
import ActivityApi from "../services/ActivityApi";

export default function useApi() {
  return {
    event: new EventApi(),
    user: new UserApi(),
    auth: new AuthApi(),
    cep: new CepApi(),
    enrollment: new EnrollmentApi(),
    ticket: new TicketApi(),
    hotel: new HotelApi(),
    room: new RoomApi(),
    eventDay: new EventDayApi(),
    activity: new ActivityApi(),
  };
}
