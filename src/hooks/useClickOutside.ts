import { RefObject, useEffect } from "react";
import { DomUtils } from "@utils/dom.utils";

export const useClickOutside = (ref: RefObject<HTMLElement>, callback: VoidFunction) => {
  useEffect(() => {
    const shouldIgnore = (target: HTMLElement): boolean => {
      if (DomUtils.parseDataAttribute(target?.dataset.ignoreClickOutside)) {
        return true;
      } else {
        return target?.parentElement ? shouldIgnore(target.parentElement) : false;
      }
    };

    const handler = (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();

      const target = e.target as HTMLElement;

      if (ref.current && ref.current !== target && !ref.current.contains(target)) {
        if (!shouldIgnore(target)) {
          callback();
        }
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [callback]);
};
