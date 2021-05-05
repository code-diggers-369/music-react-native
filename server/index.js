const express = require("express");
const fs = require("fs");
const spdl = require("spdl-core").default;
const Youtube = require("youtube-sr").default;
const ytdl = require("ytdl-core");

const app = express();

app.listen("1212", () => console.log("running on 1212"));

app.get("/info", async (req, res, next) => {
  try {
    const infos = await spdl.getInfo(
      "https://open.spotify.com/track/31EK0jck80H2ScUJlBWj9i?si=8287be9786b447e6"
    );

    const artistsName = infos.artists.map((data) => data).join("");

    const searchData = await Youtube.search(`${infos.title} ${artistsName}`, {
      type: "video",
      limit: 7,
    });

    const filterData = await searchData.filter((data) => {
      const duration = data.duration;
      if (duration <= 350000 && duration >= 180000) {
        return data;
      }
    });

    const sortData = await filterData.sort((a, b) => {
      if (a.duration > b.duration) {
        return 1;
      } else if (b.duration < a.duration) {
        return -1;
      }
      return 0;
    });

    const url = sortData[0].url;

    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { filter: "audioonly" });

    console.log(format.url);

    // spdl(infos.url).then(stream => {
    //   stream.on('end', () => console.log('Done!'));
    //   stream.pipe(fs.createWriteStream(`${infos.title}.mp3`));
    // });
  } catch (err) {
    console.log(err);
  }
});
