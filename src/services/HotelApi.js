import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class HotelApi extends AuthenticatedApi {
  getHotelsInformations() {
    return api.get("/hotels", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
