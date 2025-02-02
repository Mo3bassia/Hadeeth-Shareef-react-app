import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Hadith from "./pages/Hadith";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto p-5 rtl font-['Baloo_Bhaijaan_2']">
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/hadith" element={<Hadith />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
