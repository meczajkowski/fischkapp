import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';

import './App.css';
import Button from './components/UI/Button';

function App() {
  return (
    <AppLayout>
      <AppHeader cardsAmount={0} />
      <Button>Cancel</Button>
      <Button filled={true}>Next</Button>
    </AppLayout>
  );
}

export default App;
