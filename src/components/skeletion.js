import React from "react";

const Skeletion = () => {
  return (
    <div class="h-[250px] shadow rounded-md p-4 w-[450px] ">
      <div class="animate-pulse flex space-x-4 justify-center">
        <div class="flex flex-col justify-center item-center gap-12 w-full">
          <div class=" bg-white rounded h-[40px]"></div>
          <div class=" bg-white rounded h-[40px]"></div>
          <div class=" bg-white rounded h-[40px] w-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeletion;
