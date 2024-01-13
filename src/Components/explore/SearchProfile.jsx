import React from "react";
import { FiLink } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import { FaTwitter } from "react-icons/fa";
import { BsFolder } from "react-icons/bs";
import { ImOffice } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";

export default function SearchProfile(props) {
  let link = `${props.blog}`;
  if (link.substring(0, 8) !== "https://") {
    link = "https://" + link;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-white bg-black bg-opacity-5 backdrop-blur-lg rounded-2xl w-full p-5 mt-10 md:m-10">
          <img
            src={props.avatar}
            alt="Avatar not available."
            className="w-28 h-28 rounded-full m-6"
          />
          <div key={props.id} className="tracking-wider text-2xl font-semibold">
            {props.name}
          </div>
          <div className="md:text-lg italic tracking-wide flex m-2">
            @
            <a
              href={`https://github.com/${props.login}`}
              className="underline"
              target="_blank"
            >
              {props.login}
            </a>
          </div>
          {props.blog && (
            <div className="flex md:text-lg m-1.5">
              <FiLink className="m-1 md:w-5 md:h-5" />
              <a href={link} className="underline" target="_blank">
                {props.blog}
              </a>
            </div>
          )}
          {props.location && (
            <div className="flex text-lg m-1.5">
              <TfiLocationPin className="m-1 md:w-5 md:h-5" />
              {props.location}
            </div>
          )}
          {props.company && (
            <div className="flex text-lg m-1.5">
              <ImOffice className="m-1 md:w-5 md:h-5" />
              {props.company}
            </div>
          )}
          {props.bio && (
            <div className="flex text-lg m-1.5 justify-center text-center">
              <FaRegUser className="m-1 md:w-5 md:h-5" />
              {props.bio}
            </div>
          )}
          {props.twitter_username && (
            <div className="flex text-lg m-1.5">
              <FaTwitter className="m-1 md:w-5 md:h-5" />
              <a
                href={`https://twitter.com/${props.twitter_username}`}
                className="underline"
                target="_blank"
              >
                {props.twitter_username}
              </a>
            </div>
          )}
          <div className="flex text-lg m-1.5">
            <BsFolder className="m-1 md:w-5 md:h-5" /> {props.public_repos}{" "}
            Repos
          </div>
          <div className="text-lg m-1.5">
            <span className="mx-2">Followers: {props.followers}</span> |{" "}
            <span className="mx-2">Following: {props.following}</span>
          </div>
        </div>
      </div>
    </>
  );
}
