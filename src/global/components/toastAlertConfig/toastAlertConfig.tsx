import { Toaster } from "react-hot-toast";

export const ToastAlertConfig = () => {
  // Documentación: https://react-hot-toast.com/
  return (
    <Toaster
      position="bottom-right"
      containerStyle={{
        top: 60, // px desde el borde superior
      }}
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
