import { PencilIcon, Trash2 } from "lucide-react";
import Image from "next/image";

const AlertCard = ({
  logo,
  companyName,
  currentPrice,
  symbol,
  percentChange,
  className,
}: AlertCard) => {
  return (
    <div className="w-full p-3 border-1 rounded-md shadow-2xl bg-[#121214] border-gray-600">
      {/* top side */}
      <div className="w-full flex justify-between items-center  border-b-1 border-gray-600 p-2 pb-5">
        {/* top left side */}
        <div className="flex gap-2">
          <div className="w-16 h-16 border-1">
            <Image
              src={logo}
              alt="stock image"
              width={90}
              height={90}
              className="w-full h-full object-fit"
            />
          </div>
          <div className="space-y-2">
            <h5 className="text-md font-semibold">{companyName}.</h5>
            <p className="text-lg font-semibold text-white">${currentPrice}</p>
          </div>
        </div>
        {/* top right side */}
        <div className="space-y-1">
          <h5 className="text-md text-lg">{symbol}</h5>
          <p className={className}>{percentChange}%</p>
        </div>
      </div>
      {/* bottom side */}
      <div className="w-full flex justify-between items-center p-2">
        {/* bottom left side */}
        <div className="space-y-2">
          <h5 className="text-md">Alert:</h5>
          <p className="text-lg text-white font-semibold">
            Price &gt; ${currentPrice}
          </p>
        </div>
        {/* bottom left side */}
        <div className="space-y-2">
          <div className="flex justify-end gap-3">
            <PencilIcon
              size={16}
              className="stroke-white fill-black cursor-pointer"
            />
            <Trash2 size={16} className="stroke-white cursor-pointer" />
          </div>
          <p className="text-xs text-yellow-300 rounded-sm bg-yellow-500/50 px-2 py-1">
            Once per day
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
