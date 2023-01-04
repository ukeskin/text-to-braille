import React from "react";

function BrailleLetter(props) {
  // Split the dots string into an array of individual dots
  const dots = props.dots.split("");

  /* 
    101001 => [1, 0, 1, 0, 0, 1] => [true, false, true, false, false, true] => dot 1, 3, and 6 are true (filled in) 
  */

  /* 
                                          [1] [1]
   ['1', '0', '1', '1', '0']   ==>        [0] [1]
                                          [1] [0]
*/

  const color = (num) => (dots[num] === "1" ? "bg-black" : "bg-white border");
  const squareClassName = (num) => `w-3 h-3 rounded-full ${color(num)}`;

  return (
    <div className="flex items-center p-2 gap-1">
      <div className="grid grid-cols-1 grid-rows-3 gap-1">
        <div className={squareClassName(0)}></div>
        <div className={squareClassName(1)}></div>
        <div className={squareClassName(2)}></div>
      </div>
      <div className="grid grid-cols-1 grid-rows-1 gap-1">
        <div className={squareClassName(3)}></div>
        <div className={squareClassName(4)}></div>
        <div className={squareClassName(5)}></div>
      </div>
    </div>
  );
}

export default BrailleLetter;
