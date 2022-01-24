import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class TicketApi extends AuthenticatedApi {
  getTicketInformations() {
    return api.get("/tickets", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  postTicketInformations(body) {
    return api.post("/tickets", body, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  updateTicketRoom(body, userId) {
    return api.post(`/rooms/${userId}`, body, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
