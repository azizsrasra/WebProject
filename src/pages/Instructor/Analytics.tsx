import React from "react";

const Analytics: React.FC = () => {
  return (
    <div className="page">
      <h2>Course Analytics</h2>

      <div className="card">
        <h3>Total Students</h3>
        <p>1245</p>
      </div>

      <div className="card">
        <h3>Active Courses</h3>
        <p>12</p>
      </div>

      <div className="card">
        <h3>Monthly Views</h3>
        <p>87,430</p>
      </div>
    </div>
  );
};

export default Analytics;
