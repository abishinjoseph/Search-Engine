pipeline {
    agent any

    environment {
        DEPLOY_DIR = '/var/www/html' // or your EC2 instance path
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/abishinjoseph/Search-Engine.git'
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Ensure the target directory exists
                    sh """
                        if [ ! -d "$DEPLOY_DIR" ]; then
                            echo "$DEPLOY_DIR does not exist, creating directory."
                            sudo mkdir -p $DEPLOY_DIR
                        fi
                    """
                    echo "Deploying files to $DEPLOY_DIR"
                    sh """
                        sudo cp -r * $DEPLOY_DIR
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
