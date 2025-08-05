            <div className="flex space-x-4">
              <Link href="/mypage">
                <Image
                  src={profileImage || '/defaultProfile.png'}
                  alt="프로필"
                  width={30}
                  height={30}
                  className="rounded-full transition-transform duration-300 hover:scale-110"
                />
              </Link>
              <LogoutButton />
            </div>