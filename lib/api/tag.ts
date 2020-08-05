import axios from "axios";

import { SERVER_BASE_URL } from "../settings/constant";

const TagAPI = {
  getAll: () => axios.get(`${SERVER_BASE_URL}/tags`),
};
export default TagAPI;
