import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Personal Finance Visualizer
          </h2>
          <p>
            Track your expenses, manage budgets, and visualize your financial
            health.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p>
            Email:{" "}
            <a href="mailto:priyanktutorial@gmail.com" className="underline">
              priyanktutorial@gmail.com
            </a>{" "}
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+91 6395163538" className="underline">
              +91 6395163538
            </a>{" "}
          </p>
          <p>Address: ABES Engineering College, Ghaziabad</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <ul className="flex space-x-6">
            <li>
              <a
                href="https://github.com/Priyank-Aggarwal1024"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-2xl hover:text-gray-400" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/priyank-aggarwal-6656a7275/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl hover:text-gray-400" />
              </a>
            </li>
            <li>
              <a
                href="https://leetcode.com/u/Priyank_aggarwal28/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaCode className="text-2xl hover:text-gray-400" />
              </a>
            </li>
            <li>
              <a
                href="https://www.hackerrank.com/profile/MLB_22B5082062"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaHackerrank className="text-2xl hover:text-gray-400" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 border-t border-gray-700 pt-6">
        <p>
          &copy; {new Date().getFullYear()} Personal Finance Visualizer by
          Priyank Aggarwal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
