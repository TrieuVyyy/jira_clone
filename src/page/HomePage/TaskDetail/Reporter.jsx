import React, { useEffect, useState } from "react";
import { https } from "../../../service/api";

export default function Reporter() {
  return (
    <select className="form-select">
      <option value="">Ava Swift</option>
      <option value="">Cole Reed</option>
      <option value="">Mia Blake</option>
      <option value="">Lily Lane</option>
    </select>
  );
}
