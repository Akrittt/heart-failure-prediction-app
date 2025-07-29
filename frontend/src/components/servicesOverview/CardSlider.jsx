import React, { useRef, useEffect } from "react";

const CardSlider = ({ cards }) => {
  // const scrollRef = useRef(null);

  // Auto slide logic
  // useEffect(() => {
  //   const scrollInterval = setInterval(() => {
  //     if (scrollRef.current) {
  //       scrollRef.current.scrollBy({ left: 220, behavior: "smooth" });

  //       // Optional: Loop back to start when end is reached
  //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  //       if (scrollLeft + clientWidth >= scrollWidth - 1) {
  //         scrollRef.current.scrollTo({ left: 0 });
  //       }
  //     }
  //   }, 3000); // 3 seconds

  //   return () => clearInterval(scrollInterval); // Clean up
  // }, []);

  return (
    <div className="flex p-5 text-blue-800" >
      <div className="flex flex-wrap justify-center gap-10  p-6 mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-53 h-auto  bg-white rounded-2xl p-4 text-center border-2 shadow-xl border-sky-200/30 hover:shadow-2xl hover:shadow-gray-300/30 transition-shadow duration-300"
          >
            <img src={card.image} alt={card.title} className="h-35 mx-auto rounded" />
            <h3 className="font-semibold text-md py-3">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
