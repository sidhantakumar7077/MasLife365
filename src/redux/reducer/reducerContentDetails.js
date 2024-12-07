const CDTypes = {
  CD_ACTION_START: 'CD_ACTION_START',
  CD_FETCH_DATA: 'CD_FETCH_DATA',
  CD_FETCH_DATA_FAILED: 'CD_FETCH_DATA_FAILED',
  CD_ADD_DATA: 'CD_ADD_DATA',
};

const Initial_state = {
  loading: false,
  error_message: null,
  isSuccess: false,
  response: {},
};

const CDReducer = (state = Initial_state, action) => {
  switch (action.type) {
    case CDTypes.CD_ACTION_START:
      return {
        ...state,
        loading: true,
      };

    case CDTypes.CD_FETCH_DATA:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        response: action.payload,
      };

    case CDTypes.CD_FETCH_DATA_FAILED:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CDReducer;
