import { useEffect, useState } from "react";
import { format } from "date-fns";

export function Counter() {
  const [timeDisplay, setTimeDisplay] = useState(getCurrentTime);
  useEffect(() => {
    const i = setInterval(() => setTimeDisplay(getCurrentTime()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="bg-background border border-background-dark rounded p-3 not-prose">
      <p>I'm a Preact component! Here's the time.</p>
      <p className="font-medium">{timeDisplay}</p>
    </div>
  );
}

function getCurrentTime() {
  return format(new Date(), "h:mm:ss a");
}
