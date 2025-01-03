import React from 'react'
import {urlForImage} from "@/sanity/lib/utils"
import Image from "next/legacy/image";

const ImagePortableCom = ({ value }) => {
    if (!value?.asset?._ref) {
        return value;
    }
    return (
        <>
            <div className='flex justify-center flex-col'>
               
                    <Image
                        alt={value.alt || "Image"}
                        loading="lazy"
                        src={`${urlForImage(value)}`}
                        height={value?.imageHeight ?? '400'}
                        width={value?.imageWidth ?? '300'}
                        objectFit='contain'                   
                    />
                {
                    value.alt &&  <i className='text-gray-600 flex justify-center text-center'>{value.alt}</i>
                }
               


            </div>
        </>
    );
}

export default ImagePortableCom