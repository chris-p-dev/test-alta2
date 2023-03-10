// pm2 configuration

module.exports = {
  apps: [
    {
      name: 'Alta Nextjs',
      script: 'server.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      //args: 'one two',
      /**
        0/max to spread the app across all CPUs
        -1 to spread the app across all CPUs - 1
        number to spread the app across number CPUs

        if using k8s, should use 1, 1cpu per pod
       */
      instances: -1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      wait_ready: true,
      exec_mode: 'cluster',

      // This is PM2 logging. If commented out it will default to $HOME/.pm2/logs. CD into that directory on EC2 to see output.
      // error_file: '/dev/null',
      // out_file: '/dev/null',
      // log_file: '/dev/null',

      // environment variables
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
