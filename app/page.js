"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState({ title: "", desc: "" });
  const [currentTodos, setCurrentTodos] = useState([]);
  const [help, setHelp] = useState("Help from OpenAI will appear here");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCurrentTodos(data.rows);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setTodos({ ...todos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch("/api", {
        body: JSON.stringify(todos),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      console.log(result);
      setTodos({ title: "", desc: "" });
    } catch (error) {
      console.error('Error submitting todo:', error);
    }
  };

  const getHelp = async (todo) => {
    setHelp("Loading...");
    try {
      const response = await fetch("/api/open", {
        body: JSON.stringify({ todo: todo }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setHelp(result.text);
    } catch (error) {
      console.error('Error fetching help:', error);
      setHelp("Error retrieving help.");
    }
  };

  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Todo AI</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">Home</a>
            <a className="mr-5 hover:text-gray-900">About</a>
          </nav>
        </div>
      </header>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add a Todo</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Helps you add a Todo. Add your Todo now</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="title" className="leading-7 text-sm text-gray-600">Todo Title</label>
                  <input onChange={handleChange} type="text" id="title" value={todos.title} name="title" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Todo Description</label>
                  <textarea onChange={handleChange} id="desc" name="desc" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={todos.desc}></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={handleSubmit} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Todo List</button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-indigo-500">ShyamDhanvi@gmail.com</a>
                <p className="leading-normal my-5">1 - 310 DK
                  <br />Karnataka, MN 56301
                </p>
                <span className="inline-flex">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container px-5 py-12 mx-auto">
        <section>
          <h1 className='text-2xl font-bold my-5'>Your Todos</h1>
          {currentTodos.map((items, index) => (
            <p key={index}>
              {items[0]}: {items[1]}
              <button className="mx-4 my-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => { getHelp(items[0]) }}>Get AI Help</button>
            </p>
          ))}
        </section>
      </div>
      <div className="container px-5 py-12 mx-auto">
        <section>
          <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>HelpFromOpenAI</h1>
          <p>{help}</p>
        </section>
      </div>
    </div>
  );
}
