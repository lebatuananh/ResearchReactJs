import { Tooltip, Button } from 'antd';
import React from 'react';
import './FormLabel.less';

const FormLabel = ({ tooltip, children }) => {
  return (
    <Tooltip title={tooltip ? tooltip : children}>
      <span>{children}</span>
    </Tooltip>
  );
};

export { FormLabel };
