import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hadiths from "./pages/Hadiths";
import Hadith from "./pages/HadithPage";
import About from "./pages/About";
import Page from "./pages/Page";
import Saved from "./pages/Saved";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollIntoView({ behavior: "smooth" });
  }, [location]);
}

export default function App() {
  let [hadithList, setHadithList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedHadiths, setSavedHadiths] = useLocalStorage([], "savedHadiths");
  const [allCategories, setAllCategories] = useState([]);
  const [allHadithsContent, setAllHadithsContent] = useState([]);
  const [allHadiths, setAllHadiths] = useState([]);
  const [allHadithsCount, setAllHadithsCount] = useState(0);
  useEffect(function () {
    async function getCounts() {
      let request = await fetch(
        "https://hadeethenc.com/api/v1/categories/roots/?language=ar"
      );
      let response = await request.json();
      response.forEach((hadith) =>
        setAllHadithsCount((prev) => prev + +hadith.hadeeths_count)
      );
    }
    getCounts();

    async function getSecondaryCategories(params) {
      let request = await fetch(
        "https://hadeethenc.com/api/v1/categories/list/?language=ar"
      );
      let response = await request.json();
      setAllCategories(response);
    }
    getSecondaryCategories();
  }, []);

  useEffect(() => {
    async function getHadithList() {
      let request = await fetch(
        "https://hadeethenc.com/api/v1/categories/roots/?language=ar"
      );
      let responseforList = await request.json();
      setHadithList(responseforList);
      responseforList.forEach((hadith, indexes) => {
        const id = hadith.id;
        const counts = hadith.hadeeths_count;
        async function getHadithsId() {
          let request = await fetch(
            `https://hadeethenc.com/api/v1/hadeeths/list/?language=ar&category_id=${id}&page=1&per_page=${counts}`
          );
          let response = await request.json();
          response.data.map((r, index) => {
            r.pageid = Math.floor(index / 20) + 1;
            r.hadithsId = indexes + 1;
            r.title = r.title
              .replaceAll("ُ", "")
              .replaceAll("َ", "")
              .replaceAll("ِ", "")
              .replaceAll("ً", "")
              .replaceAll("ٌ", "")
              .replaceAll("ٍ", "")
              .replaceAll("ّ", "")
              .replaceAll("ْ", "")
              .replaceAll("ٰ", "")
              .replaceAll("ٓ", "")
              .replaceAll("ٔ", "")
              .replaceAll("ٕ", "")
              .replaceAll("ٖ", "")
              .replaceAll("ٗ", "")
              .replaceAll("٘", "")
              .replaceAll("ٙ", "")
              .replaceAll("ٚ", "")
              .replaceAll("ٛ", "")
              .replaceAll("ٜ", "")
              .replaceAll("ٝ", "")
              .replaceAll("ٞ", "")
              .replaceAll("ٟ", "");
            return r;
          });
          console.log(response.data);
          setAllHadithsContent((prev) => [...prev, ...response.data]);
        }
        getHadithsId();
      });
      setIsLoading(false);
    }

    getHadithList();
  }, []);

  useEffect(() => {
    if (allHadithsContent.length == allHadithsCount && allCategories.length) {
      console.log(allHadithsContent);
    }
  }, [allHadithsCount, allHadithsContent, allCategories]);

  useEffect(() => {
    document.documentElement.className = "dark";
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
              element={
                <Hadiths
                  allCategories={allCategories}
                  setAllHadithsContent={setAllHadithsContent}
                  allHadithsContent={allHadithsContent}
                  hadithList={hadithList}
                  setHadithList={setHadithList}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/hadiths/:hadithsId/page/:pageid"
              element={
                <Page
                  allCategories={allCategories}
                  savedHadiths={savedHadiths}
                  setSavedHadiths={setSavedHadiths}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/hadiths/:hadithsId/page/:pageid/hadith/:hadith"
              element={
                <Hadith
                  savedHadiths={savedHadiths}
                  setSavedHadiths={setSavedHadiths}
                />
              }
            />
            <Route
              path="/saved"
              element={
                <Saved
                  savedHadiths={savedHadiths}
                  allCategories={allCategories}
                  setSavedHadiths={setSavedHadiths}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/search"
              element={
                <Search
                  allHadithsContent={allHadithsContent}
                  allHadithsCount={allHadithsCount}
                  allCategories={allCategories}
                  savedHadiths={savedHadiths}
                  setSavedHadiths={setSavedHadiths}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <AppContent />
    </BrowserRouter>
  );
}
