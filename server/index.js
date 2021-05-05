const express = require('express');
const fs = require('fs');
const spdl = require('spdl-core').default;
const Youtube = require('youtube-sr').default;
const ytdl = require('ytdl-core');
const cors = require('cors');
const port = process.env.PORT || 1212;

//
const app = express();

// use
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.listen(port, () => console.log(`running on ${port}`));

app.get('/info', async (req, res, next) => {
  try {
    // const infos = await spdl.getInfo(
    //   'https://open.spotify.com/track/31EK0jck80H2ScUJlBWj9i?si=8287be9786b447e6',
    // );

    // const artistsName = infos.artists.map(data => data).join('');

    // const searchData = await Youtube.search(`${infos.title} ${artistsName}`, {
    //   type: 'video',
    //   limit: 7,
    // });

    const {title, artistsName} = req.body;

    const searchData = await Youtube.search(`${title} ${artistsName}`, {
      type: 'video',
      limit: 7,
    });

    var maxDuration = 0;
    var tempObj = {};

    searchData.forEach(data => {
      const {duration} = data;

      if (duration <= 350000 && duration >= 180000 && maxDuration < duration) {
        maxDuration = duration;
        tempObj = data;
      }
    });

    const info = await ytdl.getInfo(tempObj.url);
    const format = ytdl.chooseFormat(info.formats, {filter: 'audioonly'});

    res.json({
      url: format.url,
    });
  } catch (err) {
    console.log(err);
  }
});
