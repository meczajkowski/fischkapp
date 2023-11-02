import { PropsWithChildren } from "react";

const CardsList = (props: PropsWithChildren) => {
  return <ul data-testid='cards-list'>{props.children}</ul>;
};

export default CardsList;
