import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class TicketApi extends AuthenticatedApi {
  getEventDayActivities( eventDayId ) {
    return api.get(`/activities/${eventDayId}`, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
