export function StudentProgramPricing() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-[#1c1c1e] p-10">
        <div className="text-center mb-6">
          <h4 className="text-[#fdfdff] text-2xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            Middle & High School<br />Unlimited Training
          </h4>
          <div className="mb-2">
            <span className="text-[#fdfdff] text-5xl" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
              $295
            </span>
          </div>
          <p className="text-[#a7a7ad] text-sm" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            per month
          </p>
        </div>

        <p className="text-[#a7a7ad] text-center mb-8 italic text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          Unlimited gym access not included
        </p>

        <a
          href="https://app.moonclerk.com/pay/jgowzl1n5jy"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-[#cc1e23] text-[#fdfdff] px-8 py-4 hover:bg-[#a01419] transition-all tracking-wider"
          style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}
        >
          Enroll Student
        </a>
      </div>
    </div>
  );
}
