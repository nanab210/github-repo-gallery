// target div with a class of 'overview'
const overview = document.querySelector(".overview");
// add Github username
const username = "nanab210";
//select unordered list to display the repos list
const displayRepos = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const gitProfile = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();

  //console.log(data);

  displayUserInfo(data);
};

gitProfile();

const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
`;
  overview.append(div);
  listOfRepos();
};

const listOfRepos = async function () {
  const fetchRepo = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100}`
  );
  const repoData = await fetchRepo.json();
  //console.log(repoData);
  displayRepoInfo(repoData);
};

const displayRepoInfo = function (repos) {
  for (repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    displayRepos.append(repoItem);
  }
};

displayRepos.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const specRepo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await specRepo.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  //console.log(languageData);

  const languages = [];
  for (const language in languageData) {
    //console.log(languages);
    languages.push(language);
  }
  displaySpecRepo(repoInfo, languages);
};

const displaySpecRepo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  allRepos.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

  repoData.append(div);
};
