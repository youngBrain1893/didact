import { render } from './render';
import { createElement } from './create-element';

const Didact = {
  createElement,
}

/** @jsx Didact.createElement */
render(<h1>Hello React</h1>, document.getElementById('root'));
