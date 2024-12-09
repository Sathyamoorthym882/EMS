// src/components/Dashboard.js
import React, { useContext } from 'react';
import { AgreementContext } from '../context/AgreementContext';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';

const Dashboard = () => {
  const { agreements, deleteAgreement } = useContext(AgreementContext); // Use context

  // Handle case where agreements are undefined
  if (!agreements) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">Employee Agreements</Typography>
      <Grid container spacing={2}>
        {agreements.map((agreement) => (
          <Grid item xs={12} sm={6} md={4} key={agreement.id}>
            <Typography variant="h6">{agreement.employeeName}</Typography>
            <Typography variant="body1">Department: {agreement.department}</Typography>
            <Typography variant="body1">Position: {agreement.position}</Typography>
            <Typography variant="body1">Agreement Date: {agreement.agreementDate}</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/agreement/${agreement.id}`}
            >
              View Agreement
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteAgreement(agreement.id)}
            >
              Delete
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
