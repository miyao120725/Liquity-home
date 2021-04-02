import React from 'react';
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import icon_02 from '../../assets/icon-02.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: '20px',
      height:'20px'
    }
  })
)

const Accordion = withStyles({
  root: {
    // border: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor:'transparent',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(210, 214, 220, 1)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    margin: '18px 0',
    '&$expanded': {
      margin: '18px 0',
    },
  },
  expandIcon: {
    '&$expanded': {
      transform: 'rotate(45deg)',
    },
  },
  expanded: {
    
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    fontSize: '14px',
    fontWeight: 400,
    color: '#545A6C',
    lineHeight: '22px'
  }
}))(MuiAccordionDetails);

export default function CustomizedAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={ <img src={icon_02} className={clsx(classes.img)} alt=""/>}
          aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Liquity 是什么？</Typography>
         
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography> */}
            1
          {/* </Typography> */}
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={ <img src={icon_02} className={clsx(classes.img)} alt=""/>}
          aria-controls="panel2d-content" id="panel2d-header">
          <Typography>谁可以成为Liquity协议前端运营商？</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography> */}
          Liquity协议开发者宣布永久不会开设官方前端页面，因此任何人都可以根据他们的合约代码搭建自己的前端页面并提供用户使用。
          {/* </Typography> */}
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={ <img src={icon_02} className={clsx(classes.img)} alt=""/>}
          aria-controls="panel3d-content" id="panel3d-header">
          <Typography>运营前端可以得到什么奖励？</Typography>
        </AccordionSummary>
        <AccordionDetails>
           3
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={ <img src={icon_02} className={clsx(classes.img)} alt=""/>}
          aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Liquity.fi提供的是什么业务？</Typography>
        </AccordionSummary>
        <AccordionDetails>
           3
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={ <img src={icon_02} className={clsx(classes.img)} alt=""/>}
          aria-controls="panel3d-content" id="panel3d-header">
          <Typography>我该如何获得LQTY奖励？</Typography>
        </AccordionSummary>
        <AccordionDetails>
           3
        </AccordionDetails>
      </Accordion>
    </div>
  );
}