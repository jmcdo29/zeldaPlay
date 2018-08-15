const { exec } = require('child_process');
exec('git status --porcelain', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  const files = stdout.split('\n');
  const filesToUpdate = [];
  files.forEach(file => {
    if (file.trim().startsWith('M') || file.trim().startsWith('A')) {
      filesToUpdate.push(file.trim().split(' ')[1]);
    }
  });
  let updateString = '';
  filesToUpdate.forEach(file => {
    updateString += file.trim() + ' ';
  });
  exec(`git add ${updateString}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error ${error}.`);
    }
    console.log(stdout);
  });
});