import "./App.css";
import { BlogContent } from "./components/BlogContnet/BlogContent";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

export function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <BlogContent />
      </main>

      <Footer year={new Date().getFullYear()} />
    </div>
  );
}
