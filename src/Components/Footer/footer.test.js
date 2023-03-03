import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Footer from './Footer';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Footer component', () => {
  it('renders the correct copyright text', () => {
    act(() => {
      render(<Footer />, container);
    });
    expect(container.textContent).toBe('Bayer Carbon Cloud');
  });
});
