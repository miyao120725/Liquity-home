import React from 'react'
import ReactDOM from 'react-dom'
import ToastBox from './toast'

type noticeType={
  type: string;
  content: string;
  duration: number;
  onClose: () => {};
}

function createNotification(){
  const div = document.createElement('div');
  document.body.appendChild(div);
  let notification:any
  setTimeout(() => {
    notification = ReactDOM.render(React.createElement(ToastBox), div);
  })
  return new Promise((resolve, reject) => {
    let t;
    setTimeout(() => {
      t={
        addNotice(notice: noticeType) {
          return notification.addNotice(notice)
        },
        destroy() {
          ReactDOM.unmountComponentAtNode(div)
          document.body.removeChild(div)
        }
      }
      resolve(t)
    })
  })
}

let notification:any
const notice = (type:string,title:string,  content:string, duration = 2000, onClose:Function) => {
    if (!notification) notification = createNotification()
  notification.then((res:any) => {
    return res.addNotice({ type, title, content, duration, onClose })
  })
}

export default {
    info(title:string,content:string, duration:number, onClose:Function) {
        return notice('info',title, content, duration, onClose)
    },
    success(title:string,content:string = '操作成功', duration:number, onClose:Function) {
        return notice('success',title,  content, duration, onClose)
    },
    error(title:string,content:string, duration:number, onClose:Function) {
        return notice('error',title,  content, duration, onClose)
    },
    loading(title:string,content = '加载中...', duration = 0, onClose:Function) {
        return notice('loading',title,  content, duration, onClose)
    },
    warning(title:string,content:string, duration = 0, onClose:Function) {
      return notice('warning',title,  content, duration, onClose)
    }
}
