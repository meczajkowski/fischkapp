import { PropsWithChildren } from 'react';

const CardsList = (props: PropsWithChildren) => {
  return <ul>{props.children}</ul>;
};

export default CardsList;
