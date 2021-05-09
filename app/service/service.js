import {Alert} from 'react-native';
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

async function nextTrack() {
  let {playback, data} = store.getState();
  let {currentTrack, shuffle, queue, queueSong} = playback;

  if (queueSong.length <= 1) {
    return;
  }

  const index = queueSong.findIndex(
    // data => data.index === currentTrack.index,
    data => data.id === currentTrack.id,
  );

  backgroundPlayback(
    shuffle
      ? queueSong[getRandomNumber(0, queueSong.length)]
      : index === queueSong.length - 1
      ? queueSong[0]
      : queueSong[index + 1],
  );
}

async function previousTrack() {
  let {playback, data} = store.getState();
  let {currentTrack, shuffle, queue, queueSong} = playback;

  if (queueSong.length <= 1) {
    return;
  }

  const index = queueSong.findIndex(
    // data => data.index === currentTrack.index,
    data => data.id === currentTrack.id,
  );

  backgroundPlayback(
    shuffle
      ? queueSong[getRandomNumber(0, queueSong.length)]
      : index === 0
      ? queueSong[queueSong.length - 1]
      : queueSong[index - 1],
  );
}

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
    store.dispatch({type: 'set_playback', payload: true});
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
    store.dispatch({type: 'set_playback', payload: false});
  });

  TrackPlayer.addEventListener('remote-next', async () => {
    try {
      await nextTrack();
    } catch (err) {
      console.log(err);
    }
  });

  TrackPlayer.addEventListener('remote-previous', async () => {
    try {
      await previousTrack();
    } catch (err) {
      console.log(err);
    }
  });

  TrackPlayer.addEventListener('playback-queue-ended', async ({position}) => {
    let {playback} = store.getState();
    let {currentTrack, shuffle, loop, queue, queueSong} = playback;

    if (position > 0) {
      if (loop) {
        backgroundPlayback(currentTrack);
      } else {
        if (queueSong.length <= 1) {
          return;
        }

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
      }
    }
  });

  TrackPlayer.addEventListener('remote-skip', data => {
    console.log(data);
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    // TrackPlayer.destroy();
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener('remote-duck', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('playback-error', async data => {
    try {
      let {playback, data} = store.getState();
      let {currentTrack, queueSong} = playback;

      const songIndex = queueSong.findIndex(
        data => data.id === currentTrack.id,
      );

      const tempData = queueSong.filter((list, index) => {
        if (index != songIndex) {
          return list;
        }
      });

      await store.dispatch({type: 'REMOVE_SONG_FROM_QUEUE', payload: tempData});

      if (queueSong.length < 2) {
        await TrackPlayer.stop();
      } else {
        await TrackPlayer.remove(currentTrack.id);

        if (queueSong.length - 1 > songIndex) {
          await previousTrack();
        } else {
          await nextTrack();
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
};

function getRandomNumber(starting, ending) {
  return Math.floor(Math.random() * ending);
}
