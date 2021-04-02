import React, { Component } from 'react'
import clsx from 'clsx'
import {
  Snackbar,
  withStyles,
  makeStyles,
  Theme,
  createStyles,
  Button,
  IconButton,
  Box
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth:'320px',
      backgroundColor: '#fff',
      overflow: 'hidden',
      color: 'rgba(31, 37, 51, 1)',
      boxShadow: '6px 8px 10px 0px rgba(149, 145, 163, 0.14)',
      borderRadius: '16px',
      border: '2px solid #E3E3F3'
    },
    icon: {
      color:'#fff',
      padding: '14px 10px 14px 24px',
      margin: '-6px 12px -6px -16px'
    },
    message: {
      fontSize: '14px',
      fontWeight: 400,
      color: 'rgba(31, 37, 51, 1)',
      lineHeight: '20px'
    },
    action: {
      '& button': {
        marginTop: '-30px'
      }
    },
    title: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1F2533',
      lineHeight: '25px'
    },
    info: {
      backgroundColor:'#2196f3'
    },
    success: {
      backgroundColor:'rgba(6, 211, 148, 1)'
    },
    error: {
      backgroundColor:'rgba(234, 90, 90, 1)'
    },
    loading: {
      backgroundColor:'#2196f3'
    },
    warning: {
      backgroundColor:'#ff9800'
    }
  })
)

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AlertPro(Prop: any) {
  const { notice } = Prop;
  const classes:any = useStyles()
  return (
    <Snackbar
        // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notice.open}
        autoHideDuration={notice.duration || 3000}
        onClose={notice.handleClose}
      >
        <Alert classes={{
        icon: clsx(classes.icon,classes[notice.type]),
        root: classes.root,
        action: classes.action,
        message:classes.message,
        }} onClose={notice.handleClose} severity={notice.type}>
        <AlertTitle className={classes.title}>{ notice.title}</AlertTitle>
        { notice.content}
        </Alert>
    </Snackbar>
  )
}

interface isState {
  notices: any,
  transitionTime: number
}

class ToastBox extends Component<any,isState> {
    constructor(Prop:any) {
        super(Prop)
      this.state = {
        notices: [],
        transitionTime: 300
      }
        this.removeNotice = this.removeNotice.bind(this)
    }

    getNoticeKey() {
        const { notices } = this.state
        return `notice-${new Date().getTime()}-${notices.length}`
    }

    addNotice(notice:any) {
        const { notices } = this.state
      notice.key = this.getNoticeKey()
      notice.open = true
      notice.handleClose = () => {
        this.removeNotice(notice.key)
      }

        // notices.push(notice);//展示所有的提示
        notices[0] = notice;//仅展示最后一个提示
        
      this.setState({ notices })
      
        setTimeout(() => {
            this.removeNotice(notice.key)
        }, notice.duration > 0?notice.duration:3000)
        return () => { this.removeNotice(notice.key) }
    }

    removeNotice(key:string) {
        const { notices, transitionTime } = this.state
        this.setState({
            notices: notices.filter((notice:any) => {
                if (notice.key === key) {
                    if (notice.onClose) setTimeout(notice.onClose, transitionTime)
                    return false
                }
                return true
            })
        })
    }

  render() {
    const { classes } = this.props;
        const { notices } = this.state
        return (
          <>
            {
              notices.map((notice: any) => (
                <>
                  <AlertPro notice={notice}></AlertPro>
                  </>
              ))
            }
          </>
        )
    }
}

// export default withStyles(styles)(ToastBox)
export default ToastBox