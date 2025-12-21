import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";

// 0. 사이드바가 있어야함 (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 서치페이지 /search
// 3. 서치 결과 페이지  /search/:keyword
// 4. 플레이 리스트 디테일 페이지  /playlist/:id
// 5. 모바일 버전에서 플레이리스트 보여주는 페이지 /palylist
//
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          { <Route index element={<HomePage />} /> }
          <Route path="search" element={<SearchPage />} />
          {/* <Route path="search/:keyword" element={<SearchWithKeywordPage />} /> */}
          {/* <Route path="playlist/:id" element={<PalylistDetailPage />} />  */}
          {/* <Route path="/playlist" element={<PalylistPage />} /> */}
        </Route>

        {/* <Route path="/admin" element={AdminLayOyut}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
