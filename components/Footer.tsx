export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} FinanceEd PH. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition">
              About
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Personal finance education platform for Filipinos</p>
        </div>
      </div>
    </footer>
  );
}
