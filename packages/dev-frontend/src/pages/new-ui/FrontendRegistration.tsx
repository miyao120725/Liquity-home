import React,{useState,useEffect} from 'react'
import {
  Box,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Button,
  FormHelperText,
} from '@material-ui/core'
import clsx from 'clsx'
import { Flex, Spinner } from "theme-ui";

import { Decimal, Decimalish,Percent, LQTYStake, LiquityStoreState } from "@liquity/lib-base";
import { LiquityStoreUpdate, useLiquityReducer, useLiquitySelector } from "@liquity/lib-react";
import { useLiquity } from '../../hooks/LiquityContext'
import { shortenAddress } from '../../utils/shortenAddress'
import RedditTextField from '../../components/new-ui/RedditTextField'
import OverShadomBox from '../../components/new-ui/OverShadomBox'
import SetDomain from './SetDomain'

import { Transaction, useMyTransactionState } from "../../components/Transaction";
import { TopBar } from '../../components/new-ui/TopBar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background:
        'linear-gradient(198deg, rgba(155, 88, 243, 0.17) 0%, rgba(53, 78, 247, 0.06) 45%, rgba(255, 255, 255, 0) 100%)',
      // backgroundColor: theme.palette.background.dark,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      // [theme.breakpoints.up('lg')]: {
      //   paddingLeft: 238,
      // },
      [theme.breakpoints.down('xs')]: {
        paddingTop: 48,
      },
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      // background: 'linear-gradient(198deg, rgba(155, 88, 243, 0.17) 0%, rgba(53, 78, 247, 0.06) 45%, rgba(255, 255, 255, 0) 100%)',
      boxShadow: 'rgb(0 0 0 / 14%) 0px 0px 30px 5px inset',
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
      paddingBottom:'20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'normal',
      margin: '0',
    },
    back: {
      background: '#fff',
      overflow: 'hidden',
      // padding: '30px 20px',
      // height: '100px',
    },
    box: {
      marginTop: '24px',
      [theme.breakpoints.down('xs')]: {
        marginTop: '10px',
      },
    },
    boxForm: {
      padding: '0 20px 40px',
    },
    title: {
      textAlign: 'center',
      padding: '16px 16px 10px',
      fontSize: '18px',
      fontWeight: 500,
      color: '#745DDF',
      lineHeight: '25px',
    },
    margin: {
      margin: theme.spacing(1),
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
    grid: {
      [theme.breakpoints.up('xs')]: {
        maxWidth:'444px'
      },
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
  })
)

type FrontendRegistrationActionProps = {
  kickbackRate: Decimal;
  onchangeStatus: () => void
};

const FrontendRegistrationAction: React.FC<FrontendRegistrationActionProps> = ({ onchangeStatus, kickbackRate }) => {
  const {
    liquity: { send: liquity },
    account
  } = useLiquity();
  const classes = useStyles()
  // console.log(111,useLiquity(),liquity)

  const myTransactionId = "register-frontend";
  const myTransactionState = useMyTransactionState(myTransactionId);

  useEffect(() => {
    if (myTransactionState.type === "confirmed") {
      onchangeStatus()
    }
   }, [myTransactionState.type])
  
  return myTransactionState.type === "waitingForApproval" ? (
    <Flex>
      <Button
        variant="contained"
        disabled className={classes.subBtn}>
        <Spinner sx={{ mr: 2, color: "white" }} size="20px" />
        Waiting for your approval
      </Button>
    </Flex>
  ) : myTransactionState.type !== "waitingForConfirmation" &&
    myTransactionState.type !== "confirmed" ? (
    <Flex>
          <Transaction id={myTransactionId} send={liquity.registerFrontend.bind(liquity, kickbackRate, { from: account })}>
            <Button
              variant="contained"
              className={clsx(classes.subBtn,classes.btnColor)}
              style={{ width: '100%' }}>Register</Button>
      </Transaction>
    </Flex>
  ) : null;
};

type state={
  ratio: string;
  idx:Number
}

const selectFrontend = ({ ownFrontend }: LiquityStoreState) =>  ownFrontend ;

const FrontendRegistration: React.FC = ({
}) => {
  const classes = useStyles()
  const { account } = useLiquity()

  const [value, setValue] = useState<state>({
    ratio: '100',
    idx:0
  })

  const [kickbackRate, setKickbackRate] = useState(Decimal.from(0.8));
  const [cut, setCut] = useState(Decimal.from(0.2));
  const frontend = useLiquitySelector(selectFrontend);
  
  useEffect(() => {
    if (frontend.status==='registered') {
      setValue({
        ratio:(Number(frontend.kickbackRate.toString(2))*100).toString(),
        idx: 1
      })
    }
  },[frontend])
  
  const handleChange = (prop: any) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setValue({ ...value, [prop]: e.target.value })

    try {
      const newKickbackRate = Decimal.from(e.target.value || 0).div(100);
      const newCut = Decimal.ONE.sub(newKickbackRate);

      setKickbackRate(newKickbackRate);
      setCut(newCut);
    } catch {}
  }

  return (
    <>
      <div className={classes.root}>
        <TopBar />
      
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <Grid container spacing={3} className={classes.content}>
              <Grid item xs={12} sm={12} md={10}>

                   <Grid
                        container
                        spacing={3}
                        className={classes.box}
                        justify="center"
                      >
                      <Grid item xs={12} className={classes.grid} justify="center">
                    <OverShadomBox className={classes.back}>
              <Box className={classes.boxForm}>
                {
                  value.idx === 0 ? (
                    <>
                    <Typography variant="h3" className={classes.title}>
                    成为代理商
                  </Typography>
                  <RedditTextField
                    labeltext="我的地址"
                    disabled
                    defaultValue={shortenAddress(account)}
                    className={clsx(classes.margin, classes.textField)}
                          variant="filled"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ backgroundColor: '#fff', marginTop: '20px' }}
                  />
                  <RedditTextField
                    labeltext="分成比例"
                    disabled
                    coin="%"
                    onChange={handleChange}
                    // value={lusdAmount.toString()}
                    defaultValue={value.ratio}
                    className={clsx(classes.margin, classes.textField)}
                    // defaultValue="react-reddit"
                    variant="filled"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ backgroundColor: '#fff', marginTop: '20px' }}
                  />
              {/* <FormHelperText component="div" className={classes.helperText}>
                <Typography variant="body2" gutterBottom>
                  Borrowing fee
                </Typography>
              </FormHelperText> */}
        
                      <FrontendRegistrationAction onchangeStatus={() => {setValue({ ...value, idx: 1 })}} {...{ kickbackRate }}/>

                  <FormHelperText
                    component="div"
                    style={{ marginTop: '20px' }}
                    className={classes.helperText}
                  >
                    Before you proceed
                  </FormHelperText>
                  <FormHelperText
                    component="div"
                    style={{ marginTop: '10px' }}
                    className={classes.helperText}
                    >
                                You are about to register 
                      <strong>{shortenAddress(account)}</strong>
                      to receive 
                      <strong>{value.ratio}%</strong>
                    of the LQTY rewards earned through this frontend.
                    <br/>
                    You will not be able to change the kickback rate for this address later.
                    <br/>
                    If you'd like to use a different kickback rate in the future, you will need to repeat this registration with a different address.
                  </FormHelperText>
                      </>
                  ): (
                      <>
                        <SetDomain ratio={value.ratio}></SetDomain>
                      </>
                )}
              
              </Box>
            </OverShadomBox>
                  </Grid>
                </Grid>
                </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
};
export default FrontendRegistration;
