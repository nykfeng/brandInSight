// const axios = require("axios");
import axios from 'axios';

const postReq = function (url, reqData) {
  axios({
    method: "POST",
    url: url,
    data: {
      reqData,
    },
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  console.log(url, reqData);
};

export default {
  postReq,
};
