import { combineReducers } from "redux";
import shareModal from "./shareModal";
import comments from "./comments";
import bars from "./bars";
import menu from "./menu";
import ssr from "./ssr";
import cookies from "./cookies";
import notifications from "./notifications";

export default () =>
  combineReducers({
    menu,
    bars,
    shareModal,
    comments,
    ssr: ssr(),
    cookies,
    notifications,
  });
