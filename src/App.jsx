import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hadiths from "./pages/Hadiths";
import Hadith from "./pages/HadithPage";
import About from "./pages/About";
import Page from "./pages/Page";

export default function App() {
  let [hadithList, setHadithList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [allHadithsId, setAllHadithsId] = useState([]);
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
      responseforList.forEach((hadith, index) => {
        const id = hadith.id;
        const counts = hadith.hadeeths_count;
        async function getHadithsId() {
          let request = await fetch(
            `https://hadeethenc.com/api/v1/hadeeths/list/?language=ar&category_id=${id}&page=1&per_page=${counts}`
          );
          let response = await request.json();
          setAllHadithsId((prev) => [
            ...prev,
            ...response.data.map((hadith) => hadith.id),
          ]);
        }
        getHadithsId();
      });
      setIsLoading(false);
    }

    getHadithList();
  }, []);

  // useEffect(() => {
  //   if (allHadithsId.length == allHadithsCount && allCategories.length) {
  //     allHadithsId.forEach((id) => {
  //       async function getHadithDetails() {
  //         let request = await fetch(
  //           `https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${id}`
  //         );
  //         let response = await request.json();
  //         console.log(response)
  //         setAllHadiths((prev) => [...prev, response]);
  //       }
  //       getHadithDetails();
  //     });
  //   }
  // }, [allHadithsCount, allHadithsId, allCategories]);

  console.log(allHadiths);

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
                  setAllHadithsId={setAllHadithsId}
                  allHadithsId={allHadithsId}
                  hadithList={hadithList}
                  setHadithList={setHadithList}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/hadiths/:hadithsId/page/:pageid"
              element={<Page allCategories={allCategories} />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/hadiths/:hadithsId/page/:pageid/hadith/:hadith"
              element={<Hadith />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
