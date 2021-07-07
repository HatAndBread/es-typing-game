import React from "react";

const AuthenticityToken = () => {
  return (
    <input
      type='hidden'
      name='authenticity_token'
      //@ts-ignore
      value={document.getElementsByName(`csrf-token`)[0].content}
    />
  );
};

export default AuthenticityToken;
