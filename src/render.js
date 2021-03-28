import { createNode } from './create-element';

export const render = (element, container) => {
  const dom = createNode(element);

  element.props.children.forEach((child) => {
    render(child, dom);
  });

  container.appendChild(dom);
}
