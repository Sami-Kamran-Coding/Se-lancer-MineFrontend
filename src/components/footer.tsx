export const Footer = () => (
  <footer className="mt-auto py-8 text-center border-t border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50">
    <div className="max-w-5xl mx-auto px-4">
      <p className="text-slate-600 text-sm sm:text-base">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
          InfluenceHub
        </span>
        . All rights reserved.
      </p>
      <div className="flex justify-center gap-4 mt-3 text-slate-500">
        <a
          href="#"
          className="hover:text-blue-600 transition-colors duration-300 text-sm"
        >
          Privacy Policy
        </a>
        <span>•</span>
        <a
          href="#"
          className="hover:text-blue-600 transition-colors duration-300 text-sm"
        >
          Terms of Service
        </a>
        <span>•</span>
        <a
          href="#"
          className="hover:text-blue-600 transition-colors duration-300 text-sm"
        >
          Contact
        </a>
      </div>
    </div>
  </footer>
);
