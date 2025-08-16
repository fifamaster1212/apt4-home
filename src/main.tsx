import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure the page always starts at the top on reload
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
// Scroll to top on initial load and before unload to avoid restoring previous position
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

createRoot(document.getElementById('root')!).render(
  <App />
);
