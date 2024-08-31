private boolean isDev() {
    return env.BRANCH_NAME == "develop"
}

private boolean isPie() {
    return env.JOB_BASE_NAME == "pie"
}

private boolean isProd() {
    return env.JOB_BASE_NAME == "release" || env.BRANCH_NAME == "main"
}

private String getS3Bucket() {
    if (env.BRANCH_NAME == 'pie' || isPie()){
        return "xxxx"
    }
    else if (isProd()){
        return "xxxx"
    }
    else{
        return "xxxx"
    }
}

def packageVersion = '$(grep version package.json | head -1 | awk \'{print $2}\' | sed \'s/^"\\(.*\\)",/\\1/\').$(date +%Y.%m.%d.%H.%M)'

private void deployToS3(String stageValue, String s3Bucket) {
    withCredentials([usernamePassword(
        credentialsId: "$AWS_SECRET",
        usernameVariable: 'AWS_ACCESS_KEY_ID',
        passwordVariable: 'AWS_SECRET_ACCESS_KEY')]){

        sh 'docker exec $CONTAINER_NAME aws configure set default.region us-east-1'
        sh 'docker exec $CONTAINER_NAME aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID'
        sh 'docker exec $CONTAINER_NAME aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY'

        echo "Startinng upload process to S3 for $stageValue ..."
        sh "docker exec $CONTAINER_NAME aws s3 sync ./build s3://$s3Bucket"
    }
}

pipeline {
    agent { label 'linux-agent-1' }
    environment {
        STAGEVALUE = "${isPie() ? "pie" : isProd() ? "prod" : "dev"}"
        AWS_SECRET = "${isPie() ? "ci-lambda-deploy-comm-pie" : isProd() ? "ci-lambda-deploy-comm-prod" : "ci-lambda-deploy-comm-dev"}"
        // AWS_SECRET = "ci-lambda-deploy-comm-dev"
        PACKAGE_VERSION = "${packageVersion}"
        CONTAINER_NAME = "airport-reservations-app-$GIT_COMMIT"
    }

    options {
        timeout(time: 1, unit: 'HOURS')
    }

    parameters {
        string(name: 'VERSION', defaultValue: "", description: 'Release version (e.g.: 0.0.0).')
    }

    stages {
        stage('Clean') {
            steps {
                deleteDir()
            }
        }

        stage('Pull') {
            steps {
                echo ">>>>>>>>>>>>>>>>>>>> Pulling... $env.BRANCH_NAME branch for deploying to $STAGEVALUE"
                checkout scm
            }
        }

        stage('Grabbing Auth NPMRC') {
            steps {
                echo ">>>>>>>>>>>>>>>>>>>> Grabbing Auth NPMRC"
                withCredentials([string(
                  credentialsId: "AIRPORT_NPMRC",
                  variable: 'AIRPORT_NPMRC_B64'
                  )]) {
                      sh "echo \$AIRPORT_NPMRC_B64 > npmrc_tmp"
                      sh "mv .npmrc .npmrc_original"
                      sh "cat npmrc_tmp | base64 -d > .npmrc"
                      sh "cat .npmrc"
                  }
            }
        }

        stage('Installing in Docker Container') {
            steps {
                echo ">>>>>>>>>>>>>>>>>>>> Installing in Docker Container"
                withCredentials([string(credentialsId: "AIRPORT_NPMRC", variable: 'AIRPORT_NPMRC_B64')]) {
                    sh "docker build --build-arg SONAR_BRANCH=develop --build-arg PACKAGE_VERSION=\"$PACKAGE_VERSION\" -t container-$CONTAINER_NAME ."
                    sh "docker run --name=$CONTAINER_NAME -dt container-$CONTAINER_NAME"
                    sh "docker exec $CONTAINER_NAME yarn install"
                }
            }
        }

        stage('Building') {
            steps {
                echo ">>>>>>>>>>>>>>>>>>>> Building"
                script {
                    sh "docker exec $CONTAINER_NAME yarn build:$STAGEVALUE"
                }
            }
        }

        stage('Testing') {
            steps {
                echo ">>>>>>>>>>>>>>>>>>>> Testing"
                sh "docker exec $CONTAINER_NAME yarn test:lint:ci"
                sh "docker exec $CONTAINER_NAME yarn test:unit:coverage"
            }
        }

        stage('E2E Tests') {
            steps {
                echo ">>>>>>>>>>>>>>>>>>>> E2E workflow test"
                script {
                    if (isPie() || isProd()) {
                        echo "Skipping e2e tests: will only run on DEV environments"
                    } else {
                        echo "Installing cypress test dependencies"
                        sh "docker exec --user root $CONTAINER_NAME apt-get update"
                        sh "docker exec --user root $CONTAINER_NAME apt-get install -y -q libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb"
                        echo "Running cypress e2e test"
                        sh "docker exec $CONTAINER_NAME yarn start:ci:e2e --browser electron"
                    }
                }
            }
        }

        stage("Git Checkout Pie and Merge") {
            when {
                anyOf {
                    environment name: 'JOB_BASE_NAME', value: "pie"
                    environment name: 'JOB_BASE_NAME', value: "release"
                }
            }

            steps {
                script {
                    echo ">>>>>>>>>>>>>>>>>>>> Git Checkout Pie and Merge"
                    sh "git checkout pie"
                    sh "git merge origin/develop"
                    sh "git push"
                }
            }
        }

        stage("Git Checkout Master and Merge") {
            when {
                environment name: 'JOB_BASE_NAME', value: "release"
            }

            steps {
                script {
                    if (params.VERSION) {
                        echo ">>>>>>>>>>>>>>>>>>>> Git Checkout Master and Merge"
                        sh "git checkout main"
                        sh "git merge origin/develop"
                        sh "git tag -a -m 'release $params.VERSION' $params.VERSION"
                        sh "git push"
                        sh "git push --tags"
                    } else {
                        echo ">>>>>>>>>>>>>>>>>>>> SKIPPING Checkout Master and Merge"
                        error("Build failed because of missing version")
                    }
                }
            }
        }

        stage('Run SonarQube') {
            steps {
                echo ">>>>>>>>>>>>>>>>>>>> Run SonarQube"
                withSonarQubeEnv('Sonar (k8s)') {
                    sh "docker exec $CONTAINER_NAME yarn sonar"
                }
            }
        }

        stage("Deploying") {
            steps {
                echo ">>>>>>>>>>>>>>>>>>>> Deploying to $STAGEVALUE"
                script {
                    if (isDev() || isPie() || isProd()) {
                        deployToS3("${STAGEVALUE}", getS3Bucket())
                    } else {
                        echo "Skip deployment as this is not a deployment job."
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker stop $CONTAINER_NAME'
            sh 'docker rm $CONTAINER_NAME -f'
            sh 'docker rmi container-$CONTAINER_NAME -f'
            archiveArtifacts artifacts: 'videos/', fingerprint: true, allowEmptyArchive: true
        }
    }
}
