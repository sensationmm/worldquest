import { AvatarPlaceholder } from '../components/avatar';
import { Theme } from '../types/User.types';
import BaseService from './BaseService';

class AccountService extends BaseService {
  login = (email: string, password: string) => {
    const config = {
      url: 'accounts/login',
      method: 'post',
      unauthed: true,
      data: {
        email,
        password,
      },
    };

    return this.doRequest(config);
  };

  register = (name: string, email: string, password: string, password2: string, avatar: AvatarPlaceholder) => {
    const config = {
      url: 'accounts/register',
      method: 'post',
      unauthed: true,
      data: {
        name,
        email,
        password,
        password2,
        avatar,
      },
    };

    return this.doRequest(config);
  };

  current = () => {
    const config = {
      url: 'accounts/current',
      unauthed: false,
    };

    return this.doRequest(config);
  };

  requestReset = (email: string) => {
    const config = {
      url: 'accounts/requestReset',
      method: 'post',
      unauthed: true,
      data: {
        email,
      },
    };

    return this.doRequest(config);
  };

  authoriseReset = (email: string, authCode: string) => {
    const config = {
      url: 'accounts/authoriseReset',
      method: 'post',
      unauthed: true,
      data: {
        email,
        authCode,
      },
    };

    return this.doRequest(config);
  };

  resetPassword = (email: string, password: string, password2: string) => {
    const config = {
      url: 'accounts/resetPassword',
      method: 'post',
      unauthed: false,
      data: {
        email,
        password,
        password2,
      },
    };

    return this.doRequest(config);
  };

  buyClues = (num: number) => {
    const config = {
      url: 'accounts/buyClues',
      method: 'post',
      unauthed: false,
      data: {
        numClues: num,
      },
    };

    return this.doRequest(config);
  };

  editDetails = (name: string, email: string, avatar: string) => {
    const config = {
      url: 'accounts/edit',
      method: 'post',
      unauthed: false,
      data: {
        name,
        email,
        avatar,
      },
    };

    return this.doRequest(config);
  };

  editAvatar = (avatar: FormData) => {
    const config = {
      url: 'accounts/images',
      method: 'post',
      unauthed: false,
      data: avatar,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    return this.doRequest(config);
  };

  getAvatar = (avatar: string) => {
    const config = {
      url: `accounts/images/${avatar}`,
      unauthed: false,
      responseType: 'blob',
      headers: {
        ContentType: 'blob',
      },
    };

    return this.doRequest(config);
  };

  deleteAvatar = (avatar: string) => {
    const config = {
      url: `accounts/images/${avatar}`,
      method: 'delete',
      unauthed: false,
    };

    return this.doRequest(config);
  };

  saveTheme = (theme: Theme) => {
    const config = {
      url: 'accounts/theme',
      method: 'post',
      unauthed: false,
      data: {
        theme: theme,
      },
    };

    return this.doRequest(config);
  };
}

export default AccountService;
