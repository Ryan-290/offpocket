'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.refresh(); // 페이지 새로고침 → 서버 컴포넌트 재실행
  };

  return (
    <button onClick={handleLogout} className="border-none text-black hover:text-[#DBA39A] hover:font-semibold cursor-pointer">
      로그아웃
    </button>
  );
}