import React, { useEffect, useState } from 'react'

const useMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    const handleResize = () =>{
       const check = window.innerWidth < breakpoint; 
       setIsMobile(check)
    }


    useEffect(() =>{
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])
    // This effect runs once on mount to set the initial state and adds the resize listener
    return [isMobile]
 
}

export default useMobile