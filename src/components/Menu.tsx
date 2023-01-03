import { Children, ReactElement, ReactNode, cloneElement, isValidElement, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import { clsx } from "clsx";
import { useClickOutside } from "@hooks/useClickOutside";

type Props = {
  isOpen: boolean;
  anchorElement: ReactElement;
  placement: Placement;
  fallbackPlacements?: Placement[];
  offset?: Partial<Position>;
  width?: string;
  children: ReactNode;
  onClose: VoidFunction;
};

export const Menu = ({
  isOpen,
  anchorElement,
  placement,
  fallbackPlacements,
  offset,
  width = "w-fit",
  children,
  onClose,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorElementRef, setAnchorElementRef] = useState<HTMLElement | null>(null);
  const [contentRef, setContentRef] = useState<HTMLUListElement | null>(null);

  useClickOutside(containerRef, onClose);

  const { styles, attributes } = usePopper(anchorElementRef, contentRef, {
    placement,
    modifiers: [
      { name: "flip", options: { fallbackPlacements } },
      { name: "offset", options: { offset: [offset?.x, offset?.y] } },
    ],
  });

  const handleMenuItemClick = (item: ReactElement) => {
    onClose();
    item.props?.onClick();
  };

  return (
    <div className="z-dropdown flex select-none" ref={containerRef} tabIndex={-1}>
      {cloneElement(anchorElement, { ref: setAnchorElementRef })}
      {isOpen && (
        <ul
          className={clsx(
            "m-0 flex animate-fade-in list-none flex-col gap-1 overflow-hidden rounded-md bg-slate-600 p-1 shadow-md",
            width
          )}
          ref={setContentRef}
          style={styles.popper}
          {...attributes.popper}
        >
          {Children.map(children, (child) => {
            return isValidElement(child)
              ? cloneElement(child, { ...child.props, onClick: () => handleMenuItemClick(child) })
              : null;
          })}
        </ul>
      )}
    </div>
  );
};
