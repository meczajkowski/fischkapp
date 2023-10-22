import { MouseEventHandler } from 'react';

export type CardData = {
  id: string;
  front: string;
  back: string;
};

export type IconProps = {
  className?: string;
  onClick?: MouseEventHandler;
};
