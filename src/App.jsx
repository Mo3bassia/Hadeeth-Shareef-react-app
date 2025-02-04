import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Hadiths from "./pages/Hadiths";
import About from "./pages/About";
import Page from "./pages/Page";

export default function App() {
  return (
    <BrowserRouter>
      <div className="mt-4 container mx-auto px-5 rtl font-['Baloo_Bhaijaan_2']">
        <Navbar />
        <main className="mt-10">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/hadiths" element={<Hadiths />} />
            <Route path="/hadiths/:hadithsId/page/:pageid" element={<Page />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
