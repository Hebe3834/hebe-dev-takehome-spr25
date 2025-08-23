import React from "react";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type DropdownVariant = "primary" | "inverted"

interface DropdownProps {
  variant?: DropdownVariant;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
//   children: React.ReactNode;
}

const statusStyles: Record<string, string> = {
    Pending: "bg-negative-fill text-negative-text border-negative-indicator",
    Approved: "bg-warning-fill text-warning-text border-warning-indicator",
    Completed: "bg-success-fill text-success-text border-success-indicator",
    Rejected: "bg-danger-fill text-danger-text border-danger-indicator",
};


export default function Dropdown({
  variant = "primary",
}: DropdownProps) {
  const baseStyles = "py-2 rounded-md transition w-full flex items-center justify-between";
  
  const options: string[] = ["Pending", "Approved", "Rejected", "Completed"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  const variantStyles: Record<DropdownVariant, string> = {
    primary:
      "border-2 border-gray-stroke bg-gray-fill-light text-gray-text-dark hover:border-primary",
    inverted:
      "border-2 border-gray-stroke bg-gray-text-dark text-gray-fill-light hover:border-primary",
  };

  return (
    <div className="flex flex-col gap-1">
        <button
        className={`${baseStyles} ${variantStyles[variant]}`}
        onClick={() => setIsExpanded(!isExpanded)}
        >
            <span 
            className={`${statusStyles[selectedOption]} px-2 py-1 rounded-full mx-2 font-medium text-sm flex`}>
                <div className={`${statusStyles[selectedOption]} h-0 w-0 rounded-full  border-[4px] border-solid m-auto mx-1`}></div>
                {selectedOption}
                </span>
            <ChevronDownIcon className={`w-10 h-5.75 text-gray-text-dark transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
        </button>
        {isExpanded && (
            <div className="bg-white shadow-md rounded-md p-2 flex flex-col gap-3">
                {options.map((option) => (
                    <button 
                    key={option} 
                    onClick={() => setSelectedOption(option)}
                    className={`${statusStyles[option]} px-2 py-1 rounded-full mx-2 font-medium text-sm flex w-max`}>
                        <div className={`${statusStyles[option]} h-0 w-0 rounded-full border-[4px] border-solid m-auto mx-1`}></div>
                        {option}
                    </button>
                ))}
            </div>
        )}
    </div>
  );
}
