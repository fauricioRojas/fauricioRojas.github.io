const name = 'Fauricio Rojas Hernández';
const occupation = 'Front End Developer';
const experience = "I have been working since July, 2016. I started working in Hewlett Packard Enterprise (HPE) as part of Intership program, after 2 first months I was hired. I worked there around 7 months because I was part of the organization that toguether CSC they founded DXC.Technology. Then I was working in DXC for a year and since April, 2018 I'm working at First Factory.";
const about = "Hey! I'm Fauricio, I'm 24 years old and I'm from Pital, San Carlos and currently I live in Belén, Heredia. I like so much web development and my prefered programming language is JavaScript. In my free time I play videogames and learn new technologies. I'm fan of the best team in the world, Real Madrid C.F.";
const skills = [
  'AngularJS',
  'ES6',
  'jQuery',
  'NodeJS',
  'ReactJS',
  'Redux',
  'Mobx',
  'Jest',
  'Enzyme',
  'JavaScript',
  'PHP',
  'CSS',
  'Bootstrap',
  'SCSS',
  'Java',
  'C#',
  'Python',
  'SQL',
  'MongoSQL',
  'Webpack'
];
const projects = [
  {
    name: 'Hiring Tool',
    description: 'Speed up recruiting process activities.',
    role: 'Front End Developer',
    technologies: ['JavaScript', 'AngularJS', 'MySQL', 'SCSS', 'HTML5'],
    responsibilities: ['Bug fixing.', 'Develop new features.', 'Consulting.']
  },
  {
    name: 'Arcsight Investigate',
    description: 'Proactively hunt and defeat unknown threats and decrease the impact of security incidents.',
    role: 'JavaScript Developer',
    technologies: ['JavaScript', 'ReactJS', 'Redux', 'SailsJS', 'RethinkDB', 'Vertica', 'Docker', 'SCSS', 'Plotly.JS', 'Grommet', 'Jest', 'Enzyme'],
    responsibilities: ['Bug fixing.', 'Develop new features.', 'Create unit testing.', 'Consulting.']
  }
  // {
  //   name: 'MNG',
  //   description: '',
  //   role: 'Front End Developer',
  //   technologies: ['JavaScript', 'ReactJS', 'Redux', 'SCSS', 'Jest', 'Enzyme',],
  //   responsibilities: ['Bug fixing.', 'Develop new features.', 'Create unit testing.']
  // }
];
const socialNets = [
  {
    className: 'btn text-white fab fa-facebook-square',
    link: 'https://www.facebook.com/fauricioRojas'
  },
  {
    className: 'btn text-white fab fa-instagram',
    link: 'https://www.instagram.com/fauriciorojas'
  },
  {
    className: 'btn text-white fab fa-github',
    link: 'https://github.com/fauricioRojas'
  },
  {
    className: 'btn text-white fab fa-linkedin',
    link: 'https://www.linkedin.com/in/fauriciorojas'
  }
];

const menuItems = [
  'about',
  'experience',
  'skills',
  'projects',
  'contact'
];
function setName() {
  document.querySelector('.name').innerHTML = name;
}

function setOccupation() {
  document.querySelector('.occupation').innerHTML = occupation;
}

function setAbout() {
  document.querySelector('.about').innerHTML = about;
}

function setExperience() {
  document.querySelector('.experience').innerHTML = experience;
}

function setProjects() {
  const projectsContainer = document.querySelector('.projects');
  
  for (let project of projects) {
    const mainContainer = document.createElement('section');
    mainContainer.setAttribute('class', 'my-card col-lg-6 col-md-6');
    const body = document.createElement('section');
    body.setAttribute('class', 'body');
    const name = document.createElement('h5');
    name.setAttribute('class', 'card-title');
    name.appendChild(document.createTextNode(project.name));
    const description = document.createElement('p');
    description.appendChild(document.createTextNode(project.description));
    description.setAttribute('class', 'card-subtitle mb-2 text-muted');
    const role = document.createElement('section');
    role.appendChild(document.createTextNode(project.role));
    role.setAttribute('class', 'font-weight-light mb-2');
    
    const technologies = document.createElement('section');
    for (let technology of project.technologies) {
      const tech = document.createElement('span');
      tech.appendChild(document.createTextNode(technology));
      tech.setAttribute('class', 'badge badge-info mr-1');
      technologies.appendChild(tech);
    }

    const responsabilities = document.createElement('ul');
    responsabilities.setAttribute('class', 'mt-2 mb-0');
    for (let responsability of project.responsibilities) {
      const resp = document.createElement('li');
      resp.appendChild(document.createTextNode(responsability));
      responsabilities.appendChild(resp);
    }

    body.appendChild(name);
    body.appendChild(description);
    body.appendChild(role);
    body.appendChild(technologies);
    body.appendChild(responsabilities);
    
    mainContainer.appendChild(body);
    projectsContainer.appendChild(mainContainer);
  }
}

function setSkills() {
  const skillsContainer = document.querySelector('.skills');

  for (let skill of skills) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(skill));

    skillsContainer.appendChild(li);
  }
}

function setSocialNets() {
  const socialContainer = document.querySelector('.social');

  for (let socialNet of socialNets) {
    const a = document.createElement('a');
    a.setAttribute('class', socialNet.className);
    a.setAttribute('href', socialNet.link);
    a.setAttribute('target', '_blank');
    a.addEventListener('click', () => {
      console.log('fdds')
      document.querySelector('.sidebar-menu').style.width = '0';
    });

    socialContainer.appendChild(a);
  }
}

function setYear() {
  const year = new Date().getFullYear();
  document.querySelector('.year').innerHTML = `&COPY; ${year}`;
}

function setSidebarMenuItems() {
  const sidebar = document.querySelector('.sidebar-menu');

  for (let item of menuItems) {
    const a = document.createElement('a');
    a.appendChild(document.createTextNode(item));
    a.setAttribute('href', `#${item}`);
    sidebar.appendChild(a);
  }
}

document.querySelector('.fa-bars').addEventListener('click', () => {
  document.querySelector('.sidebar-menu').style.width = '100%';
});
document.querySelector('.times').addEventListener('click', () => {
  document.querySelector('.sidebar-menu').style.width = '0';
});

setName();
setOccupation();
setAbout();
setExperience();
setProjects();
setSocialNets();
setSkills();
setYear();
setSidebarMenuItems();
