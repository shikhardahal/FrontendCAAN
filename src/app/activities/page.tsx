'use client'
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Layout from '../../components/layout';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

async function getData() {
  let today_date = new Date();
  let url = `http://localhost:1337/api/activities?populate[0]=Activity&filters[date][$gt]=${today_date}`;
  console.log(new Date());
  const res = await fetch('http://localhost:1337/api/activities?populate=*');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

function Home() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      console.log(result.data);
      setData(result.data);
    }

    fetchData();
  }, []);

  const filterActivities = () => {
    if (filter === "past") {
      return data.filter(item => new Date(item.attributes.date) < new Date());
    } else if (filter === "upcoming") {
      return data.filter(item => new Date(item.attributes.date) >= new Date());
    } else {
      return data; // Show all activities
    }
  };

  const handleFilterClick = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredActivities = filterActivities();

  return (
    <Layout>
      <br />
      <br />
      <Box
        sx={{
          pb: { xs: '4rem', md: '7.5rem' },
          pt: { xs: '3rem', md: '4.313rem' },
        }}
      >
        <Container maxWidth="lg">
          <div>
            {/* <Button
              variant={filter === 'all' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('all')}
            >
              All Activities
            </Button> */}
            <Button
              variant={filter === 'past' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('past')}
            >
              Past Activities
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('upcoming')}
            >
              Upcoming Activities
            </Button>
          </div>
          <Grid container spacing={2}>
            {filteredActivities.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="236"
                    image={`http://localhost:1337${item.attributes.img_url?.data?.attributes.url}`}
                    alt="image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" color="primary">
                      {item.attributes.date}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {item.attributes.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="text" endIcon={<ArrowForwardIcon />}>
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default Home;
