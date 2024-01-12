import React from "react";
import GitHubCalendar from "react-github-calendar";
function Github(props) {
  return (
    <div className="Github">
      <h1 className="text-center text-2xl" style={{ paddingBottom: "20px" }}>
        Days I <strong className="text-purple-500">Code</strong>
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
