import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 500 500"
      {...props}
    >
      <path
        d="M65 80h370c25 0 45 20 45 45v250c0 25-20 45-45 45H65c-25 0-45-20-45-45V125c0-25 20-45 45-45zm268 162l-65-37-65-38c-3-1-6-1-9 0-3 2-4 5-4 8v150c0 3 1 6 4 8 3 1 6 1 9 0l65-38 65-37c3-2 4-5 4-8s-1-6-4-8zM60 120h50v50H60v-50zm0 70h50v50H60v-50zm0 70h50v50H60v-50zm0 70h50v50H60v-50zm331-210h50v50h-50v-50zm0 70h50v50h-50v-50zm0 70h50v50h-50v-50zm0 70h50v50h-50v-50z"
        className="fil0"
      ></path>
    </svg>
  );
}

export default Icon;
