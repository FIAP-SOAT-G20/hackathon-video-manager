'use client';

import React, { useState, useEffect } from 'react';
import { 
  Row, Col, Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, 
  Button, Badge, Spinner, Modal, ModalHeader, ModalBody, ModalFooter, 
  Progress, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';

import Loading from '../../components/Loading';

export default function Videos() {
  const { user, isLoading } = useUser();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    hash: ''
  });
  
  // Upload modal state
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    file: null
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  
  // Video management state
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [actionDropdown, setActionDropdown] = useState({});

  const fetchVideos = async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`/api/videos?${queryParams.toString()}`, { cache: 'no-store' });
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      setVideos(data.videos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchVideos();
    }
  }, [user]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchVideos(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      hash: ''
    });
    fetchVideos();
  };

  // Upload functionality
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.name || !uploadForm.file) {
      setUploadError('Name and file are required');
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);
      setUploadProgress(0);

      // Step 1: Create video record
      const createResponse = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: uploadForm.name,
          description: uploadForm.description,
          user_id: user.sub // Using Auth0 user ID
        })
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create video record');
      }

      const videoData = await createResponse.json();
      const { presigned_url, presigned_url_headers } = videoData;


      // Step 2: Upload file to S3 using presigned URL
      setUploadProgress(50); // Show progress after creating video record
      
      const uploadResponse = await fetch(presigned_url, {
        method: 'PUT',
        body: uploadForm.file,
        headers: presigned_url_headers
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('Upload failed:', errorText);
        throw new Error(`Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }

      setUploadProgress(100);
      
      // Close modal and refresh videos
      setUploadModal(false);
      setUploadForm({ name: '', description: '', file: null });
      fetchVideos();
      
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadForm(prev => ({ ...prev, file }));
  };

  // Video management functions
  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      const response = await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete video');
      }

      fetchVideos(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownloadProcessed = async (videoId) => {
    try {
      const response = await fetch(`/api/videos/${videoId}/processed`);
      
      if (!response.ok) {
        throw new Error('Failed to get download URL');
      }

      const data = await response.json();
      window.open(data.presigned_url, '_blank');
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleActionDropdown = (videoId) => {
    setActionDropdown(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'CREATED':
        return 'primary';
      case 'PROCESSING':
        return 'warning';
      case 'FINISHED':
        return 'success';
      case 'FAILED':
        return 'danger';
      case 'UNDEFINED':
        return 'secondary';
      default:
        return 'info';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="text-center">
        <h2>Access Denied</h2>
        <p>Please log in to view videos.</p>
      </div>
    );
  }

  return (
    <div data-testid="videos-page">
      <Row>
        <Col>
          <h1 className="mb-4">Video Management</h1>
        </Col>
        <Col className="text-right">
          <Button 
            color="primary" 
            onClick={() => setUploadModal(true)}
            className="mb-4"
          >
            <i className="fas fa-upload mr-2"></i>
            Upload Video
          </Button>
        </Col>
      </Row>

      {/* Filters Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Filters</CardTitle>
              <Form onSubmit={handleFilterSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={filters.name}
                        onChange={handleFilterChange}
                        placeholder="Search by name..."
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="hash">Hash</Label>
                      <Input
                        type="text"
                        name="hash"
                        id="hash"
                        value={filters.hash}
                        onChange={handleFilterChange}
                        placeholder="Search by hash..."
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-end">
                    <div>
                      <Button type="submit" color="primary" className="mr-2" size="sm">
                        Filter
                      </Button>
                      <Button type="button" color="secondary" size="sm" onClick={handleClearFilters}>
                        Clear
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Error Message */}
      {error && (
        <Row className="mb-4">
          <Col>
            <div className="alert alert-danger" role="alert">
              Error: {error}
            </div>
          </Col>
        </Row>
      )}

      {/* Loading Spinner */}
      {loading && (
        <Row className="mb-4">
          <Col className="text-center">
            <Loading />
            <p className="mt-2">Loading videos...</p>
          </Col>
        </Row>
      )}

      {/* Videos Grid */}
      {!loading && !error && (
        <Row>
          <Col>
            <div className="mb-3">
              <h5>Videos ({videos.length})</h5>
            </div>
            {videos.length === 0 ? (
              <Card>
                <CardBody className="text-center">
                  <CardText>No videos found matching your criteria.</CardText>
                </CardBody>
              </Card>
            ) : (
              <Row>
                {videos.map((video) => (
                  <Col md={6} lg={4} key={video.id} className="mb-4">
                    <Card className="h-100">
                      <CardBody>
                        <CardTitle tag="h6" className="d-flex justify-content-between align-items-start">
                          <span className="flex-grow-1">{video.name}</span>
                          <div className="d-flex align-items-center">
                            <Badge color={getStatusBadgeColor(video.status)} className="mr-2">
                              {video.status}
                            </Badge>
                            <Dropdown 
                              isOpen={actionDropdown[video.id] || false} 
                              toggle={() => toggleActionDropdown(video.id)}
                            >
                              <DropdownToggle caret size="sm" color="light">
                                <i className="fas fa-ellipsis-v"></i>
                              </DropdownToggle>
                              <DropdownMenu right>
                                {video.status === 'FINISHED' && (
                                  <DropdownItem onClick={() => handleDownloadProcessed(video.id)}>
                                    <i className="fas fa-download mr-2"></i>
                                    Download Processed
                                  </DropdownItem>
                                )}
                                <DropdownItem divider />
                                <DropdownItem 
                                  onClick={() => handleDeleteVideo(video.id)}
                                  className="text-danger"
                                >
                                  <i className="fas fa-trash mr-2"></i>
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </CardTitle>
                        <CardText className="text-muted small mb-2">
                          {video.description || 'No description'}
                        </CardText>
                        <div className="small text-muted">
                          <div><strong>Hash:</strong> {video.hash || 'N/A'}</div>
                          <div><strong>Created:</strong> {formatDate(video.created_at)}</div>
                          <div><strong>Updated:</strong> {formatDate(video.updated_at)}</div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      )}

      {/* Upload Modal */}
      <Modal isOpen={uploadModal} toggle={() => setUploadModal(false)} size="lg">
        <ModalHeader toggle={() => setUploadModal(false)}>
          Upload New Video
        </ModalHeader>
        <Form onSubmit={handleUploadSubmit}>
          <ModalBody>
            {uploadError && (
              <Alert color="danger">
                {uploadError}
              </Alert>
            )}
            
            <FormGroup>
              <Label for="videoName">Video Name *</Label>
              <Input
                type="text"
                id="videoName"
                value={uploadForm.name}
                onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter video name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="videoDescription">Description</Label>
              <Input
                type="textarea"
                id="videoDescription"
                value={uploadForm.description}
                onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter video description (optional)"
                rows={3}
              />
            </FormGroup>

            <FormGroup>
              <Label for="videoFile">Video File *</Label>
              <Input
                type="file"
                id="videoFile"
                onChange={handleFileChange}
                accept="video/*"
                required
              />
              <small className="form-text text-muted">
                Supported formats: MP4, AVI, MOV, etc.
              </small>
            </FormGroup>

            {uploading && (
              <div className="mt-3">
                <Label>Upload Progress</Label>
                <Progress value={uploadProgress} className="mb-2" />
                <small className="text-muted">
                  {uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
                </small>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button 
              type="button" 
              color="secondary" 
              onClick={() => setUploadModal(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              color="primary" 
              disabled={uploading || !uploadForm.name || !uploadForm.file}
            >
              {uploading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-upload mr-2"></i>
                  Upload Video
                </>
              )}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
