import {Modal} from 'ant-design-vue';

export default function confirm(config = {}) {
  const {onOk, onCancel, ...restConfig} = config;
  return new Promise((resolve, reject) => {
    Modal.confirm({
      ...restConfig,
      onOk: (...props) => {
        resolve(...props);
        if (typeof onOk === 'function') {
          onOk(...props);
        }
      },
      onCancel: (...props) => {
        reject(...props);
        if (typeof onCancel === 'function') {
          onCancel(...props);
        }
      },
    });
  });
}
