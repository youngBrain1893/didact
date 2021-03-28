import { render } from './render';
import { createElement } from './create-element';

const Didact = {
  createElement,
}

/** @jsx Didact.createElement */
render(
<div>
  <h1>Hello React</h1>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>, document.getElementById('root'));
