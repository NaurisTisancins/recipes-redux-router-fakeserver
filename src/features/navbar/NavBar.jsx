import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
   typography: {
      textAlign: 'center',
   },
   navBar: {
      textDecoration: 'none',
      color: 'whitesmoke',
      textAlign: 'center',
   },
})

export default function NavBar() {
   const classes = useStyles();

   
   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static">
            <Toolbar>

               <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  className={classes.typography}
               >
                  <NavLink
                     to='/recipes/add'
                     className={classes.navBar}
                  >
                     Add Recipe
                  </NavLink>
               </Typography>

               <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  className={classes.typography}
               >
                  <NavLink
                     to='/'
                     className={classes.navBar}
                  >
                     Recipe List
                  </NavLink>
               </Typography>

               {/* <NavLink to='/recipes/add'> */}
               <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  className={classes.typography}
               >
                  Ingredients (coming soon)
               </Typography>
               {/* </NavLink> */}

            </Toolbar>
         </AppBar>
      </Box>
   );
}
