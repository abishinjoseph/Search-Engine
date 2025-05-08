pipeline {
    agent any

    environment {
        EC2_USER = 'ec2-user' // Change if needed, e.g., 'ubuntu' for Ubuntu instances
        EC2_HOST = 'your-ec2-public-ip'
        EC2_KEY = credentials('EC2_PRIVATE_KEY') // Add your private key in Jenkins credentials
        DEPLOY_PATH = '/var/www/html' // Change based on your EC2 server setup
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/abishinjoseph/Search-Engine.git', branch: 'main'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                eval `ssh-agent -s`
                ssh-add $EC2_KEY
                ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST "rm -rf $DEPLOY_PATH/*"
                scp -o StrictHostKeyChecking=no *.html *.css *.js *.png *.webp $EC2_USER@$EC2_HOST:$DEPLOY_PATH
                '''
            }
        }
    }
}
