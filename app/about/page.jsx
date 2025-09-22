'use client';

import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Table } from 'reactstrap';

const About = () => {
  return (
    <Container>
        <Row>
          <Col>
            <h1 className="text-center mb-5">About Hackathon Video Manager</h1>
            
            {/* Hackathon - FIAP X Section */}
            <Card className="mb-4">
              <CardBody>
                <CardTitle tag="h2" className="text-primary mb-3">
                  🎯 Hackathon — FIAP X
                </CardTitle>
                <CardText>
                  <strong>Group</strong>: 21<br/>
                  <strong>Objective</strong>: Refactor a <strong>Video Processor MVP</strong>, initially designed to convert videos into images, by applying <strong>Software Architecture best practices</strong> and <strong>Cloud-Native design</strong>.
                </CardText>
                <CardText>
                  <strong>Repositories:</strong>
                </CardText>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Repository</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a href="https://github.com/FIAP-SOAT-G20/hackathon-video-service" target="_blank" rel="noopener noreferrer">Video Service</a></td>
                      <td>Manage video uploads and downloads</td>
                    </tr>
                    <tr>
                      <td><a href="https://github.com/FIAP-SOAT-G20/hackathon-video-processor-job" target="_blank" rel="noopener noreferrer">Video Processor Job</a></td>
                      <td>Extract images from videos and package them into ZIP files</td>
                    </tr>
                    <tr>
                      <td><a href="https://github.com/FIAP-SOAT-G20/hackathon-job-starter-lambda" target="_blank" rel="noopener noreferrer">Job Starter Lambda</a></td>
                      <td>Trigger new Kubernetes jobs and trigger a monitor video processing jobs and handle failures</td>
                    </tr>
                    <tr>
                      <td><a href="https://github.com/FIAP-SOAT-G20/hackathon-notification-lambda" target="_blank" rel="noopener noreferrer">Notification Lambda</a></td>
                      <td>Notify users about processing results via email</td>
                    </tr>
                    <tr>
                      <td><a href="https://github.com/FIAP-SOAT-G20/hackathon-user-lambda" target="_blank" rel="noopener noreferrer">User Lambda</a></td>
                      <td>Handle authentication and user management</td>
                    </tr>
                    <tr>
                      <td><a href="https://github.com/FIAP-SOAT-G20/hackaton-infrastructure-tf" target="_blank" rel="noopener noreferrer">Infrastructure (Terraform)</a></td>
                      <td>Provision AWS infrastructure</td>
                    </tr>
                    <tr>
                      <td><a href="https://github.com/FIAP-SOAT-G20/hackaton-infrastructure-deploy" target="_blank" rel="noopener noreferrer">Infrastructure (Kubernetes)</a></td>
                      <td>Deploy services on Kubernetes</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Tech Stack Section */}
            <Card className="mb-4">
              <CardBody>
                <CardTitle tag="h2" className="text-primary mb-3">
                  💻 Tech Stack
                </CardTitle>
                
                <Row>
                  <Col md={6}>
                    <h5 className="text-secondary">Languages & Frameworks</h5>
                    <div className="mb-3">
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#00ADD8', color: 'white'}}>Go</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#008ECF', color: 'white'}}>Gin</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#3776AB', color: 'white'}}>Python</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#3BABC3', color: 'white'}}>Flask</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#000000', color: 'white'}}>Next.js 15.5.3</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#61DAFB', color: 'black'}}>React 19.1.1</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#7952B3', color: 'white'}}>Reactstrap</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#68A063', color: 'white'}}>Node.js</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#000000', color: 'white'}}>Express.js 5.1.0</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <h5 className="text-secondary">Databases & Storage</h5>
                    <div className="mb-3">
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#4169E1', color: 'white'}}>PostgreSQL</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#FF4438', color: 'white'}}>Redis</span>
                    </div>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <h5 className="text-secondary">DevOps & Cloud</h5>
                    <div className="mb-3">
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#2496ED', color: 'white'}}>Docker</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#326CE5', color: 'white'}}>Kubernetes</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#7B42BC', color: 'white'}}>Terraform</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#222222', color: 'white'}}>GitHub Actions</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#FF9900', color: 'white'}}>AWS</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <h5 className="text-secondary">Authentication & Security</h5>
                    <div className="mb-3">
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#EB5424', color: 'white'}}>Auth0</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#000000', color: 'white'}}>JWT</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#000000', color: 'white'}}>Helmet</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#2C3E50', color: 'white'}}>CORS</span>
                    </div>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <h5 className="text-secondary">Testing & Quality</h5>
                    <div className="mb-3">
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#646CFF', color: 'white'}}>Vitest</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#17202C', color: 'white'}}>Cypress</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#C21325', color: 'white'}}>Jest</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#F7DF1E', color: 'black'}}>ESLint</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#23D96C', color: 'white'}}>Cucumber-BDD</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <h5 className="text-secondary">Tools & Utilities</h5>
                    <div className="mb-3">
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#6D00CC', color: 'white'}}>Make</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#85EA2D', color: 'white'}}>Swagger</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#FF6C37', color: 'white'}}>Postman</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#339AF0', color: 'white'}}>FontAwesome</span>
                      <span className="badge badge-info mr-2 mb-2" style={{backgroundColor: '#5A5A5A', color: 'white'}}>Morgan</span>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {/* Contributors Section */}
            <Card className="mb-4">
              <CardBody>
                <CardTitle tag="h2" className="text-primary mb-3">
                  🤝 Contributors
                </CardTitle>
                <CardText>
                  Special thanks to the contributors who collaborated on these projects:
                </CardText>
                <Row className="justify-content-center">
                  <Col md={10}>
                    <Table responsive className="text-center">
                      <tbody>
                        <tr>
                          <td className="align-middle">
                            <a href="https://github.com/atomaz" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              <img 
                                src="https://github.com/atomaz.png" 
                                alt="Alice Tomaz" 
                                className="rounded-circle mb-2" 
                                width="100" 
                                height="100"
                              />
                              <br />
                              <strong>Alice Tomaz</strong>
                            </a>
                          </td>
                          <td className="align-middle">
                            <a href="https://github.com/filipe1309" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              <img 
                                src="https://github.com/filipe1309.png" 
                                alt="Filipe Bonfim" 
                                className="rounded-circle mb-2" 
                                width="100" 
                                height="100"
                              />
                              <br />
                              <strong>Filipe Bonfim</strong>
                            </a>
                          </td>
                          <td className="align-middle">
                            <a href="https://github.com/hugokishi" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              <img 
                                src="https://github.com/hugokishi.png" 
                                alt="Hugo Kishi" 
                                className="rounded-circle mb-2" 
                                width="100" 
                                height="100"
                              />
                              <br />
                              <strong>Hugo Kishi</strong>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="align-middle">
                            <a href="https://github.com/marcos-nsantos" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              <img 
                                src="https://github.com/marcos-nsantos.png" 
                                alt="Marcos Santos" 
                                className="rounded-circle mb-2" 
                                width="100" 
                                height="100"
                              />
                              <br />
                              <strong>Marcos Santos</strong>
                            </a>
                          </td>
                          <td className="align-middle">
                            <a href="https://github.com/th3r4ven" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              <img 
                                src="https://github.com/th3r4ven.png" 
                                alt="Matheus" 
                                className="rounded-circle mb-2" 
                                width="100" 
                                height="100"
                              />
                              <br />
                              <strong>Matheus</strong>
                            </a>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <div className="mt-4 p-3 bg-light rounded text-center">
                  <p className="mb-0">
                    ✨ <em>These projects showcase our journey through modern software architecture, DevOps, and cloud-native development practices.</em>
                  </p>
                </div>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </Container>
  );
};

export default About;
