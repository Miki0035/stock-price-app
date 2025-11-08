import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { PencilIcon, Trash, Trash2 } from "lucide-react";

const Alert = () => {
  return (
    <div>
      <div className="flex justify-between items-center my-2">
        <h3 className="font-bold text-2xl text-gray-100">Alerts</h3>
        <Button type="button" className="yellow-btn w-32 !h-10 p-0 text-sm">
          Create Alert
        </Button>
      </div>
      <div className="flex flex-col items-center gap-md">
        {/* card */}
        <div className="w-full p-3 border-1 rounded-sm shadow-md border-red-500">
          {/* top side */}
          <div className="w-full flex justify-between items-center p-2">
            {/* top left side */}
            <div className="flex gap-2">
              <div className="w-10 h-10">
                <Image
                  src={"/assets/images/logo.png"}
                  alt="stock image"
                  width={90}
                  height={90}
                  className="w-full h-full object-fit"
                />
              </div>
              <div className="space-y-2">
                <h5>Apple Inc.</h5>
                <p>$229.65</p>
              </div>
            </div>
            {/* top right side */}
            <div className="flex flex-col">
              <h5>AAPL.</h5>
              <p>1.4%</p>
            </div>
          </div>
          {/* bottom side */}
          <div className="w-full flex justify-between items-center p-2">
            {/* bottom left side */}
            <div className="space-y-2">
              <h5>Alert:</h5>
              <p>Price &gt; $240.60</p>
            </div>
            {/* bottom left side */}
            <div className="space-y-2">
              <div className="flex justify-end gap-2">
                <PencilIcon size={20} />
                <Trash2 size={20} />
              </div>
              <p className="text-sm text-yellow-300 rounded-sm bg-yellow-500/50 px-2 py-1">
                Once per day
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
