import React, { useEffect, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { todosApi } from '../api/axiosClient';
import Board from '../components/Board';
import { setTodos } from '../redux/features/itemSlice';

const Home = ({ token }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const Todos = useSelector((state) => state.kanban.todos);

  useEffect(() => {
    const getdata = async () => {
      await todosApi.getTodos(token).then((res) => {
        setData(res.data);
      });
    };

    getdata();
  }, [Todos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      description: desc,
    };

    try {
      await todosApi.createTodos(formData, token).then((res) => dispatch(setTodos(res.data)));
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="bg-white px-6 py-[18px] border-b-[1px] border-[#E0E0E0] fixed w-full top-0">
        <div className="flex gap-x-[10px] items-center">
          <h1 className=" font-bold text-lg text-myBlaxk">Product</h1>
          <button
            className="flex gap-x-1 px-4 py-1 shadow-1a rounded-lg items-center bg-myBlue text-white"
            onClick={() => setOpen(true)}
          >
            <FiPlus size={16} className=" font-bold text-xs" />
            <span className=" font-bold text-xs leading-5">Add New Group</span>
          </button>
        </div>
      </header>
      {/* <main className="px-6 mt-24"> */}
      {!data.length ? (
        'Kosong'
      ) : (
        <main className=" px-6 pt-24 w-full flex gap-4 max-h-screen overflow-x-scroll snap-mandatory snap-x scroll-p-4">
          {data.map((item, i) => {
            return (
              <Board
                key={item.id}
                item={item}
                indL={i}
                indR={data.length - 1}
                moveR={data[i + 1]}
                moveL={data[i - 1]}
              />
            );
          })}
        </main>
      )}
      {/* </main> */}

      {/* modal create todos */}
      <div
        className={`fixed inset-0 w-full z-50 min-h-screen bg-[#404040]/60 justify-center items-center ${
          open ? 'flex ' : 'hidden'
        }`}
      >
        <div className="w-1/3 bg-white rounded-lg">
          <div className="flex justify-between items-center p-6">
            <h1 className="text-myBlaxk font-bold text-lg">Create Tados</h1>
            <button onClick={() => setOpen(false)}>
              <FiX size={20} className="text-[#404040]" />
            </button>
          </div>
          <form className="px-6 flex flex-col" onSubmit={handleSubmit}>
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
              placeholder="Type your Title"
              required
            />
            <label className="label">Description</label>
            <input
              required
              type="text"
              name="description"
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="modal-input"
              placeholder="Type your Description"
            />
            <div className="flex self-end gap-x-[10px] py-6">
              <button type="button" className="btn-cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Save Todos
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
