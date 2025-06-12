export default () => {
  const svgStyle = { width: "100%" };

  const Logo = () => (
    <svg
      style={svgStyle}
      viewBox="0 0 63 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M47.25 47.458C55.9485 38.7595 55.9485 24.6565 47.25 15.958C38.5515 7.25952 24.4485 7.25952 15.75 15.958C7.05151 24.6565 7.05151 38.7595 15.75 47.458C24.4485 56.1565 38.5515 56.1565 47.25 47.458Z" stroke="#0F172A" strokeWidth="1.38962" strokeMiterlimit="10" />
      <path d="M10.5366 47.7971V17.5057C10.5366 16.9599 11.1511 16.6391 11.599 16.9495L33.4166 32.0952C33.8041 32.3639 33.8041 32.9368 33.4166 33.2076L11.599 48.3533C11.1511 48.6657 10.5366 48.3429 10.5366 47.7971Z" stroke="url(#paint0_linear_53_10115)" strokeWidth="6.99574" strokeMiterlimit="10" strokeLinecap="round" />
      <defs>
        <linearGradient id="paint0_linear_53_10115" x1="2.23416" y1="20.3361" x2="26.863" y2="44.9649" gradientUnits="userSpaceOnUse">
          <stop stopColor="#007EF8" />
          <stop offset="1" stopColor="#FF4A9A" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900">
      <section className="relative mx-auto max-w-4xl px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-sm text-blue-500 mb-2">Updated on 12 June 2025</h1>
          <h2 className="text-4xl font-bold mb-3">Support & Help Center</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We're here to assist you. Whether you're facing technical issues, need help with your account, or want to report something—this is the place.
          </p>
        </div>

        <div className="space-y-10">
          {/* FAQ Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">🔧 Frequently Asked Questions</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>How do I upload a video?</li>
              <li>Where can I check my channel statistics?</li>
              <li>How do I delete my account?</li>
              <li>What to do if my video gets reported?</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">📩 Contact Us</h3>
            <p className="text-gray-700 mb-3">For anything not listed above, reach out to us:</p>
            <div className="space-y-2 text-gray-800">
              <div>
                <span className="font-semibold">Email: </span> support@videotube.com
              </div>
              <div>
                <span className="font-semibold">Phone: </span> +91-9876543210
              </div>
              <div>
                <span className="font-semibold">Support Hours: </span> Mon–Fri: 9:00 AM – 6:00 PM (IST)
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">🔒 Safety & Privacy</h3>
            <p className="text-gray-700">
              We value your privacy. Read our{" "}
              <a className="underline text-blue-600 hover:text-blue-800" href="/privacy">Privacy Policy</a>{" "}
              and{" "}
              <a className="underline text-blue-600 hover:text-blue-800" href="/terms">Terms of Service</a>.
            </p>
          </div>

          {/* Community */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">🗨️ Community Support</h3>
            <p className="text-gray-700">
              Join our <a className="underline text-blue-600 hover:text-blue-800" href="/forum">community forums</a> to connect with others, get advice, and share feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 border-t border-gray-300 bg-white">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between py-6">
          <div className="w-12 sm:w-16 mb-4 sm:mb-0">
            <Logo />
          </div>
          <p className="text-sm text-gray-500">©2025 VideoTube. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
