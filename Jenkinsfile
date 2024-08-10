// def serviceName = 'rico-creations'

// pipeline {
// 	environment {
// 		DOCKER_IMAGE = "mybuild-${serviceName}"
// 		DOCKER_IMAGE_TAG = "${TAG_NAME == null ? BRANCH_NAME.replaceAll('master', 'latest') : TAG_NAME}"
// 		SWARM_STACK_NAME = 'mybuild-dev-mybuild'
// 		SWARM_SERVICE_NAME = "${serviceName}"
// 		SWARM_FQ_SERVICE_NAME = "${SWARM_STACK_NAME}_${SWARM_SERVICE_NAME}"
// 	}
// 	agent {
// 		label 'RicoCreations'
// 	}

// 	options {
// 		skipStagesAfterUnstable()
// 		ansiColor('xterm')
// 	}

// 	stages {
// 		stage ('Build') {
// 			agent {
// 				docker {
// 					image 'node:16.13.0'
// 					reuseNode true
// 				}
// 			}
// 			stages {
// 				stage ('Build & Package') {
// 					steps {
// 						withCredentials([string(credentialsId: 'jenkins-ci-npm-mybuild-auth-string', variable: 'NPM_AUTH_STRING')]) {
// 							sh 'echo "Initialize"'
// 							sh 'echo "\n${NPM_AUTH_STRING}" >> .npmrc'
// 							sh 'npm ci'
// 							sh 'git checkout .npmrc'
// 							sh 'echo "Package"'
// 							sh 'npm run build --production'
// 						}
// 					}
// 				}
// 			}
// 		}
// 		stage ('Build (Docker)') {
// 			stages {
// 				stage ('Build image') {
// 					steps {
// 						withFolderProperties {
// 							sh 'docker build --force-rm -t "${PRIVATE_DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_IMAGE_TAG}" .'
// 						}
// 					}
// 				}
// 				stage ('Publish') {
// 					when { anyOf { branch 'master'; tag 'v*' } }
// 					steps {
// 						withFolderProperties {
// 							withDockerRegistry([credentialsId: 'docker-releases-registry-creds', url: "https://${PRIVATE_DOCKER_REGISTRY}"]) {
// 								sh 'docker push "${PRIVATE_DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_IMAGE_TAG}"'
// 							}
// 						}
// 					}
// 				}
// 				stage ('Deploy') {
// 					when { branch 'master' }
// 					steps {
// 						sshagent (credentials: ['blueprints_deployment_host']) {
// 							withFolderProperties {
// 								sh '''#!/bin/bash -xe
// 									DOCKER_FQ_IMAGE="${PRIVATE_DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_IMAGE_TAG}"
// 									DOCKER_IMAGE_DIGEST=$(docker image inspect ${DOCKER_FQ_IMAGE} --format '{{index .RepoDigests 0}}')
// 									ssh -o StrictHostKeyChecking=no \
// 										-l azureuser \
// 										${DEPLOYMENT_DEV_HOST} \
// 										docker -H :2375 service update ${SWARM_FQ_SERVICE_NAME} --image ${DOCKER_IMAGE_DIGEST}
// 								'''
// 							}
// 						}
// 					}
// 				}
// 			}
// 			post {
// 				always {
// 					withFolderProperties {
// 						sh 'docker rmi "${PRIVATE_DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_IMAGE_TAG}"'
// 					}
// 				}
// 			}
// 		}
// 	}
// 	post {
// 		always {
// 			cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, deleteDirs: true, cleanupMatrixParent: true, disableDeferredWipeout: true)
// 		}
// 		failure {
// 			sendEmail()
// 		}
// 		unstable {
// 			sendEmail()
// 		}
// 	}
// }
