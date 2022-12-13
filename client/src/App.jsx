import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
// import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <Router>
        <div id="App">
          <div>
            <Header />
            {/* <Footer /> */}
          </div>
        </div>
      </Router>
    </EthProvider>
  );
}

export default App;
