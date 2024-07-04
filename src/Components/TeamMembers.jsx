// src/Components/TeamMembers.js

import React, { useContext } from 'react';
import p1 from '../images/p1.jpeg';
import p2 from '../images/p2.jpeg';
import p3 from '../images/p3.jpeg';
import { ThemeContext } from '../Context/ThemeContext';

const TeamMembers = () => {
  const { theme } = useContext(ThemeContext);

  const teamMembers = [
    {
      name: 'Abdimahad',
      title: 'CEO',
      image: p1,
      description: 'As the CEO, Abdimahad leads our company with a vision to innovate and excel. With years of experience in the industry, he ensures our strategies align with our goals and values.',
      skills: [
        { name: 'WordPress', proficiency: '90%' },
        { name: 'HTML5', proficiency: '75%' },
        { name: 'CSS3', proficiency: '84%' },
        { name: 'Woocommerce', proficiency: '45%' },
      ],
    },
    {
      name: 'Ahmed',
      title: 'Project Manager',
      image: p2,
      description: 'Ahmed, our dedicated Project Manager, oversees all our projects with precision and care. He ensures that every project is delivered on time and meets the highest standards.',
      skills: [
        { name: 'WordPress', proficiency: '64%' },
        { name: 'HTML5', proficiency: '22%' },
        { name: 'CSS3', proficiency: '84%' },
        { name: 'Woocommerce', proficiency: '45%' },
      ],
    },
    {
      name: 'Maryan',
      title: 'Developer',
      image: p3,
      description: 'Maryan is a skilled Developer who brings our ideas to life with clean and efficient code. Her expertise in various technologies helps us stay ahead in the tech world.',
      skills: [
        { name: 'WordPress', proficiency: '64%' },
        { name: 'HTML5', proficiency: '22%' },
        { name: 'CSS3', proficiency: '84%' },
        { name: 'Woocommerce', proficiency: '45%' },
      ],
    },
  ];

  return (
    <div className={`team-members-container ${theme.background} ${theme.text}`}>
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Who We Are? Meet Our Team!</h2>
      <p className="text-center mb-8 text-white">We listen, we discuss, we advise and develop. We love to learn and use the latest technologies.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`team-member bg-white rounded-lg shadow-lg p-6 text-center hover:transform hover:scale-105 transition-transform duration-300`}
          >
            <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
            <p className="text-gray-500 mb-4">{member.title}</p>
            <p className="text-gray-700 mb-4">{member.description}</p>
            <div className="skills">
              {member.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.proficiency}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: skill.proficiency }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
