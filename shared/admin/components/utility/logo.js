import React from 'react';
import { Link } from 'react-router-dom';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              <i className={process.env.REACT_APP_SITE_ICON} />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard" style={{lineHeight: '50px'}}>{process.env.REACT_APP_NAME}</Link>
        </h3>
      )}
    </div>
  );
};
