import React from "react";
import "./App.css";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";
import Home from "./pages/Home/home";

function App() {
  return (
    <>
      <div className="content">
        <Header />
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
