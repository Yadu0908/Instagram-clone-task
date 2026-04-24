import "./App.css";
import Feed from "./components/Feed";
import LeftSidebar from "./components/LeftSidebar";
import Suggestions from "./components/Suggestions";

function App() {
  return (
    <>
      <div className="flex bg-black text-white min-h-screen">
        <div className="w-20 lg:w-64 border-r border-zinc-800 h-screen sticky top-0">
          <LeftSidebar />
        </div>

        <main className="flex-1 flex justify-center pb-10">
          <div className="w-full max-w-[630px] pt-8">
            <Feed />
          </div>
        </main>

        <div className="hidden xl:block w-[320px] pt-10 pr-4">
          <Suggestions />
        </div>
      </div>
    </>
  );
}

export default App;
