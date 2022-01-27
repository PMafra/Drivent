import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class EventDayApi extends AuthenticatedApi {
  getEventDaysInformations() {
    return api.get("/event-days", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
