import React, { Fragment } from "react";
import { routingPaths } from "../util/routing";
import path from "path";
import LanguagePage from "./templates/language";

const LayoutPicker = ({ location, ...props }) => {
  const { languagePath } = routingPaths();
  let Component;
  switch (true) {
    case languagePath.includes(path.normalize(location.pathname)):
      Component = LanguagePage;
      break;
    default:
      Component = Fragment;
      break;
  }
  return <Component {...props} />;
};

export default LayoutPicker;
