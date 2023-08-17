// import { MenuSectionPropsType } from "Types/PropsTypes/MenuSectionPropsType"
import { testData } from "Utils/testData"
import { useEffect } from "react";
import { useAtom } from "jotai";
import { dataAtom } from "lib/atom"
import SectionItems from "Components/MenuSection/SectionItems"

function Cart() {
  return (
    <div className="grid col-start-4 col-end-5">
      Cart
    </div>
  );
}

export default Cart;
