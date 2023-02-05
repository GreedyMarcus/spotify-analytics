import { RefObject, useEffect } from "react";

export const useClickOutside = (ref: RefObject<HTMLElement>, callback: VoidFunction) => {
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();

      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return;
      }

      callback();
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, callback]);
};
