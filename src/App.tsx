import { useState } from 'react';
import './App.css';

// components
import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import NewCard from './components/Card/NewCard';
import CardsList from './components/Card/CardsList';

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

      {cards && <CardsList cards={cards} />}
      {cards.length === 0 && !newCardIsAdded && (
        <p style={{ color: 'var(--typo-color)', margin: '27px 0 0 16px' }}>
          Add your first flashcard
        </p>
      )}
    </AppLayout>
  );
}

export default App;
