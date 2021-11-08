import { trim } from "tinymce";
import {
    message
} from 'ant-design-vue';
export  const  Trim=(str)=> {
    if(str!='' && str!=undefined && str!=null){
        // if(str.replace(/^\s\s*/,'').replace(/\s\s*$/, '')==''){
        //     console.log('wozoule')
        //   message.error('请输入内容');
        //   return;
        // }else{
            return str.replace(/^\s\s*/,'').replace(/\s\s*$/, '');
        // }
        
    }
  
}