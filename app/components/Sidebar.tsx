import { GraduationCap, ClipboardList, Grid2X2, SquareArrowRightExit } from "lucide-react";

export default function Sidebar() {
  return (
    <>
      <div className="flex h-screen w-64 flex-col justify-between border-e bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="px-4 py-6">
          <span className="flex items-center gap-1 ml-4">
            <GraduationCap
              className="size-7 text-gray-700 dark:text-gray-200"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
            />
            <span className="text-xl tracking-wider font-medium text-gray-700 dark:text-gray-200">
              Skill<span className="font-extrabold">Sight</span>
            </span>
          </span>

          <ul className="mt-6 space-y-1">
            {/* Menu 1 */}
            <li className="flex items-center gap-1 ml-4">
                <Grid2X2
                className="size-5 text-gray-700 dark:text-gray-200"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                />
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                {" "}
                Dashboard{" "}
              </a>
            </li>

            {/* Menu 2 */}
            <li className="flex items-center gap-1 ml-4">
                <ClipboardList
                className="size-5 text-gray-700 dark:text-gray-200"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                />
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                {" "}
                Penilaian Skill{" "}
              </a>
            </li>
            
            {/* Menu 3 */}
            <li className="flex items-center gap-1 ml-4">
                <SquareArrowRightExit
                className="size-5 text-gray-700 dark:text-gray-200"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                />
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                {" "}
                Hasil Saya{" "}
              </a>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-gray-800">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium text-gray-900 dark:text-white">
                  {" "}
                  Eric Frusciante{" "}
                </strong>

                <span> eric@frusciante.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
