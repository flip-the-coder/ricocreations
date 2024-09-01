// deploy.js
const { exec } = require('child_process');

console.log('Deploying...');
exec('rm -rf build && npm run build && aws s3 sync build/ s3://ricocreations', (error, stdout, stderr) => {
    if (error) {
        console.error(`Deployment Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Deployment Stderr: ${stderr}`);
        return;
    }
    console.log(`Deployment Stdout: ${stdout}`);
});
