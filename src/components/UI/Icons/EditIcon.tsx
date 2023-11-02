import { IconProps } from '../../../types';

const EditIcon: React.FC<IconProps> = (props) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click event from propagating to parent
    props.onClick && props.onClick(event);
  };
  return (
    <svg
      data-testid='edit-icon'
      className={props.className}
      onClick={handleClick}
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Kind=Edit'>
        <path
          id='Union'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M25.2388 14.7611C24.275 13.7973 22.7123 13.7973 21.7485 14.7611L14.6805 21.8291C14.2116 22.298 13.9482 22.9338 13.9482 23.5969L13.9482 25.5517L13.9482 26.0517H14.4482H16.403C17.0661 26.0517 17.7019 25.7883 18.1708 25.3194L25.2388 18.2514C26.2026 17.2876 26.2026 15.7249 25.2388 14.7611ZM22.4556 15.4682C23.0289 14.8949 23.9584 14.8949 24.5317 15.4682C25.105 16.0415 25.105 16.971 24.5317 17.5443L24.1895 17.8865L22.1134 15.8104L22.4556 15.4682ZM21.4063 16.5175L15.3876 22.5362C15.1063 22.8175 14.9482 23.1991 14.9482 23.5969V25.0517H16.403C16.8008 25.0517 17.1824 24.8936 17.4637 24.6123L23.4824 18.5936L21.4063 16.5175Z'
          fill='#161616'
        />
      </g>
    </svg>
  );
};

export default EditIcon;
