"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
          },
        },
      }}
    />
  );
}
