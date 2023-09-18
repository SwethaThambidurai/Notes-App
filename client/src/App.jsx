import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./routes/Home/home";
import About from "./routes/About/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddNote from "./routes/Home/add-note";
import UpdateNote from "./routes/Home/note";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/note/:id" element={<UpdateNote />}></Route>
          <Route path="/add-note" element={<AddNote />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
