import BaseService from './BaseService';

class ProgressService extends BaseService {
  start = () => {
    const config = {
      url: 'progress/start',
      unauthed: false,
    };

    return this.doRequest(config);
  };

  current = () => {
    const config = {
      url: 'progress/current',
      unauthed: false,
    };

    return this.doRequest(config);
  };

  completed = () => {
    const config = {
      url: 'progress/completed',
      unauthed: false,
    };

    return this.doRequest(config);
  };

  clue = (progressId: string) => {
    const config = {
      url: 'progress/clue',
      unauthed: false,
      method: 'post',
      data: {
        progressId,
      },
    };

    return this.doRequest(config);
  };

  guess = (progressId: string, riddleId: string, answer: string) => {
    const config = {
      url: 'progress/guess',
      unauthed: false,
      method: 'post',
      data: {
        progressId,
        riddleId,
        answer,
      },
    };

    return this.doRequest(config);
  };
}

export default ProgressService;
