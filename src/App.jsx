import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed";
import LeftSidebar from "./components/LeftSidebar";
import Suggestions from "./components/Suggestions";
import SearchPage from "./components/SearchPage";
import ReelsPage from "./components/ReelsPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <Router>
      <div className="main-div flex bg-black text-white h-screen overflow-hidden">
        {/* 1. SIDEBAR */}
        <div className="w-[72px] lg:w-[244px] flex-shrink-0 border-r border-zinc-800 transition-all duration-300">
          <LeftSidebar />
        </div>

        {/* 2. MAIN CONTENT:  */}
        <main className="flex-1 h-full overflow-y-auto flex flex-col items-center custom-scrollbar">
          <div className="w-full max-w-[935px] h-full">
            <Routes>
              {/* Home Route */}
              <Route
                path="/"
                element={
                  <div className="flex justify-center gap-8">
                    <div className="w-full max-w-[630px]">
                      <Feed />
                    </div>

                    <div className="hidden xl:block w-[320px] pt-4">
                      <Suggestions />
                    </div>
                  </div>
                }
              />

              <Route
                path="/explore"
                element={
                  <div className="pt-4 lg:pt-10 px-4">
                    {" "}
                    <SearchPage />
                  </div>
                }
              />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
