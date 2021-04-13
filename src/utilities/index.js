import { AsyncStorage } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";


export const baseUrl = () => {
  return 'https://mhealthwebapi.azurewebsites.net/api';
};


export const storeToken = async (selectedValue) => {
  try {
    await AsyncStorage.setItem('token', selectedValue);
  } catch (error) {
  }
}


export const storeUserDetails = async (data) => {
  try {
    await AsyncStorage.setItem('user_email', data.email);
    await AsyncStorage.setItem('username', data.userName);
    await AsyncStorage.setItem('phone_number', data.phoneNumber);
    await AsyncStorage.setItem('role', data.role);
  } catch (error) {
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
//success, warning, info and danger
export const showTopNotification = (type, message, duration)=> {
  showMessage({
    message: message,
    type: type,
    duration: duration*1000,
    icon: type 
  });
}