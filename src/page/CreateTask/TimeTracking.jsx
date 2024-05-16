import React, { useState } from "react";
import { Slider } from "antd";

export default function TimeTracking(props) {
  const { onChange } = props;
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const handleTimeSpentChange = (e) => {
    const spent = parseInt(e.target.value);
    setTimeSpent(spent);
    onChange(e);
  };

  const handleTimeRemainingChange = (e) => {
    const remaining = parseInt(e.target.value);
    setTimeRemaining(remaining);
    onChange(e); 
  };

  return (
    <div>
      <Slider
        tooltip={{
          formatter: null,
        }}
      />
      <div className="flex justify-between font-semibold">
        <div>{timeSpent}h logged</div>
        <div>{timeRemaining}h remaining</div>
      </div>

      <div className="flex justify-between space-x-20">
        <div>
          <label className="text-sm font-medium pt-3">Time spent</label>
          <input
            onChange={handleTimeSpentChange}
            name="timeTrackingSpent"
            type="number"
            min="0"
            className="form-control h-7"
          />
        </div>
        <div>
          <label className="text-sm font-medium pt-3">Time remaining</label>
          <input
            onChange={handleTimeRemainingChange}
            name="timeTrackingRemaining"
            type="number"
            min="0"
            className="form-control h-7"
          />
        </div>
      </div>
    </div>
  );
}
