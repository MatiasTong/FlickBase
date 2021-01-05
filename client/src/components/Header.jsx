import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

export default function Header({children}) {
    const useStyles = makeStyles((theme) => ({
        header: {
            backgroundColor: "rgba(229,229,247, 0.4))",
            backgroundImage: "radial-gradient(circle at center center, rgba(159,206,255, 0.4), rgba(229,229,247, 0.4)), repeating-radial-gradient(circle at center center, rgba(159,206,255, 0.4), rgba(159,206,255, 0.4), 20px, transparent 40px, transparent 20px)",
            backgroundBlendMode: "multiply"

          
    //   background: 'linear-gradient(rgba(228, 246, 255,.5), rgba(228, 246, 255,.5)), url("https://images.unsplash.com/photo-1546640646-89b557854b23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80")'

        //   background: "linear-gradient(#DFE5FF, white)",
        

        }
      }));

      const classes = useStyles();

    return (
        <Box className={classes.header}>
            {children}
        </Box>
    )
}
