import BaseService from './BaseService';

class AccountService extends BaseService {
  login = (email: string, password: string) => {
    const config = {
      url: 'users/login',
      method: 'post',
      unauthed: true,
      data: {
        email,
        password,
      },
    };

    return this.doRequest(config);
  }

  current = () => {
    const config = {
      url: 'users/current',
      unauthed: false,
    };

    return this.doRequest(config);
  }
}

export default AccountService;
