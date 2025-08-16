// App.tsx
import { Header } from './components/navigation/Header';
import { HomeTab } from './components/home/HomeTab';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Footer } from './components/common/Footer';
import { BlogPage } from './components/blog/BlogPage';
import { PostPage } from './components/blog/PostPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 pt-8">
              <Routes>
                <Route path="/" element={<HomeTab />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<PostPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
