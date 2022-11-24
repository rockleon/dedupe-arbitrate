import { EthProvider } from "./contexts/EthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <Router>
        <div id="App" >
          <div className="container">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/setup">Setup</Link>
                </li>
                <li>
                  <Link to="/demo">Demo</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/setup" element={<Setup />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/" element={<Intro />} />
            </Routes>

            {/* <div className="container">
            <Intro />
            <hr />
            <Setup />
            <hr />
            <Demo />
            <hr />
            <Footer />
          </div> */}
            <Footer />
          </div>
        </div>
      </Router>
    </EthProvider>
  );
}

export default App;
