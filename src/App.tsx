import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./layout/components/LodingSpinner";
import useExchangeToken from "./hooks/useExchangeToken";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));

// 0. 사이드바가 있어야함 (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 서치페이지 /search
// 3. 서치 결과 페이지  /search/:keyword
// 4. 플레이 리스트 디테일 페이지  /playlist/:id
// 5. 모바일 버전에서 플레이리스트 보여주는 페이지 /palylist
//
function App() {
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier]);

  return (
    <Suspense
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {<Route index element={<HomePage />} />}
          <Route path="search" element={<SearchPage />} />
        </Route>

        {/* <Route path="/admin" element={AdminLayOyut}></Route> */}
      </Routes>
    </Suspense>
  );
}

export default App;
