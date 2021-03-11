node {

    stage('Checkout SCM') {
        checkout scm
    }

        withEnv(['PORT_NUMBER=5003',
                'EMAIL_ADDRESS=example@mail.com',
                'EMAIL_PASSWORD=123123',
                "DB_USER=test",
                'DB_PASSWORD=123123',
                "DB_HOST=db",
                'DB_PORT=5432',
                'DB_DATABASE=test_db',
                "DB_PERSISTENT_VOLUME=/opt/postgres-${env.BRANCH_NAME}",
                'POSTGRES_USER=test',
                'POSTGRES_PASSWORD=123123',
                'POSTGRES_DB=test_db'
                ]) {
            stage('Build Docker Image') {
                sh "echo GENERATE_SOURCEMAP=false > ./client/.env"
                sh "docker-compose build"
            }
            try {
                stage("Development - deployment - branch: ${env.BRANCH_NAME}"){
                    sh "chmod +x -R ${env.WORKSPACE}"
                    sh "./jenkins/deploy.sh"
                }
            } finally {
                archiveArtifacts artifacts: 'logs-*.txt'
            }
        }

}
