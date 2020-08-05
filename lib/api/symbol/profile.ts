import axios from "axios";

import { SYMBOL_API_URL } from "../../settings/constant";
import { getFilterQuery } from "../../utils/getQuery";

const ProfileAPI = {
  all: (page, limit = 10, order = 'ASC', sortBy = 'createdAt') =>
    axios.get(`${SYMBOL_API_URL}/profiles?${getFilterQuery(limit, page, order, sortBy)}`),

  create: async (profiles, token) => {
    const { data, status } = await axios.post(
      `${SYMBOL_API_URL}/profiles`,
      JSON.stringify({ profiles }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
    return {
      data,
      status,
    };
  },

  update: async (profiles, token) => {
    const { data, status } = await axios.put(
      `${SYMBOL_API_URL}/profiles/${profiles.slug}`,
      JSON.stringify({ profiles }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
    return {
      data,
      status,
    };
  },

  delete: (id, token) =>
    axios.delete(`${SYMBOL_API_URL}/profiles/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  get: (slug) => axios.get(`${SYMBOL_API_URL}/profiles/${slug}`),
};

export default ProfileAPI;
