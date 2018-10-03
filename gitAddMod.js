const { exec } = require('child_process');
const notifier = require('node-notifier');

exec('git diff --cached --name-status', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
  const files = stdout.split('\n');
  const filesToUpdate = [];
  files.forEach((file) => {
    filesToUpdate.push(file.trim());
  });
  let updateString = '';
  for (const file of filesToUpdate) {
    if (
      file &&
      (!file.split('\t')[0].includes('D') &&
        !file.split('\t')[0].includes('U') &&
        !file.split('\t')[0].includes('R'))
    ) {
      updateString += file.split('\t')[1].trim() + ' ';
    }
  }
  notifier.notify({
    message: 'Finished adding files!',
    title: 'Adding From Script',
    icon: './reference/notifIcon.png'
  });
  exec(`git add ${updateString}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error ${error}.`);
    }
    console.log(stdout);
  });
});
