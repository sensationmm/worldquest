import { ImageSourcePropType } from 'react-native';

export interface CoreBoxProps {
  children: any;
}

export interface BoxProps extends CoreBoxProps {
  centered?: boolean;
  title?: string;
  icon?: ImageSourcePropType;
  isError?: boolean;
  action?: JSX.Element;
  showContent?: boolean;
}
