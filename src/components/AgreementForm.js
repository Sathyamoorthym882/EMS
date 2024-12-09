// src/components/AgreementForm.js
import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate instead of useHistory
import { AgreementContext } from '../context/AgreementContext';

const AgreementForm = ({ isEditMode }) => {
  const { id } = useParams();
  const { createAgreement, updateAgreement, agreements } = useContext(AgreementContext);
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    position: '',
    agreementDate: ''
  });

  useEffect(() => {
    if (isEditMode) {
      const agreement = agreements.find((agreement) => agreement.id === parseInt(id));
      if (agreement) {
        setFormData(agreement);
      } else {
        navigate('/'); // Navigate back to the dashboard if agreement not found
      }
    }
  }, [isEditMode, id, agreements, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateAgreement(id, formData);
    } else {
      createAgreement(formData);
    }
    navigate('/'); // Navigate back to the dashboard after submit
  };

  return (
    <Container>
      <Typography variant="h4">{isEditMode ? 'Edit Agreement' : 'Create Agreement'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee Name"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Agreement Date"
          name="agreementDate"
          type="date"
          value={formData.agreementDate}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? 'Update Agreement' : 'Create Agreement'}
        </Button>
      </form>
    </Container>
  );
};

export default AgreementForm;
