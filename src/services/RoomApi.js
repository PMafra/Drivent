import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class RoomApi extends AuthenticatedApi {
  getRoomsInformations() {
    return api.get("/rooms", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
