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

  confirmPayment() {
    return api.post("/tickets/payment", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  updateTicketRoom(body, userId) {
    return api.post(`/rooms/${userId}`, body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
