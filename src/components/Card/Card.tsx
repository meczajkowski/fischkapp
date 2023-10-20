import { CardData } from '../../types';

// components
import CardWrapper from '../UI/CardWrapper';

const Card: React.FC<CardData> = (props) => {
  return (
    <CardWrapper>
      <p>{props.front}</p>
      <p>{props.back}</p>
    </CardWrapper>
  );
};

export default Card;
