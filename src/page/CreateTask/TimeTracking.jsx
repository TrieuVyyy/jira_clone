import React, { useState, useEffect } from "react";
import { Slider } from "antd";

export default function TimeTracking(props) {
  const {
    onChange,
    timeSpent: initialTimeSpent,
    timeRemaining: initialTimeRemaining,
  } = props;
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    setTimeSpent(initialTimeSpent);
    setTimeRemaining(initialTimeRemaining);
  }, [initialTimeSpent, initialTimeRemaining]);

  const handleTimeSpentChange = (e) => {
    const spent = parseInt(e.target.value);
    setTimeSpent(spent);
    onChange({ timeSpent: spent, timeRemaining });
  };

  const handleTimeRemainingChange = (e) => {
    const remaining = parseInt(e.target.value);
    setTimeRemaining(remaining);
    onChange({ timeSpent, timeRemaining: remaining });
  };

  const getTotalTime = () => timeSpent + timeRemaining;
  const sliderValue =
    getTotalTime() === 0 ? 0 : (timeSpent / getTotalTime()) * 100;

  return (
    <div>
      <Slider
        tooltip={{
          formatter: null,
        }}
        value={sliderValue}
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
            value={timeSpent}
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
            value={timeRemaining}
            min="0"
            className="form-control h-7"
          />
        </div>
      </div>
    </div>
  );
}
