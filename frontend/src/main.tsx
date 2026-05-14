import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Styles/App.css'
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes"
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
    position="bottom-center"
    toastOptions={{
      duration: 3000,
      className:
        "toast",
      success: {
        iconTheme: {
          primary: "#22c55e",
          secondary: "#111827",
        },
      },
      error: {
        iconTheme: {
          primary: "#ef4444",
          secondary: "#111827",
        },
      },
    }}
/>
  </StrictMode>,
)