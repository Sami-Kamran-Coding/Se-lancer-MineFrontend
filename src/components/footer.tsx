export const Footer = () => (
    <footer className="bg-white text-black py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-bold text-lg">InfluenceHub</div>
            <p className="text-sm text-black mt-2">Connecting brands with creators. Trusted, transparent, and secure.</p>
          </div>

          <div>
            <div className="font-semibold">Company</div>
            <ul className="mt-2 text-sm text-black">
              <li>About</li>
              <li>Contact</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">Follow</div>
            <div className="flex gap-3 mt-2">
              <a href="#" className="text-black">Instagram</a>
              <a href="#" className="text-black ">YouTube</a>
              <a href="#" className="text-black ">TikTok</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} InfluenceHub — All rights reserved.</div>
      </footer>
);
