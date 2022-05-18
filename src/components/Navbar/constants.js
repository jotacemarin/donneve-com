import { PATH_UPLOAD } from "../../utils/routes";

export const LEFT_BUTTONS = [
  {
    enabled: false,
    key: "upload-media",
    to: PATH_UPLOAD,
    className: "button is-white is-outlined",
    icon: "fa fa-book",
    label: "Upload media",
  },
  {
    enabled: true,
    key: "steam-external",
    className: "button is-white is-outlined",
    href: "https://steamcommunity.com/groups/e-bolastrike",
    icon: "fab fa-steam",
  },
];
