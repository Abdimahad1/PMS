import React from 'react';
import { FaFrog, FaCode, FaBuilding, FaPaintBrush } from 'react-icons/fa';

const ProjectsPopup = () => {
  return (
    <div className="absolute top-16 left-24 w-80 bg-blue-800 text-white p-4 rounded shadow-lg">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Projects</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center p-2 bg-blue-700 rounded mb-2">
          <FaFrog className="text-xl mr-3" />
          <div>
            <h3 className="font-bold">CryptoFrog</h3>
            <p>Crypto company • UX/UI Design</p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-blue-700 rounded mb-2">
          <FaCode className="text-xl mr-3" />
          <div>
            <h3 className="font-bold">Software</h3>
            <p>IT company • Design system</p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-blue-700 rounded mb-2">
          <FaBuilding className="text-xl mr-3" />
          <div>
            <h3 className="font-bold">Architect</h3>
            <p>Construction company • Webflow</p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-blue-700 rounded mb-2">
          <FaPaintBrush className="text-xl mr-3" />
          <div>
            <h3 className="font-bold">Marketly</h3>
            <p>Consulting company • Illustrations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPopup;
