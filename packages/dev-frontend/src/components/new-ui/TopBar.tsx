import React, { useState} from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  createStyles,
  Button,
  Theme,
  Chip,
} from '@material-ui/core'

import { LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '@liquity/lib-react'

import { COIN, GT } from '../../strings'
import { useLiquity } from '../../hooks/LiquityContext'
import { shortenAddress } from '../../utils/shortenAddress'

import menu from '../../assets/menu.png'
import menu_01 from '../../assets/menu_01.png'
import logo from '../../assets/logo.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      background: '#fff',
      minHeight: '64px',
      paddingLeft: '10px',
      [theme.breakpoints.down('xs')]: {
        minHeight: '48px',
      },
    },
    margin: {
      '& > *': {
        margin: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
          margin: '0',
        },
      },
    },
    box: {
      boxShadow: 'none',
      zIndex:10000
    },
    btnBack: {
      background: 'linear-gradient(260deg, #92A2E5 0%, #9F85EB 100%)',
      borderRadius: '8px',
      fontSize: '12px',
      color: '#FFFFFF',
    },
    valueE: {
      background: 'rgba(239, 236, 255, 0.64)',
      borderRadius: '8px',
      paddingLeft: '10px',
      fontSize: '12px',
      color: 'rgba(0, 0, 0, 1)',
      fontWeight: 400,
    },
    valueL: {
      background: '#E7E2FF',
      borderRadius: '8px',
      padding: '6px 10px',
      marginLeft: '10px',
      fontSize: '12px',
      color: 'rgba(0, 0, 0, 1)',
      fontWeight: 600,
    },
    icon: {
      width: '16px',
      height: '16px',
      marginLeft: '4px',
      borderRadius: '50%',
      background:
        'linear-gradient(180deg, #E02020 0%, #FA6400 17%, #F7B500 33%, #6DD400 50%, #0091FF 67%, #6236FF 83%, #B620E0 100%)',
    },
    iconB: {
      marginRight: '10px',
      [theme.breakpoints.down('xs')]: {
        marginRight: '0',
        marginLeft:'-10px'
      },
    },
    menu: {
      width: '22px',
      height: '22px',
      [theme.breakpoints.down('xs')]: {
        width: '16px',
        height: '16px',
      },
    },
    logo: {
      height: '28px',
      [theme.breakpoints.down('xs')]: {
        height: '22px',
      },
    }
  })
)

const liquityText = (
  <path
    fill="#293147"
    d="M54.791 30.032h13.305V26.56h-9.36V7.108h-3.944v22.924zM75.035 12.936h-3.829v17.096h3.83V12.936zm-1.895-2.818c1.276 0 2.398-1.08 2.398-2.392 0-1.313-1.122-2.355-2.398-2.355-1.315 0-2.436 1.042-2.436 2.355 0 1.312 1.121 2.392 2.436 2.392zM94.669 13.823c-1.74-.733-4.139-1.273-6.498-1.273-6.072 0-9.862 3.473-9.862 8.953 0 5.673 3.79 8.915 9.32 8.915 1.354 0 2.592-.27 3.25-.54v7.101h3.79V13.823zm-3.79 12.736c-.967.347-1.78.54-3.017.54-3.442 0-5.685-2.2-5.685-5.596 0-3.55 2.281-5.557 5.994-5.557 1.044 0 1.934.193 2.707.424V26.56zM113.078 12.936h-3.79v14.086a20.441 20.441 0 01-2.94.232c-2.513 0-4.06-.927-4.06-3.474V12.936h-3.79V24.05c0 4.786 3.016 6.368 7.928 6.368 2.011 0 4.641-.27 6.652-.772v-16.71zM121.814 12.936h-3.829v17.096h3.829V12.936zm-1.895-2.818c1.276 0 2.398-1.08 2.398-2.392 0-1.313-1.122-2.355-2.398-2.355-1.315 0-2.437 1.042-2.437 2.355 0 1.312 1.122 2.392 2.437 2.392zM124.716 16.139h2.591v8.992c0 3.898 2.36 5.287 5.144 5.287 1.625 0 3.017-.347 4.138-.926v-3.435c-1.044.618-2.011.965-3.132.965-1.47 0-2.359-.695-2.359-2.74v-8.143h4.873v-3.203h-4.873V8.768h-3.791v4.168h-2.591v3.203zM141.381 12.936h-4.1l7.078 17.868-2.398 6.175h3.751l9.282-24.043h-3.944l-4.796 13.468-4.873-13.468z"
  />
)

const liquityLogo = (
  <>
    <circle cx="20.019" cy="18.989" r="17.989" fill="#2EB6EA" />
    <path
      fill="#1542CD"
      d="M19.922 36.979c-17.892 0-24.953-23.538-9.15-33.457C8.894 23.195 18.892 23.63 28.17 23.195c15.546-.73 15.556 13.784 15.556 13.784H19.922z"
    />
    <path
      fill="#745DDF"
      fillRule="evenodd"
      d="M37.024 24.875c-2.706 6.936-9.361 11.896-17.203 12.117.185.005.37.008.556.008h23.654s-.006-8.507-7.007-12.125z"
      clipRule="evenodd"
    />
  </>
)

const select = ({
  accountBalance,
  lusdBalance,
  lqtyBalance,
}: LiquityStoreState) => ({
  accountBalance,
  lusdBalance,
  lqtyBalance,
})

export const TopBar: React.FC = ({

}) => {
  const classes = useStyles()
  const { account } = useLiquity()
  const { accountBalance, lusdBalance, lqtyBalance } = useLiquitySelector(
    select
  )

  // const [status, setStatus] = useState<boolean>(false)
  // const onClickChange = () => {
  //   if (status) {
  //     onMobileclick()
  //     setStatus(false)
  //   } else {
  //     onMobileclick()
  //     setStatus(true)
  //   }
  // }
  return (
    <AppBar className={classes.box}>
      <Toolbar className={classes.background}>
        {/* <LiquityLogo /> */}
        <Box flexGrow={1} display="flex" justifyContent="flex-start" alignItems="center">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 156 38"
            height="32px"
          >
            {liquityText}
            {liquityLogo}
          </svg> */}
           <Button
              component={RouterLink}
              to='/'>
          <img src={logo} className={classes.logo} alt=""/>
          </Button>
        </Box>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Box
          className={classes.margin}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Hidden smDown>
            <Button className={classes.btnBack}>
              {lusdBalance.prettify()} LUSD
            </Button>
            <Button className={classes.btnBack}>
              {lqtyBalance.prettify()} LQTY
            </Button>
          </Hidden>
          <Hidden xsDown>
            <Box
              component="span"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              className={classes.valueE}
              m={1}
            >
              {accountBalance.prettify()} ETH
              <Box
                component="span"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                className={classes.valueL}
                p={1}
              >
                {shortenAddress(account)}
                <Box className={classes.icon}></Box>
              </Box>
              {/* <Box component="span" m={1}>0x05…05FA</Box> */}
            </Box>
          </Hidden>
          <Hidden smUp>
            <Box
                component="span"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                className={classes.valueL}
                p={1}
              >
                {shortenAddress(account)}
                <Box className={classes.icon}></Box>
            </Box>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
