import React from "react";
import GitHubCalendar from "react-github-calendar";
function Github(props) {
  return (
    <div className="rounded">
      <h1 className="text-center text-2xl" style={{ paddingBottom: "20px" }}>
        Days {props.name} <strong className="text-pink-500">Code</strong>
      </h1>
      <GitHubCalendar
        username={props.username}
        blockSize={11}
        blockMargin={5}
        fontSize={14}
      />
    </div>
  );
}

export default Github;
