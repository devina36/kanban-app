import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsApi } from '../api/axiosClient';
import { getToken } from '../redux/features/tokenSlice';
import { FiPlusCircle, FiX } from 'react-icons/fi';
import Task from './Task';
import { setItem } from '../redux/features/itemSlice';

const Board = ({ item, indL, indR, moveR, moveL }) => {
  const token = useSelector(getToken);

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState('');
  const [progress, setProgress] = useState('');

  const dispatch = useDispatch();

  const datas = useSelector((state) => state.kanban.item);

  useEffect(() => {
    const getdata = async () => {
      await itemsApi.getItem(item.id, token).then((res) => {
        setData(res.data);
      });
    };
    getdata();
  }, [datas]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: task,
      progress_percentage: progress,
    };

    try {
      await itemsApi.createItem(item.id, formData, token).then((res) => dispatch(setItem(res.data)));
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  let tag;

  let color = [
    `text-myBlue bg-tagbg border-brBlue`,
    `text-myYellow bg-bgYellow border-brYellow`,
    `text-myRed bg-bgRed border-brRed`,
    `text-myGreen bg-bgGreen border-brGreen`,
  ];

  let tagIndex = indL % color.length;
  tag = color[tagIndex];

  return (
    <>
      <div className={`p-4 rounded-lg border-[1px] min-w-[326px] snap-start h-fit ${tag}`}>
        <h3 className={`px-2 py-[2px] rounded mb-2 font-normal text-xs leading-5 capitalize border-[1px] w-fit ${tag}`}>
          {item.title}
        </h3>
        <h4 className="text-myBlaxk font-bold text-xs leading-5 mb-2">{item.description}</h4>
        {data.length !== 0 ? (
          data.map((task) => {
            return <Task key={task.id} item={task} indL={indL} indR={indR} moveR={moveR} moveL={moveL} />;
          })
        ) : (
          <div className="bg-[#FAFAFA] text-sm leading-6 border-btnGray border-[1px] rounded w-full px-4 py-2 text-[#757575]">
            No Task
          </div>
        )}
        <button
          className="flex gap-x-2 items-center flex-wrap mt-2 text-[#1D1F20] hover:opacity-60"
          onClick={() => setOpen(true)}
        >
          <FiPlusCircle size={17} />
          <span className="text-xs leading-5">New Task</span>
        </button>
      </div>

      {/* modal create task */}
      <div
        className={`fixed inset-0 w-full z-50 min-h-screen shadow-1c bg-[#404040]/60 justify-center items-center ${
          open ? 'flex ' : 'hidden'
        }`}
      >
        <div className="w-1/3 bg-white rounded-lg">
          <div className="flex justify-between items-center p-6">
            <h1 className="text-myBlaxk font-bold text-lg">Create Task</h1>
            <button onClick={() => setOpen(false)}>
              <FiX size={20} className="text-[#404040]" />
            </button>
          </div>
          <form className="px-6 flex flex-col" onSubmit={handleSubmit}>
            <label className="label">Task Name</label>
            <input
              type="text"
              name="title"
              id="title"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="modal-input"
              placeholder="Type your Task"
              required
            />
            <label className="label">Progress</label>
            <input
              type="number"
              required
              max={100}
              min={0}
              name="description"
              id="description"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="modal-input-progress"
              placeholder="Type your Progress"
            />
            <div className="flex self-end gap-x-[10px] py-6">
              <button type="button" className="btn-cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Save Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Board;
