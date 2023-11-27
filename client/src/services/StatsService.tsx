import BaseService from './BaseService';

class StatsService extends BaseService {
  latest = () => {
    const config = {
      url: 'stats/latest',
      unauthed: false,
    };

    return this.doRequest(config);
  };
}

export default StatsService;
