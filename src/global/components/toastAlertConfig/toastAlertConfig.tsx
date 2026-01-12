import { Toaster } from "react-hot-toast";

export const ToastAlertConfig = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: "2.5rem",
        },
        // success: {
        //   style: {
        //     background: '#16a34a',
        //   },
        // },
        // error: {
        //   style: {
        //     background: '#dc2626',
        //   },
        // },
      }}
    />
  );
};
