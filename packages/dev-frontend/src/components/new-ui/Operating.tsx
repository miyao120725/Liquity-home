import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  MenuProps,
  ListItemText,
  withStyles,
  Theme,
  createStyles,
  makeStyles,
  Grid,
  Typography
} from '@material-ui/core';
import { Link as RouterLink,MemoryRouter as Router, LinkProps as RouterLinkProps,useHistory } from 'react-router-dom';
import icon_01 from '../../assets/icon-01.jpg';
import { useTranslation, Trans, Translation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    h3: {
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: '30px',
      // [theme.breakpoints.up('sm')]: {
      //   fontSize: '38px',
      //   lineHeight: '50px',
      // },
      color: '#293147',
    },
    caption: {
      fontSize: '16px',
      // fontWeight: 'bold',
      color: '#545A6C',
      lineHeight: '24px',
      marginTop: '20px',
      marginBottom:'20px'
    },
    btn: {
      '& > *': {
        margin: theme.spacing(1),
      }
    },
    btn1: {
      background: '#1542CD',
      boxShadow: '1px 10px 10px 0px rgba(120, 137, 246, 0.28)',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#FFFFFF',
      lineHeight: '21px',
      padding:'10px 20px',
      '&:hover': {
        backgroundColor: '#1542CD',
        boxShadow: '1px 10px 10px 0px rgba(120, 137, 246, 0.28)',
      }
    },
    btn2: {
      background: '#FFFFFF',
      boxShadow: '1px 10px 10px 0px rgba(120, 137, 246, 0.28)',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#1542CD',
      lineHeight: '21px',
      padding: '10px 20px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '30px',
      },
      '&:hover': {
        backgroundColor: '#FFFFFF',
        boxShadow: '1px 10px 10px 0px rgba(120, 137, 246, 0.28)',
      }
    },
   
  })
);

function Operating() {
  const classes = useStyles();
  return (
    <>
     <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item xs={12} sm={5}>
          <img src={icon_01} style={{width:'100%'}} alt=""/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" className={classes.h3} >
          运营Liquity前端，赚取LQTY
          </Typography>
          <Typography variant="body1"  className={classes.caption}>
          Liqity.fi是一个开放的智能合约接入平台。我们为Liquity协议开发并优化了一套全功能的前端页面，它可以帮助用户流畅的使用该协议。其次，为了帮助更多非开发者可以获得LQTY奖励，我们开发了一键部署的功能。所有人都可以立刻获得一个自己的前端页面。这一切都免费。
          </Typography>
          <Box className={classes.btn}>
            <Button
              component={RouterLink}
              to='/registration'
              variant="contained"
              className={classes.btn1} >
            加入运营
            </Button>
            <Button variant="contained"  href="https://docs.liquity.org/" target="_blank" className={classes.btn2}>
            联系我们
            </Button>
          </Box>
        </Grid>
      </Grid>
      
    </>
  );
}

export default Operating;
