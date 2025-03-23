import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import NowPlaying from './components/NowPlaying';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-black">
        <Sidebar />
        <main className="flex-1 overflow-auto pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </main>
        <NowPlaying />
      </div>
    </Router>
  );
}

export default App;