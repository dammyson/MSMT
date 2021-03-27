import { AsyncStorage } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";


export const loginbaseUrl = () => {
  return 'http://18.133.168.180:9090/';
};

export const baseUrl = () => {
  return 'http://18.133.168.180:6060/';
};

export const storeToken = async (selectedValue, email) => {
  try {
    await AsyncStorage.setItem('token', selectedValue);
    await AsyncStorage.setItem('user_email', email);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}

export const getToken = async () => {
  let token = await AsyncStorage.getItem('token')
  return token
};
export const getEmail = async () => {
  let user_email = await AsyncStorage.getItem('user_email')
  return  user_email
};

export const getUser = async () => {
  let user_email = await AsyncStorage.getItem('user')
  return  user_email
};

export const removeToken = async (selectedValue, email) => {
  try {
    // await AsyncStorage.removeItem('token');
    // await AsyncStorage.removeItem('user_email');
    await AsyncStorage.clear();
  } catch (error) {
    console.warn('AsyncStorage remove token error: ' + error.message);
  }
}

export const makeUrlStringFromObject = (data) => {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
   formBody = formBody.join("&");
  return formBody;
};

export const processResponse = (response) =>  {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}

export const showTopNotification = (type, message)=> {
  showMessage({
    message: message,
    type: type,
    duration: 5000,
    icon: type 
  });
}