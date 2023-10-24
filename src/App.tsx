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
  const [error, setError] = useState(null);

  const addNewCard = () => {
    setNewCardIsAdded(true);
  };

  const cancelNewCard = () => {
    setNewCardIsAdded(false);
  };

  const saveNewCard = (cardData: CardData) => {
    setIsLoading(true);

    fetch('https://training.nerdbord.io/api/v1/fischkapp/flashcards', {
      method: 'POST',
      headers: {
        Authorization: 'secret_token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        front: cardData.front,
        back: cardData.back,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchFlashcards();
        setNewCardIsAdded(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const updateCard = (updatedCard: CardData) => {
    setIsLoading(true);

    fetch(
      `https://training.nerdbord.io/api/v1/fischkapp/flashcards/${updatedCard.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: 'secret_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          front: updatedCard.front,
          back: updatedCard.back,
        }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        fetchFlashcards();
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const removeCard = (cardToRemove: CardData) => {
    setIsLoading(true);

    fetch(
      `https://training.nerdbord.io/api/v1/fischkapp/flashcards/${cardToRemove.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'secret_token',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          fetchFlashcards();
        } else {
          throw new Error('Failed to delete the flashcard');
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const fetchFlashcards = () => {
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
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  return (
    <AppLayout>
      <AppHeader onClick={addNewCard} cardsAmount={cards.length} />

      {newCardIsAdded && (
        <NewCard onSaveNewCard={saveNewCard} onCancelNewCard={cancelNewCard} />
      )}

      {!error && !isLoading && (
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
      )}

      {cards.length === 0 && !newCardIsAdded && !isLoading && !error && (
        <p style={noCardsTextStyles}>Add your first flashcard</p>
      )}
      {isLoading && <p style={noCardsTextStyles}>Loading...</p>}
      {error && <p style={noCardsTextStyles}>{error}</p>}
    </AppLayout>
  );
}

export default App;
