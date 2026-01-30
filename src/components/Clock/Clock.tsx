import type React from "react";
import { useState, useEffect } from "react";
import { Clock as ClockIcon } from "lucide-react";
import { useConfig } from "@/hooks/useConfig";

export const Clock: React.FC = () => {
  const { config } = useConfig();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Set initial time
    const updateTime = () => {
      const now = new Date();
      const formattedTime = formatTime(now, config.clock.format);
      setTime(formattedTime);
    };

    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [config.clock.format]);

  return (
    <div className='flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-surface0/50 transition-colors cursor-default'>
      <ClockIcon className='w-4 h-4' style={{ color: config.palette?.maroon }} />
      <span className='text-xs font-medium tracking-wide text-text whitespace-nowrap'>{time}</span>
    </div>
  );
};

// Time formatting function
function formatTime(date: Date, format: string): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let result = format;

  // 12-hour format with AM/PM
  const hours12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";

  result = result.replace("h", String(hours12).padStart(2, "0"));
  result = result.replace("H", String(hours).padStart(2, "0"));
  result = result.replace("i", String(minutes).padStart(2, "0"));
  result = result.replace("s", String(seconds).padStart(2, "0"));
  result = result.replace("p", ampm);
  result = result.replace("P", ampm.toLowerCase());
  result = result.replace("d", String(day).padStart(2, "0"));
  result = result.replace("m", String(month).padStart(2, "0"));
  result = result.replace("Y", String(year));
  result = result.replace("y", String(year).slice(-2));

  return result;
}
