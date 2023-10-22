import { useState } from 'react';
import { CardData } from './types';
import { generateID } from './helpers/generateID';
import './App.css';

// components
import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import Card from './components/Card/Card';
import CardsList from './components/Card/CardsList';
import NewCard from './components/Card/NewCard';

const noCardsTextStyles = {
  color: 'var(--typo-color)',
  margin: '27px 0 0 16px',
};

const INITIAL_CARDS = [
  {
    id: '18b58e36276',
    front: 'This is front of the card 1',
    back: 'This is back of the card 1',
  },
  {
    id: '18b58e35526',
    front: 'This is front of the card 2',
    back: 'This is back of the card 2',
  },
];

function App() {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);

  const [newCardIsAdded, setNewCardIsAdded] = useState(false);

  const addNewCard = () => {
    setNewCardIsAdded(true);
  };

  const cancelNewCard = () => {
    setNewCardIsAdded(false);
  };

  const saveNewCard = (cardData: CardData) => {
    setCards((prevCards) => [
      {
        id: generateID(),
        front: cardData.front,
        back: cardData.back,
      },
      ...prevCards,
    ]);
    setNewCardIsAdded(false);
  };

  return (
    <AppLayout>
      <AppHeader onClick={addNewCard} cardsAmount={cards.length} />

      {newCardIsAdded && (
        <NewCard onSaveNewCard={saveNewCard} onCancelNewCard={cancelNewCard} />
      )}

      <CardsList>
        {cards.map((card: CardData) => (
          <Card
            key={card.id}
            id={card.id}
            front={card.front}
            back={card.back}
          />
        ))}
      </CardsList>

      {cards.length === 0 && !newCardIsAdded && (
        <p style={noCardsTextStyles}>Add your first flashcard</p>
      )}
    </AppLayout>
  );
}

export default App;
