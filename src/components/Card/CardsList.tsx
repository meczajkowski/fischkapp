import React from 'react';

import CardWrapper from '../UI/CardWrapper';

interface CardsListProps {
  cards: {
    firstPage: string;
    secondPage: string;
  }[];
}

const CardsList: React.FC<CardsListProps> = (props) => {
  return (
    <ul>
      {props.cards.map((card: { firstPage: string; secondPage: string }) => (
        <li>
          <CardWrapper>
            <p>{card.firstPage}</p>
            <p>{card.secondPage}</p>
          </CardWrapper>
        </li>
      ))}
    </ul>
  );
};

export default CardsList;
