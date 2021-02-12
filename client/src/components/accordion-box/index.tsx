import classNames from 'classnames-react-native';
import React, { useState } from 'react';
import { TouchableHighlight, View } from 'react-native';

import Colors from '../../constants/Colors';
import Box from '../box';
import Icon from '../icon';
import Styled from './styles';

import { AccordionBoxProps } from './accordion-box.types';

const AccordionBox: React.FC<AccordionBoxProps> = ({ children, ...rest }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Box
      {...rest}
      showContent={isOpen}
      action={
        <TouchableHighlight style={Styled.expander} underlayColor={Colors.basic.white} onPress={() => setIsOpen(!isOpen)}>
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} onClick={() => setIsOpen(!isOpen)} />
        </TouchableHighlight>
      }
    >
      <View style={classNames(Styled.accordion, isOpen && Styled.open)}>{children}</View>
    </Box>
  );
};

export default AccordionBox;
