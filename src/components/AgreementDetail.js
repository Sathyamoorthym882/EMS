// src/components/AgreementDetail.js
import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { AgreementContext } from '../context/AgreementContext';


const AgreementDetail = () => {
  const { id } = useParams();
  const { agreements, deleteAgreement } = useContext(AgreementContext);
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [agreement, setAgreement] = useState(null);

  useEffect(() => {
    const agreement = agreements.find((agreement) => agreement.id === parseInt(id));
    if (agreement) {
      setAgreement(agreement);
    } else {
      navigate('/'); // Navigate back to the dashboard if not found
    }
  }, [agreements, id, navigate]);

  const handleDelete = () => {
    deleteAgreement(id);
    navigate('/'); // Navigate back to the dashboard after delete
  };

  if (!agreement) return <Typography variant="h6">Agreement not found</Typography>;

  return (
    <Container>
      <Typography variant="h4">{agreement.employeeName}</Typography>
      <Typography variant="body1">Department: {agreement.department}</Typography>
      <Typography variant="body1">Position: {agreement.position}</Typography>
      <Typography variant="body1">Agreement Date: {agreement.agreementDate}</Typography>
      <Button variant="contained" color="secondary" onClick={handleDelete}>Delete Agreement</Button>
    </Container>
  );
};

export default AgreementDetail;
