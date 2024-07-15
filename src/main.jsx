import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChatInOffProvider } from './components/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatInOffProvider>
    <App />
    </ChatInOffProvider>
  </React.StrictMode>,
)
