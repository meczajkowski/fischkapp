import React, { MouseEventHandler } from 'react';

interface DeleteIconProps {
  className?: string;
  onClick?: MouseEventHandler;
}

const DeleteIcon: React.FC<DeleteIconProps> = (props) => {
  return (
    <svg
      className={props.className}
      onClick={props.onClick}
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Icon'>
        <path
          id='Path 2'
          d='M25 15.5H15'
          stroke='#161616'
          strokeLinecap='round'
        />
        <path
          id='Path 2_2'
          d='M22 15H18'
          stroke='#161616'
          strokeLinecap='round'
        />
        <path
          id='Path 8'
          d='M15 19V27H25C25 26.2727 25 19 25 19'
          stroke='#161616'
          strokeLinecap='round'
        />
      </g>
    </svg>
  );
};

export default DeleteIcon;