import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';

import './App.css';

import FlashCardForm from './components/FlashCard/FlashCardForm';

function App() {
  return (
    <AppLayout>
      <AppHeader cardsAmount={0} />
      <FlashCardForm />
    </AppLayout>
  );
}

export default App;
