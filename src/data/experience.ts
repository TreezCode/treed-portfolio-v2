export interface Experience {
  title: string
  company: string
  date: string
  points: string[]
}

export const experiences: Experience[] = [
  {
    title: 'Computer Science Major',
    company: 'Northampton Community College',
    date: 'September 2022 - May 2024',
    points: [
      'Pursued a degree in computer science to expand knowledge and skills in the field',
      'Completed courses in data structures, algorithms, computer networks, and database management',
      'Participated in coding challenges and hackathons to improve problem-solving and teamwork skills',
      'Graduated May 2024',
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
    title: 'Rideshare Driver',
    company: 'Lyft / Uber',
    date: 'November 2017 - 2021',
    points: [
      'Navigated busy city streets to safely and promptly deliver patrons to their destination',
      'Maintained high ratings and received positive feedback from riders',
      'Demonstrated excellent customer service skills by engaging with riders and creating a comfortable experience',
      'Adhered to company policies and regulations while providing efficient transportation services',
    ],
  },
  {
    title: 'Lead Sales Associate',
    company: 'The Shelter: Strainwise',
    date: 'March 2016 - November 2017',
    points: [
      'Implemented new marketing initiatives to drive sales and improve overall performance',
      'Studied product markets to adjust sales pitches and adapt strategies for optimized sales',
      'Developed sales training programs to enhance team performance and increase sales',
      'Collaborated with the management team to develop promotional strategies and enhance customer experience',
    ],
  },
]
