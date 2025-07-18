import Image from "next/image";
import FooterMenu from "./footerMenuButton";

export default function Footer() {

  const menu = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "OFF PICK!",
      href: "/offpick",
    },
    {
      id: 3,
      name: "OFF 먹킷리스트",
      href: "/eating",
    },
    {
      id: 4,
      name: "개인정보처리방침",
      href: "https://stump-safflower-a94.notion.site/233e5fc97f9b80d8b612fb5da3540d7a?source=copy_link",
    },
    {
      id: 5,
      name: "이용약관",
      href: "https://stump-safflower-a94.notion.site/233e5fc97f9b80b09c3ee493897c60c1?source=copy_link",
    },
  ];

  return (
    <footer className="bg-gray-100 w-full h-[200px] mt-20">
      <div className='flex flex-col max-w-7xl mx-auto px-4 py-10 space-y-2'>
        <div className='relative w-[200px] h-[60px]'>
          <Image
            alt="로고"
            src="/logotext.png"
            fill
            className="object-contain"
          />
        </div>
        <div className='flex space-x-4 pt-5'>
          {menu.map(item => (
            <FooterMenu key={item.id} href={item.href}>{item.name}</FooterMenu>
          ))}
        </div>
      </div>
    </footer>
  )
}