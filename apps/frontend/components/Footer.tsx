import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#F38186] to-[#FD9B59] text-white py-10">
      <div className="max-w-6xl  px-4 flex flex-col md:flex-row justify-between">
        {/* Company Info */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold">IntegrateIT</h3>
          <p className="text-sm mt-2">
            Streamline your workflow and automate tasks with ease. Experience efficiency and speed with IntegrateIT.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-[#F38186]">Home</a></li>
            <li><a href="#" className="hover:text-[#F38186]">About Us</a></li>
            <li><a href="#" className="hover:text-[#F38186]">Services</a></li>
            <li><a href="#" className="hover:text-[#F38186]">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-white hover:text-[#F38186]">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-white hover:text-[#F38186]">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-white hover:text-[#F38186]">
              <FaLinkedinIn size={24} />
            </a>
            <a href="#" className="text-white hover:text-[#F38186]">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <p className="text-sm mt-2">Email: info@integrateit.com</p>
          <p className="text-sm">Phone: +1 234 567 890</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white mt-8 pt-4 text-center text-sm">
        <p>&copy; 2024 IntegrateIT. All rights reserved.</p>
      </div>
    </footer>
  );
};
