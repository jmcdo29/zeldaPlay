const { exec } = require('child_process');
exec('git diff --cached --name-only', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  const files = stdout.split('\n');
  const filesToUpdate = [];
  files.forEach(file => {
    filesToUpdate.push(file.trim());
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