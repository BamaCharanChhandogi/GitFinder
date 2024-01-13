import React from "react";
import { BsStarFill } from "react-icons/bs";
import { BsCodeSlash } from "react-icons/bs";
import { AiOutlineCode } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import { BiGitRepoForked } from "react-icons/bi";

export default function RepoInfo(props) {
  return (
    <>
      <div className="bg-black font-manrope tracking-wide bg-opacity-20 w-full md:w-5/6 rounded-2xl p-4 mt-4 md:mt-6 md:mx-auto text-slate-100">
        {/* commitcount remaining to add */}
        <div className="flex justify-between">
          <div>
            <a href={props.url} className="flex">
              <span className="text-xl hover:underline cursor-pointer text-blue-600 font-extrabold">
                {props.name}
              </span>
              <HiOutlineExternalLink className="md:my-[3px] my-[4px] mx-1.5 text-2xl text-slate-600" />
            </a>
            {props.desc && (
              <div className="flex md:mt-2 text-slate-400 text-sm">
                {props.desc}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex my-1">
              <BsStarFill className="md:my-[3px] my-[2.5px] mx-1.5 text-yellow-300" />
              <span>
                {props.star_count > 1 ? "Stars" : "Star"}: {props.star_count}
              </span>
            </div>
            <div className="flex my-1">
              <BiGitRepoForked className="md:my-[3px] my-[2.5px] mx-1" />
              {props.forks_count > 1 ? "Forks" : "Fork"}: {props.forks_count}
            </div>
          </div>
        </div>
        <div className="flex my-4 justify-between">
          <div className="flex">
            <BsCodeSlash className="md:my-[3px] my-[4px] mx-1.5" />
            Language: {props.language}
          </div>
          <div className="flex">
            <AiOutlineCode className="md:my-[3px] my-[2.5px] mx-1.5" />
            <a href={props.clone_url} className="hover:underline">
              Clone URL
            </a>
          </div>
        </div>
      </div>
    </>
  );
}