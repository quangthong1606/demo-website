import { API_ENDPOINTS } from "@/rest/api-endpoints";
import { HttpClient } from "@/rest/http-client";
import { HomeResponse } from "@/types/menu";

class HomeModule {
  home = {
    getDataHomePage: () =>
      HttpClient.get<HomeResponse>(`${API_ENDPOINTS.HOME}`),
  };
}

const homeModule = new HomeModule();

export default homeModule;
