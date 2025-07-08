import Image from "next/image";


export default function EatingPage() {

  return (
    <div className="max-w-7xl mx-auto px-4 min-h-screen">
      <div className='flex flex-col md:flex-row py-10 sm:py-15 items-center'>
        <div className='relative w-[200px] md:w-[400px] lg:w-[600px] aspect-[600/400] rounded-4xl overflow-hidden'>
          <Image
            alt="updating"
            src="/updating.png"
            fill
            className="object-contain"
          />
        </div>
        <div className="px-4 py-5 md:py-0 md:pl-15">
          <div className='text-xl sm:text-2xl lg:text-3xl font-semibold py-5'>
            <div>곧, 비일상 근처의 숨은 맛집을 만나보세요.</div>
            <div>지금은 준비 중이에요!</div>
          </div>
          <div className='text-base sm:text-lg lg:text-xl py-5'>
            <div>비일상적인 경험을 떠난 그 순간,</div>
            <div>무엇을 먹을지 고민하지 않아도 되도록,  </div>
            <div>offpocket이 엄선한 근처 맛집을 추천해드릴게요.</div>
            <br />
            <div>현재는 열심히 업데이트 중이에요!  </div>
            <div>조금만 기다려주시면 만나보실 수 있어요 !!</div>
          </div>
        </div>
      </div>
    </div>
  )
}