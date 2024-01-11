import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import { getStyles } from '../../utils/theme';
import Button from '../button';
import Logo from './fragments/Logo';
import Text1 from './fragments/Text1';

type WalkthroughProps = {
  closeWalkthrough: () => void;
};

const Walkthrough: React.FC<WalkthroughProps> = ({ closeWalkthrough }) => {
  const Styled = getStyles(styles);

  return (
    <View style={Styled.main}>
      <View style={Styled.content}>
        <Logo />
        <Text1 />
      </View>
      <Button onClick={closeWalkthrough} small label='Exit Walkthrough' />
    </View>
  );
};

export default Walkthrough;
