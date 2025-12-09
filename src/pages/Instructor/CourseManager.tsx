import React, { useState } from "react";

const CourseManager: React.FC = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Course created:", title, desc);
  };

  return (
    <div className="page">
      <h2>Manage Courses</h2>

      <form onSubmit={handleCreate} className="form">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Course Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button type="submit">Create Course</button>
      </form>

      <h3>Your Courses</h3>
      <ul>
        <li>Intro to AI</li>
        <li>Web Development Basics</li>
        <li>Data Structures</li>
      </ul>
    </div>
  );
};

export default CourseManager;
