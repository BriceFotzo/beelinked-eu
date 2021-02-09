import React from 'react';

export default function CenteredGrid() {
  const classes = useStyles();
  let url ="https://public.opendatasoft.com/api/records/1.0/search/?dataset=arome-0025-sp1_sp2&q=%23distance(position%2C+%2253%2C+-8%22%2C+100)"
  var temp=0;
  var hum=0;
  var vent=0;
  var prec=0;
  fetch(url).then(
    (response) => response.json()).then(res => {
      console.log(res.records[0].fields)
      temp=parseInt(res.records[0].fields.maximum_temperature_at_2_metres);
      hum=parseInt(res.records[0].fields.relative_humidity);
      vent=parseInt(res.records[0].fields.wind_speed);
      prec=parseInt(res.records[0].fields.total_water_precipitation*100);})
  return (

    <Box  m={12}>
    <Grid container spacing={3}>
        <Grid item xs={2} className={classes.grid}>
          <Paper className={classes.paper}>Nuage ou non</Paper>
        </Grid>
        <Grid item xs={4} className={classes.grid}>
          <Paper className={classes.paper}>{temp}</Paper>
        </Grid>
        <Grid item xs={6} className={classes.grid}>
          <Paper className={classes.paper}>
          <p> Précipitations: 2%</p>
          <p> Humidité: 79%</p>
          <p> Vent: 13 km/h</p>
          </Paper>
        </Grid>
       
      </Grid>
  </Box>
  
  );
}
