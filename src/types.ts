import { MouseEventHandler } from 'react';

export type CardData = {
  front: string;
  back: string;
};

export type IconProps = {
  className?: string;
  onClick?: MouseEventHandler;
};
