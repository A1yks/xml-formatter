import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import 'simplebar-react/dist/simplebar.min.css';
import './styles/code-highlight.scss';
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
