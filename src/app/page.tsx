import Features from "@/app/component/main/features";
import PageIntro from "@/app/component/main/pageIntro";
import Image from "next/image";


export default function Home() {

  const serviceFeatures = [
    {
      id: 1,
      title: "날짜 보고 !",
      desc: (
        <div>
          <p>캘린더에서 축제와 팝업을 한눈에,</p>
          <p>원하는 날, 딱 맞는 경험을 찾을 수 있어요.</p>
        </div>
      ),
      image: "/main/main_02_01.png",
    },
    {
      id: 2,
      title: "장소 보고 !",
      desc: (
        <div>
          <p>지도를 열고 주변을 둘러보세요.</p>
          <p>비일상이 멀리 있지 않을지도 몰라요.</p>
        </div>
      ),
      image: "/main/main_02_02.png",
    },
    {
      id: 3,
      title: "맘껏 담고 !",
      desc: (
        <div>
          <p>틈나는 대로 포켓에 저장하세요.</p>
          <p>나중에 결정이 쉬워집니다.</p>
        </div>
      ),
      image: "/main/main_02_03.png",
    },
  ];

  const pageIntro = [
    {
      id: 1,
      to: "OFF PICK!",
      href: "/offpick",
      title: "나만의 휴일, 어디로 떠나볼까요?",
      desc: (
        <div>
          <p>OFF PICK!은 당신의 주말을 위한 큐레이션 공간입니다.</p>
          <p>축제, 전시, 팝업스토어 등 다양한 비일상을 날짜와 위치별로 모아 보여드려요.</p>
          <p>지금, 한 번의 클릭으로 일상 밖으로 떠나보세요.</p>
        </div>
      ),
      image: "/main/main_03.png",
    },
    {
      id: 2,
      to: "OFF 먹킷리스트",
      href: "/eating",
      title: "한층 더 즐길 수 있는!",
      desc: (
        <div>
          <p>비일상 속 경험을 더 특별하게 만드는 건, 그 하루의 한 끼.</p>
          <p>OFF 먹킷리스트는 축제·팝업 근처의 숨은 맛집들을 소개해드립니다. </p>
          <p>데이트, 나들이, 혼밥까지—당신의 하루를 더 맛있게 채워보세요.</p>
        </div>
      ),
      image: "/main/main_04.png",
    },
  ];

  return (
    <main className="flex-1">
      {/* section 1 - 소개 */}
      <section className="pb-10">
        <div className='relative w-full aspect-[1800/800]'>
          <Image
            alt="main-배경"
            src="/main/main01.png"
            fill
            className="object-contain"
          />
          <div className='absolute top-[5vw] left-[10vw] text-white'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold'>
              OFF 일상을 끄고 비일상을 꺼내다
            </div>
            <div className='text-xs sm:text-base md:text-lg lg:text-xl py-[3vw]'>
              <p>반복되는 하루에 OFF를 누르고,</p>
              <p>주말에는 새로운 장소와 감정, 경험을 담아보세요.</p>
              <p>OFF pocket은 전국 곳곳의 소소하고 특별한 비일상을 소개합니다.</p>
              <br />
              <p>지금은 내가 주인공이 되는 날,</p>
              <p>비일상 속 작은 여행이 당신을 기다리고 있어요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* section 2 - 특징 */}
      <section className="max-w-7xl mx-auto px-4 py-5 md:py-10">
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center'>
          당신의 OFF POCKET, 이렇게 준비해보세요.
        </div>
        <div className='grid grid-cols-3 space-y-8 pt-5 md:pt-10'>
          {serviceFeatures.map(item => (
            <Features
              key={item.id}
              alt={item.title}
              src={item.image}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </section>

      {/* section 3 - 페이지 소개 */}
      <section className="max-w-7xl mx-auto px-4 py-5 md:py-10">
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-[#C1776D] pb-10'>
          이제 일상은 OFF !
        </div>
        {pageIntro.map(item => (
          <PageIntro
            key={item.id}
            alt={item.to}
            src={item.image}
            title={item.title}
            desc={item.desc}
            href={item.href}
          />
        ))}
      </section>
    </main>
  );
}
