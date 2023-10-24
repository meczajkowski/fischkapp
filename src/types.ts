import React from 'react';

export type CardData = {
  id: string;
  front: string;
  back: string;
};

export type IconProps = {
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
};

export type APIcardData = {
  _id: string;
  front: string;
  back: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
