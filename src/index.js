import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
// Подключение инстументов разработчика для слежки за запросами
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //Запретить автообновление постов (отправку запроса на фоне и при переключении вкладок в браузере)
      // staleTime: 15000, //Сделает новый запрос через такой промежуток времени один раз
      // Время кэширования данных, то есть за это время данные будут храниться в кэше и не удалятся
      // К примеру если мы перешли на страницу поста, то это пост будет закеширован в течении указанного времени
      // и следующий раз когда зайду на этот пост, то данные будут доступны в кеше и не будут запрашиваться снова из сервера
      cacheTime: 15000,
      retry: 1, // Количество попыток нового запроса, если запрос был неуспешный
      retryDelay: 2000, //интервал между запросами
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
