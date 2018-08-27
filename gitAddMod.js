const { exec } = require('child_process');
exec('git diff --cached --name-status', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  // console.log(stdout);
  const files = stdout.split('\n');
  const filesToUpdate = [];
  files.forEach(file => {
    filesToUpdate.push(file.trim());
  });
  let updateString = '';
  let index = 0;
  for (const file of filesToUpdate){
    if (index !== filesToUpdate.length - 1 && (!file.split('\t')[0].includes('D') || !file.split('\t')[0].includes('U'))) {
      updateString += file.split('\t')[1].trim() + ' ';
    }
     index++;
  }
  console.log(`git add ${updateString}`);
  exec(`git add ${updateString}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error ${error}.`);
    }
    console.log(stdout);
  });
});