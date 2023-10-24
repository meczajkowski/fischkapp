import { useEffect, useState } from 'react';
import { APIcardData, CardData } from './types';
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
  const [isLoading, setIsLoading] = useState(true);

  const addNewCard = () => {
    setNewCardIsAdded(true);
  };

  const cancelNewCard = () => {
    setNewCardIsAdded(false);
  };

  const saveNewCard = (cardData: CardData) => {
    setCards((prevCards) => [
      {
        id: cardData.id,
        front: cardData.front,
        back: cardData.back,
      },
      ...prevCards,
    ]);
    setNewCardIsAdded(false);
  };

  const updateCard = (updatedCard: CardData) => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.id === updatedCard.id) {
          return updatedCard;
        }
        return card;
      });
    });
  };

  const removeCard = (cardToRemove: CardData) => {
    setCards((prevCards) => {
      return prevCards.filter((card) => card.id !== cardToRemove.id);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch('https://training.nerdbord.io/api/v1/fischkapp/flashcards')
      .then((response) => response.json())
      .then((data) => {
        const APIcards = data.map((APIcard: APIcardData) => {
          return {
            id: APIcard._id,
            front: APIcard.front,
            back: APIcard.back,
          };
        });

        setCards(APIcards);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <AppLayout>
      <AppHeader onClick={addNewCard} cardsAmount={cards.length} />

      {newCardIsAdded && (
        <NewCard onSaveNewCard={saveNewCard} onCancelNewCard={cancelNewCard} />
      )}

      <CardsList>
        {cards.map((card: CardData) => (
          <Card
            onDelete={removeCard}
            onUpdate={updateCard}
            key={card.id}
            cardData={card}
          />
        ))}
      </CardsList>

      {cards.length === 0 && !newCardIsAdded && !isLoading && (
        <p style={noCardsTextStyles}>Add your first flashcard</p>
      )}
      {isLoading && <p style={noCardsTextStyles}>Loading...</p>}
    </AppLayout>
  );
}

export default App;
