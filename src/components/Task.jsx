import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';
import { TiWarningOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../redux/features/tokenSlice';
import { itemsApi } from '../api/axiosClient';
import Dots from './Dots';
import { setItem } from '../redux/features/itemSlice';

const barFull = 'absolute left-0 top-0 bg-myGreen h-4 rounded-full transition-all duration-200 ease-in-out';

const Task = ({ item, indL, indR, moveR, moveL }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [task, setTask] = useState(item.name);
  const [progress, setProgress] = useState(item.progress_percentage);

  const token = useSelector(getToken);

  const dispatch = useDispatch();

  const handleEdit = async (e, todo) => {
    e.preventDefault();

    const formData = {
      target_todo_id: todo,
      name: task,
      progress_percentage: progress,
    };

    try {
      await itemsApi.updateItem(item.todo_id, item.id, formData, token).then((res) => dispatch(setItem(res.data)));
      setEdit(false);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();

    console.log(item.todo_id, item.id);
    try {
      await itemsApi.deleteItem(item.todo_id, item.id, token);
      dispatch(setItem({ id: item.id }));
      setEdit(false);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  let tag;
  let barProgress;

  let color = ['border-myLilac', 'border-mySoftBlue', 'border-myYell', 'border-myOrange'];
  let progressColor = ['bg-myLilac', 'bg-mySoftBlue', 'bg-myYell', 'bg-myOrange'];

  let tagIndex = indL % color.length;
  tag = color[tagIndex];
  barProgress = progressColor[tagIndex];

  return (
    <>
      <div className={`backg p-4 border-[1px] rounded relative mt-2 ${tag}`}>
        <h4 className=" font-bold text-sm leading-6 text-white first-letter:capitalize pb-2 border-b-[1px] border-btnGray border-dashed">
          {item.name}
        </h4>
        <div className="flex mt-4 gap-x-[30px] items-center justify-between w-full">
          <div className="flex gap-3 items-center w-11/12">
            <div className="w-11/12 h-4 bg-brGray rounded-full relative">
              <div
                className={
                  item.progress_percentage === 100
                    ? barFull
                    : `absolute left-0 top-0 ${barProgress} h-4 rounded-l-full transition-all duration-200 ease-in-out`
                }
                style={{ width: `${item.progress_percentage}%` }}
              ></div>
            </div>
            {item.progress_percentage === 100 ? (
              <AiFillCheckCircle size={16} className=" text-myGreen" />
            ) : (
              <p className=" text-[#757575] text-xs leading-5">{item.progress_percentage}%</p>
            )}
          </div>
          <button
            className={`text-[#757575] ${open ? 'bg-brGray rounded' : ''}`}
            aria-label="dots"
            onClick={() => setOpen(!open)}
          >
            <BsThreeDots size={20} />
          </button>
        </div>

        {/* dots */}
        <Dots
          open={open}
          setOpen={() => setOpen(false)}
          right={(e) => {
            handleEdit(e, moveR.id);
          }}
          indL={indL}
          indR={indR}
          left={(e) => {
            handleEdit(e, moveL.id);
          }}
          edits={async () => {
            setEdit(true);
            setOpen(false);
          }}
          deletes={async () => {
            setRemove(true);
            setOpen(false);
          }}
        />
      </div>

      {/* edit */}
      <div
        className={`fixed inset-0 w-full z-50 min-h-screen shadow-1c bg-myBlack/60 justify-center items-center ${
          edit ? 'flex ' : 'hidden'
        }`}
      >
        <div className="w-1/3 bg-myGray rounded-lg">
          <div className="flex justify-between items-center p-6">
            <h1 className="text-white font-bold text-lg">Edit Task</h1>
            <button onClick={() => setEdit(false)}>
              <FiX size={20} className="text-myOrange hover:opacity-70" />
            </button>
          </div>
          <form className="px-6 flex flex-col" onSubmit={(e) => handleEdit(e, item.todo_id)}>
            <label className="label">Task Name</label>
            <input
              type="text"
              name="title"
              id="title"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="modal-input"
              placeholder="Type your Task"
            />
            <label className="label">Progress</label>
            <input
              type="number"
              max={100}
              min={0}
              name="description"
              id="description"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="modal-input-progress "
              placeholder="Type your Progress"
            />
            <div className="flex self-end gap-x-[10px] py-6">
              <button type="button" className="btn-cancel" onClick={() => setEdit(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Save Task
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* delete */}
      <div
        className={`fixed inset-0 w-full z-50 min-h-screen shadow-1c bg-myBlack/60 justify-center items-center ${
          remove ? 'flex ' : 'hidden'
        }`}
      >
        <div className="w-1/3 bg-myGray rounded-lg">
          <div className="flex justify-between items-center p-6">
            <div className="flex items-center gap-x-3">
              <TiWarningOutline size={20} className="text-myOrange" />
              <h1 className="text-white font-bold text-lg">Delete Task</h1>
            </div>
            <button onClick={() => setRemove(false)}>
              <FiX size={20} className="text-myOrange hover:opacity-70" />
            </button>
          </div>
          <form className="px-6 flex flex-col" onSubmit={handleRemove}>
            <p className="text-white">Are you sure want to delete this task? your action can’t be reverted.</p>
            <div className="flex self-end gap-x-[10px] py-6">
              <button type="button" className="btn-cancel" onClick={() => setRemove(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-delete">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Task;
