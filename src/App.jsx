import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";

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
  return (
    <div>
      {/* <h1>Adopt Me!</h1>
      <SearchParams /> */}
      <BrowserRouter>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <QueryClientProvider client={queryClient}>
          {/* <Link to="/">Adopt Me!</Link> */}
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
