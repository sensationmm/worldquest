import { BoxProps } from '../box/box.types';

export interface AccordionBoxProps extends BoxProps {
  title: string;
  defaultOpen?: boolean;
}
