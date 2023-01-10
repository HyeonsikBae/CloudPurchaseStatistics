import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLogin from "./components/pages/PageLogin";
import PageMain from "./components/pages/PageMain";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/main" element={<PageMain />} />
          <Route path="*" element={<PageLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
