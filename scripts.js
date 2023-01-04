const favicon = document.getElementById("favicon");
const profilePicture = document.getElementById("img");
const presentationText = document.getElementById("presentationText");
const university = document.getElementById("university");
const experience1 = document.getElementById("experience1");
const experience2 = document.getElementById("experience2");

const fullname = document.querySelectorAll(".fullname");
const email = document.getElementById("email");
const tel = document.getElementById("tel");
const loc = document.getElementById("loc");
const web = document.getElementById("web");

const referenceFullname = document.getElementById("referenceFullname");
const referenceLocation = document.getElementById("referenceLocation");
const referenceTel = document.getElementById("referenceTel");
const referenceEmail = document.getElementById("referenceEmail");

const newPerson = document.getElementById("newPerson");

function getPerson(cb) {
  return fetch("https://randomuser.me/api/")
    .then((r) => r.json())
    .then((r) => cb(r.results[0]));
}

async function setPerson(p) {
  let person = await p;
  document.title = `${person.name.first}'s CV `;
  profilePicture.src = person.picture.large;
  favicon.href = person.picture.medium;
  fullname.forEach(
    (e) => (e.innerHTML = `${person.name.first} ${person.name.last}`)
  );
  email.innerHTML = `${person.email}`;
  tel.innerHTML = `${person.phone}`;
  loc.innerHTML = `${person.location.country}, ${person.location.state}, ${person.location.city}`;
  web.innerHTML = `www.${person.name.first}${person.name.last}.com`;
  setPresentation();
  university.textContent = `${person.location.state} University, 2016`;
  experience1.textContent = `${person.location.city} Solutions`;
  experience2.textContent = `${person.location.state} Bank`;
}

async function setReference(p) {
  let person = await p;
  referenceFullname.innerHTML = `${person.name.first} ${person.name.last}`;
  referenceLocation.innerHTML = `${person.location.country}, ${person.location.state}, ${person.location.city}`;
  referenceTel.innerHTML = `${person.phone}`;
  referenceEmail.innerHTML = `${person.email}`;
}

function setPresentation() {
  const random = Math.random();
  const presentations = [
    "Senior front-end web developer with 7+ years of experience coding websites that convert in e-commerce. Proficient with HTML, CSS, Shopify and GTM tag setup. Most notably, improved the average time on page by 40% and improved user experience scores for all projects.",
    "Software engineer with a proven ability to adapt in both self-starting and collaborative environments while staying focused on achieving high-quality results under strict deadlines. Eager to obtain a challenging position at a prestigious company like Dream Version that will expand my learning.",
  ];
  if (random > 0.5) {
    presentationText.innerHTML = presentations[0];
  } else {
    presentationText.textContent = presentations[1];
  }
}

getPerson(setPerson);
getPerson(setReference);

newPerson.addEventListener("click", () => {
  getPerson(setPerson);
  getPerson(setReference);
});
