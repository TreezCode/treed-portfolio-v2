export interface Experience {
  title: string
  company: string
  date: string
  points: string[]
}

export const experiences: Experience[] = [
  {
    title: 'Information Security, AAS',
    company: 'Northampton Community College',
    date: 'September 2022 - May 2025',
    points: [
      'Pursuing Associate of Applied Science degree in Information Security with focus on network security and ethical hacking',
      'Achieved Dean\'s List recognition every semester while working full-time, demonstrating strong academic performance and time management',
      'Earned CompTIA Security+ certification demonstrating expertise in threat analysis, cryptography, and security operations',
      'Completed job shadowing programs at Forward Thinking Technologies (cybersecurity firm) and Software Consulting Services (software development firm)',
      'Hands-on experience with security tools including Metasploit, Burp Suite, Wireshark, Nessus, Nmap, and Kali Linux',
      'CCNA: Introduction to Networks coursework (Cisco) covering routing, switching, and network protocols',
    ],
  },
  {
    title: 'Full-stack Web Development Bootcamp',
    company: 'University of Denver',
    date: 'January 2019 - April 2019',
    points: [
      'Completed a full-stack web development bootcamp to acquire skills necessary to design, create and bring concepts to life',
      'Learned front-end development using HTML5, CSS3, JavaScript ES6, React, Handlebars, and Bootstrap',
      'Learned back-end development using Node.js, Express, Firebase, MySQL, MongoDB, and NPM',
      'Developed collaborative skills through group projects and peer programming',
    ],
  },
  {
    title: 'Delivery Associate',
    company: 'Walmart',
    date: 'April 2024 - Present',
    points: [
      'Manage daily pickup and delivery routes ensuring timely completion and high customer satisfaction',
      'Maintained excellent on-time delivery performance while adapting to changing priorities and schedules',
      'Resolved customer issues proactively to maintain service standards and strengthen client trust',
      'Demonstrated strong time management and organizational skills in fast-paced logistics environment',
    ],
  },
]
