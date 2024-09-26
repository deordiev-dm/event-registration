import { useEffect, useState } from "react";

type AlertProps = {
  variant: "error" | "success";
  children: React.ReactNode;
};

export default function Alert({ variant, children }: AlertProps) {
  const [visible, seetVisible] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (variant === "success") {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [variant]);

  useEffect(() => {
    if (!show) {
      const timer = setTimeout(() => {
        seetVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) {
    return;
  }

  return (
    <div
      className={`${variant === "error" ? "bg-red-500" : "bg-green-500"} ${show ? "opacity-100" : "opacity-0"} fixed left-1/2 top-3 z-50 w-10/12 -translate-x-1/2 text-balance rounded-lg px-4 py-2 text-center text-lg font-semibold text-white transition-opacity duration-500 ease-in-out`}
    >
      {children}
    </div>
  );
}
