import { registerRootComponent } from 'expo';
import App from './App';
 
if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root) {
    root.style.height = '100%';
  }
  document.documentElement.style.height = '100%';
  document.body.style.minHeight = '100%';
  document.body.style.overflowY = 'auto';
  document.body.style.webkitOverflowScrolling = 'touch';
}


registerRootComponent(App);
