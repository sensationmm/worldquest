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

  register = (name: string, email: string, password: string, password2: string) => {
    const config = {
      url: 'accounts/register',
      method: 'post',
      unauthed: true,
      data: {
        name,
        email,
        password,
        password2,
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
}

export default AccountService;
