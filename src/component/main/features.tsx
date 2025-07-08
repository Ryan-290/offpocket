import Image from "next/image";

export default function Features( {key, alt, src, title, desc} ) {

  return (
    <div key={key}>
      <div className='relative p-5 sm:p-10 md:p-15'>
        <div className='relative w-full aspect-[500/500]'>
          <Image
            alt={alt}
            src={src}
            fill
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center'>
        {title}
      </div>
      <div className='text-xs sm:text-base md:text-lg lg:text-xl text-center py-[2vw] px-2'>
        {desc}
      </div>

    </div>
  )
}
