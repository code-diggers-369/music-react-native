const express = require('express');
// const spdl = require('spdl-core').default;
const Youtube = require('youtube-sr').default;
const ytdl = require('ytdl-core');
const cors = require('cors');
const ytMusic = require('node-youtube-music').default;

//
const app = express();
const port = process.env.PORT || 1212;

// use
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.listen(port, () => console.log(`running on ${port}`));

app.post('/fetchinfo', async (req, res, next) => {
  try {
    const {title, artistsName} = req.body;

    const searchData = await Youtube.search(`${title} ${artistsName}`, {
      type: 'video',
      limit: 7,
    });

    var tempObj = {};

    searchData.forEach(data => {
      const {duration} = data;

      if (duration <= 450000 && duration >= 180000) {
        tempObj = data;
        return;
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

app.post('/youtube-music', async (req, res, next) => {
  try {
    const {title, artistsName} = req.body;

    const musics = await ytMusic.searchMusics(`${title} ${artistsName}`);

    const info = await ytdl.getInfo(
      `https://www.youtube.com/watch?v=${musics[0].youtubeId}`,
    );
    const format = ytdl.chooseFormat(info.formats, {filter: 'audioonly'});

    res.json({
      url: format.url,
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
});
