const { exec } = require('child_process');
exec('git status --porcelain', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  //console.log(`stdout: ${stdout}`);
  const files = stdout.split('\n');
  console.log(files);
  const filesToUpdate = [];
  files.forEach(file => {
    if (file.trim().startsWith('M') || file.trim().startsWith('A')) {
      filesToUpdate.push(file.trim().substring(2));
    }
  });
  console.log(filesToUpdate);
  let updateString = '';
  filesToUpdate.forEach(file => {
    updateString += file + ' ';
  });
  console.log(updateString);

  exec(`echo git add ${updateString}`, (error, stdout, stderr) => {
    console.log(stdout);
  });
});