import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { createAppRouter } from './router.tsx';
import AuthInitializer from './components/auth/AuthInitializer.tsx';
import { Toaster } from "sonner"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createAppRouter(queryClient)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#110D0D",
              color: "#ffffff",
              border: "1px solid #F90301",
              fontFamily: "Akshar, serif",
            },
          }}
        />
      </AuthInitializer>
    </QueryClientProvider>
  </StrictMode>,
)
