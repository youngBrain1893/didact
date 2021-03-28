import { createNode } from './create-element';

let nextUnitOfWork = null;
let wipRoot = null;

export const render = (element, container) => {
  const fiber = {
    type: element.type,
    props: element.props,
    dom: container,
  }
  nextUnitOfWork = fiber;
  wipRoot = nextUnitOfWork;
}

function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) return;

  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom)

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

const workLoop = (deadline) => {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // fiber 结构构造完成后 commit
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  // fiber 结构
  let prevSibling = null;

  fiber.props.children.forEach((element, index) => {
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: createNode(element),
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
  });

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }

    nextFiber = nextFiber.parent;
  }
}
