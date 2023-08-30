import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import style from "./Loader.module.css"

export default function Loader() {
  return (
    <div className={style.loader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        
        visible={true}
        display="flex"

      />
    </div>
  );
}
