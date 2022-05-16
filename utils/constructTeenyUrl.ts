import { ROOT_URL } from "../constants";

const constructTeenyUrl = (emojis: string) => {
  return `${ROOT_URL}/${emojis}`;
}

export default constructTeenyUrl;