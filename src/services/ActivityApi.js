import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class ActivityApi extends AuthenticatedApi {
  getEventDayActivities( eventDayId ) {
    return api.get(`/activities/${eventDayId}`, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
