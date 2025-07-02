const CardService = ({image , title}) =>{
    return(
    <div className="flex flex-col min-w-[200px] bg-white rounded-4xl p-5 overflow-hidden hover:shadow-lg transition-shadow duration-100">
      <img src={image} alt={title} className=" " />
      <div className="p-4">
        <h2 className="text-xl text text-center text-sky-900 justify-center font-semibold mb-2">{title}</h2>
      </div>
    </div>
    );

}
export default CardService;