import { FaSignInAlt, FaCogs, FaLink, FaRocket } from "react-icons/fa";

export const HowItWorks = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-[#F38186] to-[#FD9B59] text-white px-2">
      <h2 className="text-center text-4xl font-bold mb-12">How IntegrateIT Works</h2>
      <div className="flex flex-col lg:flex-row justify-around items-center lg:space-x-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full text-[#F38186]">
            <FaSignInAlt size={32} />
          </div>
          <h3 className="mt-4 text-xl font-semibold">Sign in to IntegrateIT</h3>
          <p className="mt-2">Create your account or sign in to start automating your workflow.</p>
        </div>
        
        {/* Arrow */}
        <div className="hidden lg:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full text-[#FD9B59]">
            <FaCogs size={32} />
          </div>
          <h3 className="mt-4 text-xl font-semibold">Create Your Desired Zap</h3>
          <p className="mt-2">Design your custom workflows with easy-to-use tools.</p>
        </div>

        {/* Arrow */}
        <div className="hidden lg:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full text-[#F38186]">
            <FaLink size={32} />
          </div>
          <h3 className="mt-4 text-xl font-semibold">Integrate Webhook to Your App</h3>
          <p className="mt-2">Seamlessly connect your app to start receiving triggers.</p>
        </div>

        {/* Arrow */}
        <div className="hidden lg:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full text-[#FD9B59]">
            <FaRocket size={32} />
          </div>
          <h3 className="mt-4 text-xl font-semibold">Automate Workflow</h3>
          <p className="mt-2">Let IntegrateIT do the heavy lifting while you focus on growth.</p>
        </div>
      </div>
    </div>
  );
};
