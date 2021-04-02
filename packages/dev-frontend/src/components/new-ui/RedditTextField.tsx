import React from 'react'
import {
  Link as RouterLink,
  MemoryRouter as Router,
  LinkProps as RouterLinkProps,
  useHistory,
} from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  TextField,
  TextFieldProps,
  InputAdornment,
  fade,
  OutlinedInputProps,
  Tooltip
} from '@material-ui/core'
import tip from '../../assets/tip.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightBox: {
      textAlign: 'right',
    },
    text: {
      fontSize: '12px',
      fontWeight: 400,
      color: '#D2D6DC',
      lineHeight: '17px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent:'start'
    },
    btn: {
      background: 'rgba(21, 66, 205, 0.06)',
      borderRadius: '4px',
      minWidth: '0',
      marginRight: '10px',
      padding: '2px 5px',
      fontSize: '12px',
      fontWeight: 600,
      color: '#1542CD',
      lineHeight: '16px',
    },
    caption1: {
      fontSize: '12px',
      fontWeight: 600,
      color: '#545A6C',
      lineHeight: '16px',
    },
    flexEnd: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    label: {
      fontSize: '12px',
      fontWeight: 400,
      color: '#545A6C',
      transform: 'scale(1.3)',
      lineHeight: '20px',
      margin: '2px 0 0 4px',
    },
    tip: {
      fontSize: '12px',
      fontWeight: 400,
      color: 'rgba(41, 49, 71, 1)',
      lineHeight: '17px',
      background: '#FFFFFF',
      boxShadow: '6px 8px 10px 0px rgba(149, 145, 163, 0.14)',
      borderRadius: '9px',
      border: '1px solid #E3E3F3'
    }
  })
)

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      display: 'inline-flex',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fff!important',
      position: 'relative',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
      '& > input': {
        padding: '34px 12px 10px',
      },
    },
    focused: {},
  })
)

type TextFieldType = TextFieldProps & {
  coin?: any
  coin_in?:string
  endadornmenttext?: string
  endadornmentvalue?: number | string
  isbtn?: string
  btntext?: string
  // btncallback?: (num: string) => void
  btncallback?: any
  labeltext: string
  tiptext?: string
  err?:number
}

function RedditTextField(props: TextFieldType) {
  const classes=useStylesReddit();
  // classes = props.err && props.err === 1 ? useStylesRedditErr() : useStylesReddit()
  
  const classes1 = useStyles()
  return (
    // <Box className={classes.box}>
    <TextField
      label={<Box className={classes1.label}>{props.labeltext}</Box>}
      InputProps={
        {
          classes,
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <Box className={classes1.rightBox} style={{marginTop:props.endadornmenttext?'-4px':'18px'}}>
                <Typography
                  className={classes1.text}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {props.tiptext &&
                    (<Tooltip classes={{
                      tooltip:classes1.tip
                    }}
                    title={props.tiptext}
                    interactive placement="top">
                      <img src={tip} style={{width:'14px', marginRight: '2px',marginTop:'-2px'}} alt=""/>
                      {/* <WarningIcon style={{ color: 'rgba(210, 214, 220, 1)', fontSize: '14px', marginRight: '2px' }}></WarningIcon> */}
                    </Tooltip>)
                  }
                  {props.endadornmenttext}
                  {props.endadornmentvalue}
                </Typography>
                <Box className={classes1.flexEnd}>
                  {props.isbtn && props.isbtn === '1' && props.btncallback && props.coin ? (
                    <Button
                      className={classes1.btn}
                      onClick={()=> props.btncallback(props.coin_in)}
                    >
                      {props.btntext}
                    </Button>
                  ) : (
                    ''
                  )}
                  {
                    props.coin && (
                      <Box
                        className={classes1.caption1}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        {props.coin}
                      </Box>
                    )
                  }
                 
                </Box>
              </Box>
            </InputAdornment>
          ),
        } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  )
}

export default RedditTextField
