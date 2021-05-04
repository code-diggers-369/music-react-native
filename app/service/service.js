import TrackPlayer from 'react-native-track-player';
import {store} from '../redux/store';

let flag = false;

async function backgroundPlayback(track) {
  if (flag) return;
  flag = true;
  setTimeout(() => (flag = false), 250);
  await TrackPlayer.reset();
  await TrackPlayer.add(track);
  store.dispatch({type: 'current_track', payload: track});
  TrackPlayer.play();
  store.dispatch({type: 'set_playback', payload: true});
}

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
    // store.dispatch({type: 'set_playback', payload: true});
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
    // store.dispatch({type: 'set_playback', payload: false});
  });

  TrackPlayer.addEventListener('remote-next', async () => {
    let {playback, data} = store.getState();
    let {songs} = data;
    let {currentTrack, shuffle, queue} = playback;

    if (queue) {
      const index = queueSong.findIndex(
        data => data.index === currentTrack.index,
      );
      backgroundPlayback(
        shuffle
          ? queueSong[getRandomNumber(0, queueSong.length)]
          : index === queueSong.length - 1
          ? queueSong[0]
          : queueSong[index + 1],
      );
    } else {
      backgroundPlayback(
        shuffle
          ? songs[getRandomNumber(0, songs.length)]
          : currentTrack.index === songs.length - 1
          ? songs[0]
          : songs[currentTrack.index + 1],
      );
    }
  });

  TrackPlayer.addEventListener('remote-previous', async () => {
    let {playback, data} = store.getState();
    let {songs} = data;
    let {currentTrack, shuffle, queue} = playback;

    if (queue) {
      const index = queueSong.findIndex(
        data => data.index === currentTrack.index,
      );
      backgroundPlayback(
        shuffle
          ? queueSong[getRandomNumber(0, queueSong.length)]
          : index === 0
          ? queueSong[queueSong.length - 1]
          : queueSong[index - 1],
      );
    } else {
      backgroundPlayback(
        shuffle
          ? songs[getRandomNumber(0, songs.length)]
          : currentTrack.index === 0
          ? songs[songs.length - 1]
          : songs[currentTrack.index - 1],
      );
    }
  });

  TrackPlayer.addEventListener('playback-queue-ended', async ({position}) => {
    let {playback, data} = store.getState();
    let {songs} = data;
    let {currentTrack, shuffle, loop, queue, queueSong} = playback;

    if (position > 0) {
      if (loop) {
        backgroundPlayback(currentTrack);
      } else {
        if (queue) {
          const index = queueSong.findIndex(
            data => data.index === currentTrack.index,
          );

          backgroundPlayback(
            shuffle
              ? queueSong[getRandomNumber(0, queueSong.length)]
              : index === queueSong.length - 1
              ? queueSong[0]
              : queueSong[index + 1],
          );
        } else {
          backgroundPlayback(
            shuffle
              ? songs[getRandomNumber(0, songs.length)]
              : currentTrack.index === songs.length - 1
              ? songs[0]
              : songs[currentTrack.index + 1],
          );
        }
      }
    }
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
  });

  TrackPlayer.addEventListener('remote-duck', () => {
    TrackPlayer.pause();
  });
};
