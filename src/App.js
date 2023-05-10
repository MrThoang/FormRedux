import './App.css';
import HomePage from './pages/home-page';
import UserForm from "./pages/user-form";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<UserForm />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
