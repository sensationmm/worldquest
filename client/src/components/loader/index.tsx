import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

type LoaderProps = {
  isLoading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return <Spinner visible={isLoading} overlayColor={`rgba(0, 0, 0, 0.7)`} size={'large'} animation={'fade'} />;
};

export default Loader;
