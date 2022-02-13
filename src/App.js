import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import Done from "./views/Done";
import Landing from "./views/Landing";
import Loans from "./views/Loans";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<Loans />} path="/loans" />
        <Route element={<Done />} path="/done" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
