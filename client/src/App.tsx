import { MainProvider } from "./MainProvider";
import Home from "./components/home";

const App = () => (
  <MainProvider>
    <Home/>
  </MainProvider>
);

export default App;
