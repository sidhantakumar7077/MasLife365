import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  var ud_json = await AsyncStorage.getItem('user_details');
  // console.log('getToken', ud_json);
  const user_detail = JSON.parse(ud_json);
  return user_detail.access_token;
};

export const getContentDetails = async (conent_id, STORE_ID) => {
  let token = await getToken();
  const headers = {Authorization: `Bearer ${token}`};
  console.log(conent_id, '/', STORE_ID, '/', headers);
  return axios.get(
    `https://markstreamingapi.icodexa.com/api/content-details-no-auth/${conent_id}/${STORE_ID}`,
    {
      headers,
    },
  );
};
