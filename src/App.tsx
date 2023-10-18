import { useState } from 'react';
import './App.css';

// components
import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import NewCard from './components/Card/NewCard';
import CardWrapper from './components/UI/CardWrapper';

interface CardData {
  firstPage: string;
  secondPage: string;
}

function App() {
  const [cards, setCards] = useState<
    { firstPage: string; secondPage: string }[]
  >([]);

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
        firstPage: cardData.firstPage,
        secondPage: cardData.secondPage,
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

      {cards.map((card) => (
        <CardWrapper>
          <p>{card.firstPage}</p>
          <p>{card.secondPage}</p>
        </CardWrapper>
      ))}
    </AppLayout>
  );
}

export default App;
