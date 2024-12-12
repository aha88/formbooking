import axios from "axios";

export const apiservice = async () => {
  try {
    const response = await axios.get(`https://api.tgv.com.my/api/movies/v1/movielist/nowselling`);
    return response.data.results;
  } catch (err) {
    return err;
  }
};
