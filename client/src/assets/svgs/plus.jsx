import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill={props.color} transform="translate(1 1)">
          <path d="M15.436 0C19.063 0 21.5 2.546 21.5 6.335v8.83c0 3.789-2.437 6.335-6.064 6.335H6.064C2.437 21.5 0 18.954 0 15.165v-8.83C0 2.546 2.437 0 6.064 0h9.372zm0 1.5H6.064C3.292 1.5 1.5 3.397 1.5 6.335v8.83C1.5 18.103 3.292 20 6.064 20h9.372C18.209 20 20 18.103 20 15.165v-8.83C20 3.397 18.209 1.5 15.436 1.5zM10.75 6.327a.75.75 0 01.75.75V9.99h2.916a.75.75 0 010 1.5H11.5v2.914a.75.75 0 01-1.5 0V11.49H7.083a.75.75 0 110-1.5H10V7.077a.75.75 0 01.75-.75z"></path>
        </g>
      </g>
    </svg>
  );
}

export default Icon;
