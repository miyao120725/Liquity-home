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
import icon_back from '../../assets/icon-back.png';
import logo from '../../assets/logo.png';
import icon_lang from '../../assets/icon-lang.png';
import icon_bg from '../../assets/icon-bg.png';
import icon_ac from '../../assets/icon-ac.png';
import { useTranslation, Trans, Translation } from 'react-i18next'
import CustomizedAccordions from '../../components/new-ui/CustomizedAccordions'
import Operating from '../../components/new-ui/Operating'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootBox: {
      position: 'relative',
      backgroundColor: '#f9f8fe',
      padding: '0 12px',
      background: `url(${icon_back}) no-repeat top`,
      backgroundSize: '100% auto',
    },
    box: {
      position: 'relative',
      // height: '100vh',
      // minHeight: '800px',
      // [theme.breakpoints.up('sm')]: {
      //   minHeight: '700px',
      // },
      width: '100%',
      
      zIndex: 1
    },
    header: {
      margin: '0 auto',
      paddingTop: '20px',
      [theme.breakpoints.up('sm')]: {
        paddingTop: '30px',
      },
    },
    lang: {
      height:'20px'
    },
    container: {
      // position: 'absolute',
      // top: '50%',
      // left: '50%',
      // transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      margin: '0',
      marginTop:'50px',
      padding:'10px'
      // [theme.breakpoints.up('sm')]: {
      //   padding:'10px'
      // }
    },
    h1: {   
      fontSize: '50px',
      lineHeight: '70px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '70px',
        lineHeight: '88px',
      },
      fontWeight: 'bold',
      color: '#745DDF',
      marginBottom:'10px'
    },
    h2: {
      marginTop:'100px',
      fontSize: '30px',
      fontWeight: 600,
      lineHeight: '50px',
      color: 'rgba(41, 49, 71, 1)',
      textAlign:'center'
    },
    h3: {
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '40px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '38px',
        lineHeight: '50px',
      },
      color: '#293147',
    },
    caption: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#545A6C',
      lineHeight: '30px',
      marginTop: '30px',
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
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#FFFFFF',
      lineHeight: '21px',
      padding:'14px 20px',
      '&:hover': {
        backgroundColor: '#1542CD',
        boxShadow: '1px 10px 10px 0px rgba(120, 137, 246, 0.28)',
      }
    },
    btn2: {
      background: '#FFFFFF',
      boxShadow: '1px 10px 10px 0px rgba(120, 137, 246, 0.28)',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#1542CD',
      lineHeight: '21px',
      padding: '14px 20px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '30px',
      },
      '&:hover': {
        backgroundColor: '#FFFFFF',
        boxShadow: '1px 10px 10px 0px rgba(120, 137, 246, 0.28)',
      }
    },
    img: {
      position: 'absolute',
      bottom: '0',
      right: '-12px',
      width: '60%',
      zIndex: -1,
      [theme.breakpoints.up('sm')]: {
        width: '30%'
      }
    },
    active: {  
      backgroundColor: 'rgba(227, 227, 243, .47)!important',
      color: '#545A6C'
    },
    footer: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      overflow: 'hidden'
    },
    ridText: {
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
      }
    },
    one: {
      bottom: '40px',
    },
    autoWidth: {
      maxWidth: '1200px',
      margin:'0 auto'
    },
    opBox: {
      marginTop:'100px'
    },
    faq: {
      marginTop: '30px',
      paddingBottom:'150px'
    }
  })
);

const StyledMenu = withStyles({
  paper: {
    border: 'none',
    background: '#FFFFFF',
    boxShadow: '0px 8px 10px 0px rgba(120, 137, 246, 0.28)',
    borderRadius: '4px'
  },
})((props: MenuProps) => {
  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  )
});

function IndexHome() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let { t, i18n } = useTranslation();
  const [language, setLanguage]= useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (str: string) => {
    i18n.changeLanguage(str);
    setLanguage(str);
    setAnchorEl(null);
  }

  const isLang = (str: string) => {
    if (str==='zh') {
      return '中文';
    } else {
      return 'EN';
    }
  }
  // console.log(123123,t('hello'))
  // console.log(123123,t('hello'),i18n.language,i18n)
  return (
    <>
      <Box className={classes.rootBox}>
      <Box className={classes.box}>
        <Grid
          container
          spacing={3}
          className={classes.header}
          justify="space-between"
          xs={11} md={10}
        >
              <img src={logo} style={{height:'26px',marginTop:'5px'}} alt=""/>
              <Button
            startIcon={<img src={icon_lang} className={classes.lang }/>}
                  onClick={handleClick}
                >
                  {i18n.language==='en'?'EN':'中文'}
                </Button>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem selected={isLang(i18n.language)==='EN'} className={isLang(i18n.language)==='EN'? classes.active:''}>
                    <ListItemText onClick={()=>handleSelect('en')} primary="EN" />
                  </MenuItem>
                  <MenuItem selected={isLang(i18n.language)==='中文'}  className={isLang(i18n.language)==='中文'? classes.active:''}>
                    <ListItemText onClick={()=>handleSelect('zh')} primary="中文" />
                  </MenuItem>
                </StyledMenu>
        </Grid>
        <Grid
          container
          spacing={3}
          xs={12}
          className={classes.container}
          justify="center"
        >
        <Box >
          <Typography variant="h1" className={classes.h1} component="h2" gutterBottom>
            LUSD
          </Typography>
          <Typography variant="h3" className={classes.h3} gutterBottom>
            {t('text_01')}
          </Typography>
          <Typography variant="h3" className={classes.h3} gutterBottom>
          {t('text_02')}
          </Typography>
          <Typography variant="body1" gutterBottom>
          {t('text_04')}
          </Typography>
          <Typography variant="body1" gutterBottom>
          {t('text_05')}
          </Typography>
          <Typography variant="caption" className={classes.caption} display="block" gutterBottom>
          {t('text_03')}
          </Typography>
          <Box className={classes.btn}>
            <Button variant="contained" className={classes.btn1} >
              Use Liquity
            </Button>
            <Button variant="contained"  href="https://docs.liquity.org/" target="_blank" className={classes.btn2}>
              Documentation
            </Button>
          </Box>
          </Box>
          </Grid>
          <img src={icon_bg} className={classes.img} alt="" />
      </Box>
      <Box className={clsx(classes.autoWidth,classes.opBox)}>
         <Operating></Operating>
        </Box>
        
      <Typography variant="h2" className={classes.h2} >
          FAQ
      </Typography>
        
      <Box className={clsx(classes.autoWidth,classes.faq)} style={{maxWidth:'1200px'}}>
        <CustomizedAccordions></CustomizedAccordions>
      </Box>

        <Box className={clsx(classes.footer,classes.one)}>
        <Grid
          container
            spacing={3}
          >
            <Grid item xs={12} sm={3} className={classes.ridText}>
              <Typography variant="body1">
              © 2021 Liquity.fi
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.footer}>
          <Grid
            container
            spacing={3}
            >
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button startIcon={<img src={icon_ac} alt="" style={{ width: '22px',height:'22px' }}/>}>MrBlock Community</Button>
            </Grid>
            </Grid>
        </Box>
      </Box>
    </>
  );
}

export default IndexHome;
