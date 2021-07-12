import React from "react";
import ReactDOM from "react-dom";
import ReactApp from "./ReactApp";
import { camel } from "./camel";

const root = document.getElementById("root");
document.addEventListener("DOMContentLoaded", () => {
  if (root?.dataset.page) {
    ReactDOM.render(
      <ReactApp
        data={
          root.dataset.data ? camel(JSON.parse(root.dataset.data)) : undefined
        }
        page={root.dataset.page}
        currentUser={
          root.dataset.currentUser
            ? camel(JSON.parse(root.dataset.currentUser))
            : undefined
        }
        errors={root.dataset.errors ? JSON.parse(root.dataset.errors) : null}
      />,
      root
    );
  }
});
