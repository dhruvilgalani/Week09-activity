pipeline {
  agent any
  environment { IMAGE = "myapp:${BUILD_NUMBER}" }
  stages {
    stage('Build')  { steps { sh 'npm install' } }
    stage('Test')   { steps { sh 'npm test' } }
    stage('Docker Build') { steps { sh "docker build -t ${IMAGE} ." } }
    stage('Deploy (Rolling)') {
      steps {
        sh """
          docker service update \
            --image ${IMAGE} \
            --update-parallelism 1 \
            --update-delay 10s \
            --update-failure-action rollback \
            myapp
        """
      }
    }
    stage('Verify') {
  steps {
    sh 'sleep 15'
    sh 'curl -f http://172.17.0.1:3000/health'
    sh 'docker service ps myapp'
         }
     }
    stage('Security Scan') {
    steps {
        sh 'npm audit --audit-level=high || true'
        sh 'trivy image week10-app:latest || true'
    }
}
  }
}
