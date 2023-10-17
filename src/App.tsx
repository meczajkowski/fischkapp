import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';

import './App.css';
import Button from './components/UI/Button';
import Card from './components/UI/Card';
import Input from './components/UI/Input';

function App() {
  return (
    <AppLayout>
      <AppHeader cardsAmount={0} />
      <Card>
        <Input />
        <Button>Cancel</Button>
        <Button filled={true}>Next</Button>
      </Card>
    </AppLayout>
  );
}

export default App;
