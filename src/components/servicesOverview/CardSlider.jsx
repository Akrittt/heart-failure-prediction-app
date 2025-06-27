import React, { useRef, useEffect } from "react";

const CardSlider = ({ cards }) => {
  const scrollRef = useRef(null);

  // Auto slide logic
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 220, behavior: "smooth" });

        // Optional: Loop back to start when end is reached
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollRef.current.scrollTo({ left: 0 });
        }
      }
    }, 3000); // 3 seconds

    return () => clearInterval(scrollInterval); // Clean up
  }, []);

  return (
    <div className=" overflow-x-auto whitespace-nowrap scrollbar-hide p-5 bg-gradient-to-b bg-white to-sky-100 " ref={scrollRef}>
      <div className="flex space-x-6 px-4 py-6  ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="min-w-[300px] h-75 bg-white rounded-3xl p-4 text-center border-b-2 border-gray-200"
          >
            <img src={card.image} alt={card.title} className="h-48 mx-auto mb-2 rounded" />
            <h3 className="font-semibold text-2xl py-5 text-blue-800">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
