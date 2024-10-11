import React from "react";
import { BsStarFill } from "react-icons/bs";
import { BsCodeSlash } from "react-icons/bs";
import { AiOutlineCode } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import { BiGitRepoForked } from "react-icons/bi";

export default function RepoInfo(props) {
  return (
    <>
      <div className="bg-black font-manrope tracking-wide bg-opacity-20 w-full md:w-5/6 rounded-2xl p-4 mt-4 md:mt-6 md:mx-auto text-slate-100 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-3/4">
            <a href={props.url} className="flex items-center overflow-hidden">
              <span className="text-lg md:text-xl hover:underline cursor-pointer text-blue-600 font-extrabold truncate">
                {props.name}
              </span>
              <HiOutlineExternalLink className="my-[3px] mx-1.5 text-xl md:text-2xl text-slate-600" />
            </a>
            {props.desc && (
              <div className="mt-1 md:mt-2 text-slate-400 text-xs md:text-sm break-words">
                {props.desc}
              </div>
            )}
          </div>
          <div className="flex flex-col mt-2 md:mt-0">
            <div className="flex items-center my-1">
              <BsStarFill className="my-[2.5px] mx-1.5 text-yellow-300" />
              <span className="text-xs md:text-sm">
                {props.star_count > 1 ? "Stars" : "Star"}: {props.star_count}
              </span>
            </div>
            <div className="flex items-center my-1">
              <BiGitRepoForked className="my-[2.5px] mx-1" />
              <span className="text-xs md:text-sm">
                {props.forks_count > 1 ? "Forks" : "Fork"}: {props.forks_count}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row my-4 justify-between text-xs md:text-sm">
          <div className="flex items-center">
            <BsCodeSlash className="my-[4px] mx-1.5" />
            <span>Language: {props.language}</span>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <AiOutlineCode className="my-[2.5px] mx-1.5" />
            <a href={props.clone_url} className="hover:underline truncate">
              Clone URL
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
