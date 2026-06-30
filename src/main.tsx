import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { ScreenshotProvider } from './context/ScreenshotContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScreenshotProvider>
      <App />
    </ScreenshotProvider>
  </StrictMode>,
)
