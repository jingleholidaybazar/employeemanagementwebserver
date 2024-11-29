import React from "react";

const Welcome = () => {
  return (
    <div>
      <section className=" bg-gray-50"> 
         <h3 className=" text-red-600 font-bold">WELCOME................. <span className=" text-green-600">NITISH YADAV</span></h3>
        <div className=" flex justify-center items-center w-full h-[20rem] sm:w-full">
          <div>
            <h1 className=" uppercase text-3xl text-red-600 font-serif font-semibold tracking-wider ">
              Your journey to success starts<br/> here at <span className=" text-green-600">Namrata Universal</span>.
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
