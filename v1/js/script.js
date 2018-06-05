var greeting = "Hey! I'm Fauricio";
var description = "My name is Fauricio Rojas Hernández, I'm 23 years old and I'm from Pital, San Carlos. I like so much web development and my prefered programming language is JavaScript. I think the networking is one of the best way to learn and convey knowledge. In my free time I play videogames and learn new technologies. I'm fan of the best team in the world, Real Madrid C.F.";
var skills = [
  'AngularJS',
  'ES6',
  'jQuery',
  'NodeJS',
  'ReactJS',
  'Redux',
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
var socialNets = [
  {
    className: 'btn fa fa-facebook',
    link: 'https://www.facebook.com/fauricioRojas'
  },
  {
    className: 'btn fa fa-instagram red',
    link: 'https://www.instagram.com/fauriciorojas'
  },
  {
    className: 'btn fa fa-github',
    link: 'https://github.com/fauricioRojas'
  },
  {
    className: 'btn fa fa-linkedin',
    link: 'https://www.linkedin.com/in/fauriciorojas'
  }
];

function sayHello() {
  document.querySelector('#greeting-container').innerHTML = greeting;
}

function setDescription() {
  document.querySelector('#description-container').innerHTML = description;
}

function setSkills() {
  var skillsContainer = document.querySelector('#skills-container');

  for (var skill of skills) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(skill));

    skillsContainer.appendChild(li);
  }
}

function setSocialNets() {
  var socialContainer = document.querySelector('#social-container');

  for (var socialNet of socialNets) {
    var a = document.createElement('a');
    a.setAttribute('class', socialNet.className);
    a.setAttribute('href', socialNet.link);
    a.setAttribute('target', '_blank');

    socialContainer.appendChild(a);
  }
}

function setYear() {
  var year = new Date().getFullYear();
  document.querySelector('#year').innerHTML = '&COPY; ' + year;
}

sayHello();
setDescription();
setSocialNets();
setSkills();
setYear();
