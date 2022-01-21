import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class TicketApi extends AuthenticatedApi {
  getTicketInformations() {
    return api.get("/tickets", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
