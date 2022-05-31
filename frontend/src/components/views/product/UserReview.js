import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { classNames } from "./className";
import Ripples from "react-ripples";

export default function UserReview(props) {
  const review = props.userReview;
  return (
    <article className="bg-yellow-400/[.2] border rounded-lg p-5 my-10">
      <div className="flex items-center mb-4 space-x-4 border-b border-gray-400 pb-3">
        <img
          className="w-10 h-10 rounded-full"
          src={review.pic}
          alt="user pic"
        ></img>
        <div className="font-medium text-grey">
          <p>{review.name}</p>
        </div>
      </div>

      <div className="flex items-center mb-1">
        {[0, 1, 2, 3, 4].map((rating) => (
          <StarIcon
            key={rating}
            className={classNames(
              review.productRating > rating
                ? "text-yellow-400"
                : "text-gray-500",
              "h-5 w-5 flex-shrink-0"
            )}
            aria-hidden="true"
          />
        ))}
        <h3 className="ml-2 text-sm font-semibold text-gray-900">
          {review.reviewTitle}
        </h3>
      </div>

      <p className="my-4 font-light text-gray-800 ">{review.reviewComment}.</p>

      <aside>
        <p className="mt-1 text-xs text-gray-500 ">
          {review.foundHelpful} people found this helpful
        </p>
        <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
          <Ripples
            className="!block"
            color={"rgba(253,128,36,.1)"}
            during={1200}
          >
            <button className="font-medium rounded-lg text-xs px-2 py-1.5 bg-[rgb(253,128,36)]     border-2 border-[rgb(253,128,36)]  hover:bg-white focus:bg-white focus:outline-none focus:outline-0 transition-all duration-500 ease-in-out">
              Helpful
            </button>
          </Ripples>
        </div>
      </aside>
    </article>
  );
}
