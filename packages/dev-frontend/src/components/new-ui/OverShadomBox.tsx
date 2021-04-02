import React from "react";
import clsx from 'clsx';
import {
  Box,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core';
// import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
      transition: '0.3s',
      borderRadius:'16px',
      '&:hover': {
        transform: 'translateY(2px)',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      },
    }
  })
)

type ShadomBoxType = {
  className?: String;
}

const OverShadomBox: React.FC<ShadomBoxType> = ({ className,children }) => {
  const classes = useStyles();
  // const styles = useOverShadowStyles({
  //   // inactive: true, // add this line to disable hover effect
  // });
  return (
    <Box
      className={clsx(classes.box, className)}>
          {children}
        </Box>
  )
};
export default OverShadomBox;