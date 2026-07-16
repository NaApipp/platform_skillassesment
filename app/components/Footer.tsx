export default function Footer() {
    return (
        <>
            {/* Footer */}
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-4 md:p-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()}{" "}
              <a
                href="#"
                className="font-semibold text-gray-900 dark:text-white hover:underline"
              >
                SkillSight Inc.
              </a>
              . All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-200">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
        </>
    );
}