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
      'Associate of Applied Science in Information Security; Dean\'s List every semester while working full-time',
      'CompTIA Security+ certified: threat analysis, cryptography, and security operations',
      'Hands-on with Metasploit, Burp Suite, Wireshark, Nmap, and Kali Linux',
      'Job shadowing at a cybersecurity firm and a software development firm',
    ],
  },
  {
    title: 'Full-Stack Web Development Bootcamp',
    company: 'University of Denver',
    date: 'January 2019 - April 2019',
    points: [
      'Front-end: HTML5, CSS3, JavaScript ES6, React, and Bootstrap',
      'Back-end: Node.js, Express, Firebase, MySQL, and MongoDB',
      'Shipped group projects on tight deadlines through pair programming',
    ],
  },
  {
    title: 'Delivery Associate',
    company: 'Walmart',
    date: 'April 2024 - Present',
    points: [
      'Manage daily delivery routes with consistently high on-time performance',
      'Resolve customer issues proactively in a fast-paced logistics environment',
      'Balance full-time work with a degree program and freelance development',
    ],
  },
]
