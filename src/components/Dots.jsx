import React, { useEffect, useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { data } from 'autoprefixer';

const Dots = ({ open, setOpen, left, right, edits, deletes, indL, indR }) => {
  const ref = useRef(null);
  const onClickOutside = setOpen;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!open) return null;
  return (
    <div
      ref={ref}
      className={`absolute -bottom-1/4 translate-y-3/4 rounded-lg  w-[320px] p-4 z-20 backg shadow-1b -right-[280px]`}
    >
      {indL === indR ? (
        ''
      ) : (
        <button className="flex gap-x-[22px] text-white items-center mb-3 hover:text-myGreen" onClick={right}>
          <FiArrowRight />
          <span className=" text-sm leading-6 font-semibold ">Move Right</span>
        </button>
      )}

      {indL === 0 ? (
        ''
      ) : (
        <button className="flex gap-x-[22px] text-white items-center mb-3 hover:text-myGreen" onClick={left}>
          <FiArrowLeft />
          <span className=" text-sm leading-6 font-semibold">Move Left</span>
        </button>
      )}

      <button className="flex gap-x-[22px] text-white items-center  mb-3  hover:text-myGreen" onClick={edits}>
        <BiEditAlt />
        <span className=" text-sm leading-6 font-semibold">Edit</span>
      </button>
      <button className="flex gap-x-[22px] text-white items-center hover:text-myOrange" onClick={deletes}>
        <BiTrash />
        <span className=" text-sm leading-6 font-semibold">Delete</span>
      </button>
    </div>
  );
};

export default Dots;
