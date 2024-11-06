import React from "react";

export function Error({ message }) {
  return (
    <div id="error">
      <h1>{message}</h1>
    </div>
  );
}
