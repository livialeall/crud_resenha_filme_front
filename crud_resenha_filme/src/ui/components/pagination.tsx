import { useState } from "react";
import { Review } from "../../data/reviews";
interface PaginationProps {
    pagesList:number[]
    selectedPageNumber:number
    onPageChange: (page: number) => void;
  }


const Pagination = ({pagesList,selectedPageNumber,onPageChange} : PaginationProps) => {
  return (
    <>
          <div className="flex justify-between align-center">
            <div className="justify-around g-6 ">
              {pagesList.map((item) => (
                <button
                  onClick={() => onPageChange(item)}
                  value={item}
                  className={item == selectedPageNumber ? "subbutton active" : "subbutton"}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
    </>
  );
};

export default Pagination;
