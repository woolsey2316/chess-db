import { useState } from "react";

import Tick from "@/components/svg/Tick";
import { cn } from "@/lib/utils";
import Cross from "@/components/svg/Cross";

export default function EngineLinesPanel() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <div className="rounded-lg h-[800px] w-[250px] bg-[rgb(35, 34, 31)]">
      {/* summary bar */}
      <div className="h-[41px] flex">
        <div className="ml-[6px]">
          <input id="analyse-toggle-eval" className="absolute hidden" type="checkbox" checked={checked}
            onChange={handleChange}></input>
          <label
            htmlFor="analyse-toggle-eval"
            className={cn("block cursor-pointer w-10 h-6 rounded-2xl hover:shadow-[0_0_12px_rgba(107,107,107,1)]",
              {
                "bg-[#629924]": checked,
                "bg-[#6b6b6b]": !checked
              }
            )}>
            {checked &&
              <div className="relative rounded-full bg-[#35322f] h-6 w-6 left-4">
                <Tick className={cn("absolute", { "fill-[#629924]": checked, "fill-[#6b6b6b]": !checked })}></Tick>
              </div>
            }
            {!checked &&
              <div className="relative rounded-full bg-[#35322f] h-6 w-6 left-0">
                <Cross className={cn("absolute", { "fill-[#629924]": checked, "fill-[#6b6b6b]": !checked })}></Cross>
              </div>
            }

          </label>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}