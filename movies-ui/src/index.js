import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
