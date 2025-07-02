import React, { useRef } from "react";

const feedbacks = [
  {
    username: "Ayush Gupta",
    message: "This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    username: "Priya Sharma",
    message: "Really helpful in understanding backend structure and connecting frontend with AI!This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    username: "Rohan Mehta",
    message: "The way explanations are provided is top-notch. I recommend it to every developer!This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    username: "Sneha Patil",
    message: "I was able to build my final year project with ease. Thank you for the step-by-step help.This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.",
    image: "https://randomuser.me/api/portraits/women/88.jpg",
  },
  {
    username: "Harsh Goel",
    message: "This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    username: "Riya Arora",
    message: "Really helpful in understanding backend structure and connecting frontend with AI!This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    username: "Rohan Singh",
    message: "The way explanations are provided is top-notch. I recommend it to every developer!This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    username: "Honey Patil",
    message: "I was able to build my final year project with ease. Thank you for the step-by-step help.This platform is extremely helpful and intuitive. Loved the clean UI and smooth experience.",
    image: "https://randomuser.me/api/portraits/women/88.jpg",
  },
];

function Feedback(){
    const containerRef = useRef();

  const scroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="">
        <div className="bg-sky-50 text-center border-y-1 border-gray-200/50 ">
            <h2 className="font-medium text-4xl text-sky-800 py-4">Doctors Feedbacks</h2>   
        </div>   
        <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2  rounded-full p-2 z-10"
        >
          ◀
        </button>
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        >
          {feedbacks.map((item, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white shadow-md rounded-2xl p-4 flex flex-col items-center space-y-3 my-6"
            >
              <img
                src={item.image}
                alt={item.username}
                className="w-16 h-16 rounded-full object-cover"
              />
              <h3 className="font-semibold text-lg">{item.username}</h3>
              <p className="text-gray-600 text-sm text-center">{item.message}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-2 z-10"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
export default Feedback;