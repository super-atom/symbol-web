import { DEFAULT_PROFILE_IMAGE } from "../settings/constant";

const handleBrokenImage = e => {
  e.target.src = DEFAULT_PROFILE_IMAGE;
  e.target.onerror = null;
};

export default handleBrokenImage;
