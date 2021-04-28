const INITIAL_STATE = {
  songs: [],
  artists: [],
  albums: [],
  mediaLoaded: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCHED_SONGS':
      return {mediaLoaded: true, ...action.payload};
    default:
      return state;
  }
}
