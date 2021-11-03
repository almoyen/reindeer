const url = "http://localhost:5000";
const BACKEND_PIN = "api";

export const end_points = {
  getallItems: `${url}/${BACKEND_PIN}/menus`,
  getTrainModel: "https://rata.digitraffic.fi/api/v1/live-trains?version=0",
  getAllCities: `${url}/${BACKEND_PIN}/cities`,
  getAllOptions: `${url}/${BACKEND_PIN}/options`,
};
