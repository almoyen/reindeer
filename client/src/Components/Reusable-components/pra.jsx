import React from "react";
export default function FilterableProductTable() {
  return <div>ddd</div>;
}

/* 
import React, { useEffect, useState } from "react";
import { foodChoices } from "../../utils/Options";
export default function FilterableProductTable() {
  const [select, setSelect] = useState([]);
  const [itemSelect, setItemSelect] = useState({});
  const getAllItem = () => {
    
    setSelect(foodChoices);
  };
  useEffect(() => {
    getAllItem();
  });
  console.log(select);
  console.log(itemSelect);
  return (
    <div>
      {select.map((i) => (
        <div key={i.label} onClick={() => setItemSelect(i)}>
          {i.label}
        </div>
      ))}
    </div>
  );
}

 */
