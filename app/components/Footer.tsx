export default function Footer() {
    return (
        <>
            {/* Footer */}
        <footer className="border-t border-gray-200 bg-[#FBF9F9] p-4 md:p-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-[#9CA3AF] sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()}{" "}
              <a
                href="#"
                className="font-semibold text-[#4B5563] hover:underline"
              >
                SkillSight Inc.
              </a>
              . All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#4B5563]">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#4B5563]">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
        </>
    );
}