import { useState } from 'react';
import { CardData } from './types';
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

function App() {
  const [cards, setCards] = useState<CardData[]>([]);

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
          <Card front={card.front} back={card.back} />
        ))}
      </CardsList>

      {cards.length === 0 && !newCardIsAdded && (
        <p style={noCardsTextStyles}>Add your first flashcard</p>
      )}
    </AppLayout>
  );
}

export default App;
