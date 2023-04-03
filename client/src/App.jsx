import {
  Customize,
  Home,
} from './pages';
import CanvasModels from './canvas';

function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <CanvasModels />
      <Customize/>
    </main>
  )
}

export default App
