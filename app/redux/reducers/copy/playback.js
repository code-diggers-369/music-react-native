const INITIAL_STATE = {
  currentTrack: {
    id: '0',
    title: '',
    artist: '',
    duration: 0,
    artwork: '',
    url: '',
  },

  loop: true,
  shuffle: true,
  isPlaying: false,
  queue: false,
  queueSong: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'current_track':
      return {...state, currentTrack: action.payload};
    case 'set_loop':
      return {...state, loop: action.payload};
    case 'set_shuffle':
      return {...state, shuffle: action.payload};
    case 'set_playback':
      return {...state, isPlaying: action.payload};
    case 'SET_QUEUE':
      return {...state, queue: action.payload};
    case 'SET_QUEUE_SONG':
      return {...state, queueSong: action.payload};
    default:
      return state;
  }
}
