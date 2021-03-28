import { isProperty } from './utils';

export const createElement = (type, props = {}, ...children) => {
  return {
    type,
    props: {
      ...props,
      // 这里是简单的一个兼容处理，对于 数字 / 字符串的处理
      children: children.map(child => {
        if (typeof child !== 'object') {
          return {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: child,
              children: []
            }
          }
        }
      })
    }
  }
}

export const createNode = (element) => {
  let dom = null;

  if (element.type === 'TEXT_ELEMENT') {
    dom = document.createTextNode('');
  } else {
    dom = document.createElement(element.type);
  }

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((propName) => {
      dom[propName] = element.props[propName];
    });

  return dom;
}
