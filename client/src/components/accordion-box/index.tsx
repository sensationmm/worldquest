import classNames from 'classnames-react-native';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';

import Colors from '../../constants/Colors';
import Box from '../box';
import Icon from '../icon';
import Styled from './styles';

import { getTheme } from '../../utils/theme';
import { AccordionBoxProps } from './accordion-box.types';
import { ThemeContext } from '../../App';
import { Theme } from '../../types/User.types';

const AccordionBox: React.FC<AccordionBoxProps> = ({ children, defaultOpen = false, ...rest }) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <Box
      {...rest}
      showContent={isOpen}
      action={
        <TouchableHighlight
          style={Styled.expander}
          underlayColor={Colors.basic.white}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Icon
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            onClick={() => setIsOpen(!isOpen)}
            color={getTheme(theme as Theme).primary}
          />
        </TouchableHighlight>
      }
    >
      <View style={classNames(Styled.accordion, isOpen && Styled.open)}>{children}</View>
    </Box>
  );
};

export default AccordionBox;
