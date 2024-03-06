import {useEffect } from "react";

//Custom hook to detect clicks outside the drop down items

function useOutsideAlerter(ref, onOutsideClick) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          onOutsideClick();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, onOutsideClick]);
  }
  
  export default useOutsideAlerter;