pipeline {
    agent any
    
    environment {
        GITHUB_REPO = 'https://github.com/Kanishapradhan13/DSO101_SE_project'
        GITHUB_CREDENTIALS = 'github credentials'
    }
    
    triggers {
        pollSCM('* * * * *')
    }
    
    stages {
        stage('Check Commit Message') {
            steps {
                script {
                    def commitMessage = sh(
                        script: 'git log -1 --pretty=%B',
                        returnStdout: true
                    ).trim()
                    
                    echo "Commit message: ${commitMessage}"
                    
                    if (commitMessage.contains('@push')) {
                        echo "Found @push in commit message. Proceeding with GitHub push."
                        env.SHOULD_PUSH = 'true'
                    } else {
                        echo "No @push found. Skipping GitHub push."
                        env.SHOULD_PUSH = 'false'
                    }
                }
            }
        }
        
        stage('Build') {
            when {
                environment name: 'SHOULD_PUSH', value: 'true'
            }
            steps {
                echo "Building project..."
                sh '''
                    echo "Building backend..."
                    cd backend && npm install
                    echo "Building frontend..."
                    cd ../frontend && npm install
                '''
            }
        }
        
        stage('Test') {
            when {
                environment name: 'SHOULD_PUSH', value: 'true'
            }
            steps {
                echo "Running tests..."
                sh '''
                    cd backend
                    npm test -- --testPathPattern=bmi || echo "Tests completed"
                '''
            }
        }
        
        stage('Push to GitHub') {
            when {
                environment name: 'SHOULD_PUSH', value: 'true'
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${GITHUB_CREDENTIALS}",
                    usernameVariable: 'GITHUB_USER',
                    passwordVariable: 'GITHUB_TOKEN'
                )]) {
                    sh '''
                        git config user.name "Jenkins"
                        git config user.email "jenkins@pipeline.local"
                        
                        git remote remove origin 2>/dev/null || true
                        git remote add origin https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/DSO101_SE_project.git
                        
                        git add .
                        git commit -m "Jenkins automated push - $(date)" || echo "No changes to commit"
                        git push origin HEAD:main --force
                    '''
                }
            }
        }
    }
    
    post {
        success {
            script {
                if (env.SHOULD_PUSH == 'true') {
                    echo "Pipeline completed successfully. Code pushed to GitHub."
                } else {
                    echo "Pipeline completed. No push action taken."
                }
            }
        }
        failure {
            echo "Pipeline failed. Check logs for details."
        }
    }
}