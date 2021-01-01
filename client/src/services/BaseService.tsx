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

  getConfig = async (unauthed: boolean = false) => {
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
      },
    };
  }

  doRequest = async (config: ConfigType, callback?: (res: any) => void) => {
    const configData = {
      ...(await this.getConfig(config.unauthed)),
      ...config,
    };

    return this.axiosInstance
      .request(configData)
      .then((response: any) => {
        if (callback) {
          callback(response);
        }

        console.log(config.url.toUpperCase());
        if (config.data) {
          console.log(config.data);
        }
        console.log(response.status);
        console.log({ ...response.data });

        return {
          status: response.status,
          data: response.data,
        };
      })
      .catch((error: any) => {
        console.log(config.url.toUpperCase());
        if (config.data) {
          console.log(config.data);
        }
        console.log(error.response.status);
        console.log(error.response.data);

        return {
          status: error.response.status,
          msg: error.response.data.msg,
        };
      });
  }
}

export default BaseService;