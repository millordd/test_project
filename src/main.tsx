import 'alif-ui/styles.css';
import './index.css';

import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { queryClient } from 'utils/reactQuery';

import { QueryClientProvider } from '@tanstack/react-query';

import { App } from './app/App';

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.querySelector('#root')!).render(<Main />);
