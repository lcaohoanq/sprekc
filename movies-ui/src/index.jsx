import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from "react-query";
import {worker} from "./mocks/browser";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3, // limit retry attempts
    },
  },
});

async function enableMocking(isEnable) {
  if(isEnable){
    if (
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "production"
    ) {
      return worker.start({
        onUnhandledRequest: "bypass",
      });
    }
  }
}

enableMocking(false).then(() => {
  createRoot(document.getElementById('root')).render(
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
  )
});
