import React from 'react';
import Link from 'next/link';

export default function({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <i className={process.env.REACT_APP_SITE_ICON} />
          </h3>
        </div>
      ) : (
        <h3>
          <Link href="/dashboard">
            <a>{process.env.REACT_APP_NAME}</a>
          </Link>
        </h3>
      )}
    </div>
  );
}
