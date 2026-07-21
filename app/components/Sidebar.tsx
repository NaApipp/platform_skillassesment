import { GraduationCap, ClipboardList, Grid2X2, SquareArrowRightExit, UserStar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkStyle = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? 'flex items-center gap-1 px-4 py-3 rounded-lg bg-[#1a6fa0] border-l-4 border-orange-400'
      : 'flex items-center gap-1 px-4 py-3 rounded-lg hover:bg-[#1a6fa0]/50 border-l-4 border-transparent';
  }
  return (
    <>
      <div className="flex h-screen w-64 flex-col justify-between border-e bg-[#008ED3]">
        <div className="px-4 py-6">
          <span className="flex items-center gap-1 ml-4">
            <GraduationCap
              className="size-7 text-white"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
            />
            <span className="text-xl tracking-wider font-medium text-white">
              Skill<span className="font-extrabold">Sight</span>
            </span>
          </span>

          <ul className="mt-6 space-y-1">
            {/* Menu 1 */}
            <li>
              <Link href="/dashboard" className={getLinkStyle('/dashboard')}>
                <Grid2X2
                  className="size-5 text-white"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                />
                <span className="text-sm font-medium text-white">
                  Dashboard
                </span>
              </Link>
            </li>

            {/* Menu 2 */}
            <li>
              <Link href="/penilaian-skill" className={getLinkStyle('/penilaian-skill')}>
                <ClipboardList
                  className="size-5 text-white"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                />
                <span className="text-sm font-medium text-white">
                  Penilaian Skill
                </span>
              </Link>
            </li>
            
            {/* Menu 3 */}
            <li>
              <Link href="/hasil-saya" className={getLinkStyle('/hasil-saya')}>
                <SquareArrowRightExit
                  className="size-5 text-white"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                />
                <span className="text-sm font-medium text-white">
                  Hasil Saya
                </span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Direct Login Dashboard */}
        <div className="sticky inset-x-0 bottom-0 border-t border-white">
          <Link
            href="/login-dashboard"
            className="flex items-center gap-2 bg-[#008ED3] p-4 hover:bg-[#008ED3]/40 "
          >
            <UserStar
              className="size-5 text-white"
              strokeWidth={2}
              
              stroke="currentColor"
              fill="none"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium text-white">
                  {" "}
                  Login Dashboard{" "}
                </strong>

                <span className="text-white"> klik untuk login </span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
