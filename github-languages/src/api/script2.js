require('dotenv').config();
const axios = require('axios');
const R = require('ramda')
const githubUser = process.env.GITHUB_USER;
const githubToken = process.env.TOKEN;
var parse = require('parse-link-header');

const getRepos = async (username = githubUser, page = 1, token = githubToken) => {
    const repos = []
    const res = await axios.get(`https://api.github.com/users/${username}/repos?access_token=${token}&page=${page}`)
    let lastPage = parse(res.headers.link).last.page
    for (let i = 1; i <= lastPage; i++) {
        const res = await axios.get(`https://api.github.com/users/${username}/repos?access_token=${token}&page=${i}`)
        repos.push(...res.data.map(({ name }) => name))
    }
    return repos
};

const getLanguage = async (repoName, username = githubUser, token = githubToken) => {
    const res = await axios.get(`https://api.github.com/repos/${username}/${repoName}/languages?access_token=${token}`)
    return R.pipe(
        R.toPairs,
        R.map(([key, value]) => ({ name: key, value })),
      )(res.data)
};

export const getAllLanguages = async username => {
    
    const repos = await getRepos(username)
    const languages = repos.map(async repo => ({ repo, languages: await getLanguage(repo, username) }))
    return Promise.all(languages)
};

export const aggregateRepoLanguages = repos => {
    const totals = {}
    repos.map(({ languages }) => 
        languages.forEach(({ name, value }) => {
            totals[name] = (R.defaultTo(0, totals[name])) + value
        })
    )
    return R.pipe(
        R.toPairs,
        R.map(([key, value]) => ({ name: key, value })),
      )(totals)
};

// aggregateRepoLanguages().then(console.log)