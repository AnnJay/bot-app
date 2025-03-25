import { LogOut } from "lucide-react";

import "./user-block.style.css";
import { FC } from "react";
import { useUnit } from "effector-react";
import { logoutUser } from "../../../app/store/userStore";

export const UserBlock: FC<{
  name: string;
  subtext: string;
  avatar?: string;
}> = ({ name, subtext, avatar }) => {
  const logout = useUnit(logoutUser);

  return (
    <div className="user-block">
      <div className="flex-container">
        <div className="user-avatar-border">
          <img
            className="user-avatar"
            src={avatar || "/default_avatar.svg"}
            alt="default_avatar"
          />
        </div>
        <div className="user-info">
          <p className="user-info-name">{name}</p>
          <p className="user-info-subtext">{subtext}</p>
        </div>
      </div>

      <LogOut className="logout-icon" onClick={logout} />
    </div>
  );
};
