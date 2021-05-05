const INITIAL_STATE = {
  recentlyPlayed: [],
  mostPlayed: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'RECENTLY_PLAYED': {
      let arr = [...state.recentlyPlayed];
      let index = arr.findIndex(data => data.title === action.payload.title);
      if (index !== -1) {
      } else {
        state.recentlyPlayed = [
          ...state.recentlyPlayed,
          action.payload,
        ].reverse();
      }
      return state;
    }

    case 'MOST_PLAYED': {
      let arr = [...state.mostPlayed];
      let index = arr.findIndex(
        data => data.currentTrack.title === action.payload.currentTrack.title,
      );
      if (index !== -1) {
        arr[index].count = arr[index].count + 1;
        return {...state, mostPlayed: arr};
      } else {
        state.mostPlayed = [...state.mostPlayed, action.payload];
      }
      return state;
    }

    default:
      return state;
  }
}
