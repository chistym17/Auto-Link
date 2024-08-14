export const GetStartedSection = () => {
    return (
      <div className="max-w-6xl mx-auto bg-white rounded-lg border-custom shadow-lg p-12 my-16">
        <h2 className="text-center text-3xl font-bold text-[#F38186]">Let's Get Started</h2>
        <p className="text-center text-lg text-gray-700 mt-4">
          Ready to automate your workflows? Create your first Zap with IntegrateIT and experience the power of seamless automation.
        </p>
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-[#F38186] to-[#FD9B59] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            onClick={() => { /* Add your navigation or action here */ }}
          >
            Create Your First Zap
          </button>
        </div>
      </div>
    );
  };
  