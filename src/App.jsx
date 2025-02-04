import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Hadiths from "./pages/Hadiths";
import About from "./pages/About";
import Page from "./pages/Page";

export default function App() {
  const [allCategories, setAllCategories] = useState([]);
  useEffect(function () {
    async function getSecondaryCategories(params) {
      let request = await fetch(
        "https://hadeethenc.com/api/v1/categories/list/?language=ar"
      );
      let response = await request.json();
      setAllCategories(response);
    }
    getSecondaryCategories();
  }, []);

  return (
    <BrowserRouter>
      <div className="mt-4 container mx-auto px-5 rtl font-['Baloo_Bhaijaan_2']">
        <Navbar />
        <main className="mt-10">
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/hadiths"
              element={<Hadiths allCategories={allCategories} />}
            />
            <Route
              path="/hadiths/:hadithsId/page/:pageid"
              element={<Page allCategories={allCategories} />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
