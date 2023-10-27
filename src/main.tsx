import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { App } from "@/App";
import { UserProvider } from "@/context/auth";
import { CartProvider } from "@/context/cart";
import { ErrorBoundaryComponent, ErrorBoundary } from "@/components/errors";
import { Spinner } from "@/components/loading";

import "react-lazy-load-image-component/src/effects/blur.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ChakraProvider>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary fallback={<ErrorBoundaryComponent />}>
          <HelmetProvider>
            <UserProvider>
              <CartProvider>
                <BrowserRouter>
                  <Box id="principal">
                    <App />
                  </Box>
                </BrowserRouter>
              </CartProvider>
            </UserProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </Suspense>
    </ChakraProvider>
  </StrictMode>
);
