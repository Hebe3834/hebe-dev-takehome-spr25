import React from "react";
import { useState } from "react";

export default function RequestsTable() {
  const baseStyles = "";

  const options: string[] = ["All", "Pending", "Approved", "Rejected", "Completed"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  
  return (
    <div className="flex flex-col gap-2">
        <h3 className="font-medium">Item Requests</h3>
        <div className="flex flex-col">
            <div className="flex flex-row gap-2">
                {options.map((option) => (
                    <div 
                    key={option} 
                    onClick={() => setSelectedOption(option)}
                    className="">
                        {option}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
