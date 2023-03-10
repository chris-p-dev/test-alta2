const fs = require('fs');

const releaseData = JSON.parse(fs.readFileSync('changelog.json'));
const currentVersion = JSON.parse(fs.readFileSync('package.json')).version;
const versionBump = currentVersion.split('.');

const bumpArray = {
  major: versionBump[0],
  minor: versionBump[1],
  patch: versionBump[2],
};

const majorCommits = releaseData.unreleased.commits
  .filter((commit) => {
    const regex = /!:/;
    return commit.subject.match(regex);
  })
  .map((commit) => {
    return '[' + commit.partialHash.slice(0, 7) + '] ' + commit.subject;
  });

const minorCommits = releaseData.unreleased.commits
  .filter((commit) => {
    return commit.type === 'feat';
  })
  .map((commit) => {
    return '[' + commit.partialHash.slice(0, 7) + '] ' + commit.subject;
  });

const patches = releaseData.unreleased.commits
  .filter((commit) => {
    const regex = /!:/;
    return commit.type !== 'feat' && !commit.subject.match(regex);
  })
  .map((commit) => {
    return commit.partialHash;
  });

if (typeof patches !== 'undefined' && patches.length > 0) {
  bumpArray.patch = parseFloat(bumpArray.patch) + 1;
}
if (typeof minorCommits !== 'undefined' && minorCommits.length > 0) {
  bumpArray.minor = parseFloat(bumpArray.minor) + 1;
  bumpArray.patch = 0;
}
if (typeof majorCommits !== 'undefined' && majorCommits.length > 0) {
  bumpArray.major = parseFloat(bumpArray.major) + 1;
  bumpArray.minor = 0;
  bumpArray.patch = 0;
}

const vArray = [];

for (const prop in bumpArray) {
  if (bumpArray.hasOwnProperty(prop)) {
    vArray.push(bumpArray[prop]);
  }
}

const suggestedVersion = vArray.join('.');

console.log(
  '\x1b[33mSuggestedVersion: \x1b[0m',
  '\x1b[33m' + 'v' + suggestedVersion + '\x1b[0m',
);

if (typeof majorCommits !== 'undefined' && majorCommits.length > 0) {
  console.log(
    '\x1b[36m' +
      'Reason: The following commits mention a breaking change:' +
      '\x1b[0m',
  );
  console.log('- ', majorCommits);
}
if (
  typeof minorCommits !== 'undefined' &&
  minorCommits.length > 0 &&
  majorCommits.length <= 0
) {
  console.log(
    '\x1b[36m' +
      'Reason: The following commits are of type `feat`:' +
      '\x1b[0m',
  );
  console.log('- ', minorCommits);
}
if (minorCommits.length <= 0 && majorCommits.length <= 0) {
  console.log(
    '\x1b[36m' +
      'Reason: There were no commits that were a breaking change or contained `feat` in them.' +
      '\x1b[0m',
  );
}
