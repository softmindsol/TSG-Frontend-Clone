import React from 'react'

const CustomHeading = ({heading, textAlign, fontSize, fontWeight}) => {
  return (
    <h2 className={`${fontSize ? fontSize : "text-[20px]" } ${fontWeight ? fontWeight : "font-semibold"}  text-[#081722] ${textAlign ? textAlign: "text-center"} `} >
        {heading}
    </h2>
  )
}

export default CustomHeading