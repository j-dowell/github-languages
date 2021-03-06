require('dotenv').config()
const rp = require('request-promise');
const githubUser = process.env.GITHUB_USER;
const token = process.env.TOKEN;

// Get list of user's repos
const getRepos = async (username) => {
  let repoList = [];
  const options = {
    uri: `https://api.github.com/users/${username}/repos?access_token=${token}`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  return rp(options)
  .then((repos) => {
      for (let repo in repos) {
        repoList.push(repos[repo].name);
      }
      return repoList
    })
    .catch((err) => {
        console.log(err)
    });
}

// Given a repo and user, returns JSON containing repo/language stats
const getLanguage = (repo, username) => {
  const options = {
    url: `https://api.github.com/repos/${username}/${repo}/languages?access_token=${token}`,
    headers: {
      'User-Agent': 'request'
    }
  }

  return rp(options)
    .then((result) => {
      const languages = JSON.parse(result);
      // Get total codebase size
      const totalBytes = Object.values(languages).reduce((a, b) => a + b);
      let percentageInformation = {};
      // Calculating percantage of each language in repo
      for (let language in languages) {
        percentageInformation[language] = parseFloat(((languages[language] / totalBytes) * 100).toFixed(2));
      }
      return {
        repo,
        languages,
        totalBytes,
        percentageInformation
      }
      })
      .catch((err) => {
          // API call failed...
      });
}

let languages = []

// Looping over all of user's repos and retreiving language info
const getAllRepoLanguages = async (repoList) => {
  await repoList.forEach(res => {
    getLanguage(res, githubUser).then(languages.push(res))
  })
}

let x = await getRepos(githubUser)
let y = await getAllRepoLanguages(x)
console.log(y)

// getRepos(githubUser).then(res => {
//   getAllRepoLanguages(res);
// }); 

// console.log(languages)