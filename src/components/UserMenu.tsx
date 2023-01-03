import { useState } from "react";
import { clsx } from "clsx";
import { signOut, useSession } from "next-auth/react";
import SignOutIcon from "@svgs/sign-out-icon.svg";
import { Avatar } from "./Avatar";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

export const UserMenu = () => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      anchorElement={
        <button
          tabIndex={-1}
          className={clsx("rounded-full", isOpen && "ring-2 ring-spotify")}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Avatar name={session?.user.name ?? ""} image={session?.user.image} />
        </button>
      }
      isOpen={isOpen}
      width="w-44"
      placement="bottom-start"
      offset={{ y: 20 }}
      onClose={() => setIsOpen(false)}
    >
      <MenuItem startIcon={<SignOutIcon className="h-6 w-6" />} onClick={signOut}>
        Sign out
      </MenuItem>
    </Menu>
  );
};
