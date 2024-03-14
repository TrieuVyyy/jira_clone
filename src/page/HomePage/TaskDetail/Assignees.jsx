import React from "react";
import { Select, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';

const MAX_COUNT = 3;

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

export default function Assignees() {
    const [value, setValue] = React.useState(['Ava Swift']);
  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );
  return (
    <Select
      mode="multiple"
      maxCount={MAX_COUNT}
      value={value}
      style={{
        width: '100%',
      }}
      onChange={setValue}
      suffixIcon={suffix}
      placeholder="Please select"
      options={[
        {
          value: 'Ava Swift',
          label: 'Ava Swift',
        },
        {
          value: 'Cole Reed',
          label: 'Cole Reed',
        },
        {
          value: 'Mia Blake',
          label: 'Mia Blake',
        },
        {
          value: 'Lily Lane',
          label: 'Lily Lane',
        },
      ]}
    />
  );
}
