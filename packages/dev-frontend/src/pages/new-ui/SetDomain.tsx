import React,{useState,useEffect} from 'react'
import {
  Box,
  makeStyles,
  createStyles,
  withStyles,
  Theme,
  Grid,
  Typography,
  Button,
  InputLabel,
  FormControl,
  fade,
  InputBase,
  FormHelperText,
  IconButton
} from '@material-ui/core'
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import clsx from 'clsx'
import CopyToClipboard from "react-copy-to-clipboard";
import Api from '../../utils/http'
import common from '../../utils/common'
import Toast from "../../utils/Toast/index";

import { Decimal, Decimalish,Percent, LQTYStake, LiquityStoreState } from "@liquity/lib-base";
import { LiquityStoreUpdate, useLiquityReducer, useLiquitySelector } from "@liquity/lib-react";
import { useLiquity } from '../../hooks/LiquityContext'
import { shortenAddress } from '../../utils/shortenAddress'
import RedditTextField from '../../components/new-ui/RedditTextField'
import OverShadomBox from '../../components/new-ui/OverShadomBox'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      padding: '16px 16px 10px',
      fontSize: '18px',
      fontWeight: 500,
      color: '#745DDF',
      lineHeight: '25px',
    },
    margin: {
      // margin: theme.spacing(1),
      width: '100%',
      marginBttom: '24px',
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '100%',
      margin: '0',
    },
    helperText: {
      marginTop: '8px',
      // display: 'flex',
      // justifyContent: 'space-between',
      // alignItems: 'center',
    },
    subBtn: {
      marginTop: '20px',
      width: '100%',
      padding: '13px 0',
    },
    btnColor: {
      color: '#fff',
      backgroundColor: 'rgba(21, 66, 205, 1)',
      '&:hover': {
        backgroundColor: 'rgba(21, 66, 205, 1)',
        color: '#fff',
      },
    },
    inputRoot: {
      borderRadius: '4px',
      padding: '10px',
      border: '1px solid',
      borderColor:'#D2D6DC',
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    h6: {
      marginLeft:'10px',
      fontSize: '20px',
      fontWeight: 600,
      color: '#293147',
      lineHeight: '24px'
    },
    p: {
      marginTop:'20px',
      marginBottom:'10px',
      fontSize: '12px',
      fontWeight: 400,
      color: 'rgba(84, 90, 108, 1)',
      lineHeight: '17px'
    }
  })
)

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }),
)(InputBase);

type state={
  domain: string;
  idx: number;
  url: string;
}

const SetDomain: React.FC<{ratio:string}> = ({
  ratio
}) => {
  const classes = useStyles()
  const { account } = useLiquity()

  const [value, setValue] = useState<state>({
    domain: '',
    idx: 0,
    url:''
  })

  const [copied, setCopied] = useState<string>();

  const handleChange = (prop: any) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue({ ...value, [prop]: event.target.value })
  }

  const handleJudgmentInit = () => {
    const params = {
      address: account
    }
    Api.judgment_add(params).then((res) => {
      if (res.data.code === 200) {
          setValue(
            {
              ...value,
              idx:1,
              url:res.data.url
            }
          )
      }
    }).catch((err) => {
      console.log(333,err)
      console.log(err)
    })
  }

  useEffect(() => {
    handleJudgmentInit()
  },[])

  const handleClick = () => {
    const params = {
      domain: value.domain,
      address: account
    }
    Api.create_site(common.getPostParams(params)).then((res) => {
      if (res.data.code === 200) {
        Toast.success('域名绑定成功','可跳转到绑定域名代理自己的网站吧', 2000, () => {
          handleJudgmentInit()
        })
      }
    }).catch((err) => {
      console.log(333,err)
      Toast.success('域名绑定失败', err, 2000000, () => {
        console.log(err)
      })
    })
  }

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {value.idx === 0 ? '成为代理商' : '我的代理域名'}
      </Typography>
      {
        value.idx === 0 ? (
          <>
            {/* <Box className={classes.boxForm}> */}
      
      <Typography variant="subtitle1" className={classes.p}>
      我的域名
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControl className={classes.margin}>
              <BootstrapInput value={value.domain} onChange={handleChange('domain')} id="bootstrap-input" />
          </FormControl>
        <Typography className={classes.h6} variant="h6">
        .liquity.fi
          </Typography>
      </Box>
      <FormHelperText component="div" className={classes.helperText}>
        <Typography variant="body2" gutterBottom>
          {/* Borrowing fee */}
        </Typography>
      </FormHelperText>

      <Button
        variant="contained"
        color="primary"
        className={classes.subBtn}
        style={{ width: '100%' }}
        onClick={handleClick}
        >
          确认
      {/* <RedemptionAction
        {...{ lusdAmount, setLUSDAmount, changePending, setChangePending, maxRedemptionRate }}
      /> */}
      </Button>
            </>
        ): (
            <>
              <Typography variant="subtitle1" className={classes.p}>
          我的域名
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className={classes.h6} variant="h6">
          {value.url}
            </Typography>
            <CopyToClipboard
              text={value.url}
              onCopy={() => setCopied(value.url)}
             >
              <IconButton color="primary" aria-label="add to shopping cart">
                <FilterNoneIcon style={{ color: '#000', fontSize: '14px' }} />
              </IconButton>
            </CopyToClipboard>
        </Box>
        <Typography variant="subtitle1" className={classes.p}>
        分成比例
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className={classes.h6} variant="h6">
            100%
            </Typography>
        </Box>
            </>
        )
      }
    </>
  )
};
export default SetDomain;
