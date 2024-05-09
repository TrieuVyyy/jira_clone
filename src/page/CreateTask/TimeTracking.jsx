import React from "react";
import { Slider } from "antd";

export default function TimeTracking() {
  return (
    <div>
      <Slider
        tooltip={{
          formatter: null,
        }}
      />
      <div className="flex justify-between font-semibold ">
        <div>0h logged</div>
        <div>0h remaining</div>
      </div>

      <div className="flex justify-between space-x-20">
        <div>
          <label className="text-sm font-sans pt-3 ">Time spent</label>
          <input type="number" min="0" className="form-control h-7" />
        </div>
        <div>
          <label className="text-sm font-sans pt-3">Time spent</label>
          <input type="number" min="0" className="form-control h-7" />
        </div>
      </div>
    </div>
  );
}
