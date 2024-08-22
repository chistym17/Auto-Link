import { FaUserPlus, FaFileAlt, FaCreditCard, FaDollarSign } from 'react-icons/fa';

export const AvailableZaps = () => {
  return (
    <section className="py-12 ">
      <div className="  bg-white max-w-7xl h-[300px] mx-auto px-4 border-custom">
        <h2 className="text-3xl font-bold text-[#F38186] text-center mt-1">Available Zaps</h2>
        <p className="text-lg text-gray-700 text-center mt-2">
          Choose from our ready-to-use Zaps to automate common tasks and streamline your workflow.
        </p>
        <div className="mt-8 flex gap-6 mb-6 ">
          <div className="bg-[#FD9B59] text-white p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/2 lg:w-1/4">
            <FaUserPlus size={24} className="text-white" />
            <div>
              <h3 className="text-xl font-semibold">New User Signup</h3>
              <p className="text-sm mt-1">Automatically welcome new users and add them to your CRM.</p>
            </div>
          </div>
          <div className="bg-[#F38186] text-white p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/2 lg:w-1/4">
            <FaFileAlt size={24} className="text-white" />
            <div>
              <h3 className="text-xl font-semibold">New Form Submitted</h3>
              <p className="text-sm mt-1">Capture form submissions and trigger automated responses or workflows.</p>
            </div>
          </div>
          <div className="bg-[#FD9B59] text-white p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/2 lg:w-1/4">
            <FaCreditCard size={24} className="text-white" />
            <div>
              <h3 className="text-xl font-semibold">Payment Info</h3>
              <p className="text-sm mt-1">Manage and track payment information with ease.</p>
            </div>
          </div>
          <div className="bg-[#F38186] text-white p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/2 lg:w-1/4">
            <FaDollarSign size={24} className="text-white" />
            <div>
              <h3 className="text-xl font-semibold">Make a Payment</h3>
              <p className="text-sm mt-1">Automate payment processes and streamline transactions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
