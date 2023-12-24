import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import { useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div>
      {/* <h1>Adopt Me!</h1>
      <SearchParams /> */}
      <BrowserRouter>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            {/* <Link to="/">Adopt Me!</Link> */}
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
