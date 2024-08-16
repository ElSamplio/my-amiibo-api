const express = require("express");
const app = express();
const router = express.Router();
const axios = require("axios");
const port = process.env.PORT || 3001;

router.get("/", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  axios
    .get("https://www.amiiboapi.com/api/amiibo")
    .then((response) => {
      const {
        data: { amiibo },
      } = response;
      const pageNumber = Number(page);
      const limitNumber = Number(limit);
      const startIndex = (pageNumber - 1) * limitNumber;
      const endIndex = startIndex + limitNumber;
      res.status(200).send(amiibo.slice(startIndex, endIndex));
    })
    .catch((err) => res.status(500).send(err));
});

app.use(router);

app.listen(port, async () => {
  console.log(`Server is running`);
});
