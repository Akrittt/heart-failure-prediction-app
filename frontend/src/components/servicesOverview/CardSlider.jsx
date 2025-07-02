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
    <div className="flex  p-5 " >
      <div className="flex flex-wrap justify-center gap-5 md:gap-10 px-6 py-6 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-[250px] h-55 md:h-75 bg-white rounded-3xl p-4 text-center border-y-2 border-sky-300/30"
          >
            <img src={card.image} alt={card.title} className="h-35 md:h-40 mx-auto rounded" />
            <h3 className="font-semibold text-lg md:text-xl py-5 md:py-10 text-blue-900">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
