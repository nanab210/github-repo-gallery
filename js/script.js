// target div with a class of 'overview'
const overview = document.querySelector(".overview");
// add Github username
const username = "nanab210";
//select unordered list to display the repos list
const displayRepos = document.querySelector(".repo-list");

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
