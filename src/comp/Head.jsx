import React from "react";

const Head = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      <title>React App</title>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="animation.css" />
      <link rel="stylesheet" href="../theme.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
      />
      <link rel="stylesheet" href="mobile-screen.css"  media="(max-width: 640px)" />
      <link rel="stylesheet" href="lessThan150.css" />
      <link rel="stylesheet" href="screenTo330.css" />
    </>
  );
};

export default Head;
