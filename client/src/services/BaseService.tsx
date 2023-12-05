import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { apiUrl } from '../config/constants';

type ConfigType = {
  [key: string]: any;
};

class BaseService {
  axiosInstance: any;
  config: ConfigType;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
    });

    this.config = this.getConfig();
  }

  getConfig = async (unauthed: boolean = false, headers?) => {
    const auth = await SecureStore.getItemAsync('jwt_token');
    let token = undefined;

    if (auth && unauthed !== true) {
      token = `Bearer ${auth}`;
    } /*else {
      // API Key
      token = 'avb068cbk2os5ujhodmt';
    }*/

    return {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? token : undefined,
        ...headers,
      },
    };
  };

  doRequest = async (config: ConfigType, callback?: (res: any) => void) => {
    const headers = config.headers;
    delete config.headers;
    const configData = {
      ...(await this.getConfig(config.unauthed, headers)),
      ...config,
    };

    return this.axiosInstance
      .request(configData)
      .then((response: any) => {
        if (callback) {
          callback(response);
        }

        if (config.data) {
          console.log(config.data);
        }
        console.log({ ...response.data });

        console.log(`${config.url.toUpperCase()} SUCCESS`);
        return {
          status: response?.status ? response.status : '',
          data: response?.data ? response.data : response,
        };
      })
      .catch((error: any) => {
        console.log(`${config.url.toUpperCase()} FAILURE`);
        if (config.data) {
          console.log(config.data);
        }
        console.log('error.status', error.response.status);
        console.log('error.data', error.response.data.msg);

        return {
          status: error?.response?.status || '',
          msg: error?.response?.data?.msg || '',
        };
      });
  };
}

export default BaseService;
