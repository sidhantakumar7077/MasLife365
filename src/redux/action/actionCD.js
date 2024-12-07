import {getContentDetails} from '../../services/apiHandler';

export const fetchCD = (conent_id, STORE_ID) => {
  return dispatch => {
    dispatch({type: 'CD_ACTION_START'});
    getContentDetails(conent_id, STORE_ID)
      .then(result => {
        console.log(result.data, 'resulttttttttttt');
        dispatch({
          type: 'CD_FETCH_DATA',
          payload: result.data,
        });
      })
      .catch(err => {
        dispatch({
          type: 'CD_FETCH_DATA_FAILED',
          payload: err.response.data.error,
        });
      });
  };
};
