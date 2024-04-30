import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SidebarItem } from '../../components/sidebar-item';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('SidebarItem', () => {
  it('renders icon and label correctly and handles click event', () => {
    const icon = 'icon-name';
    const label = 'Test Label';
    const href = 'http://localhost/';

    const { getByText } = render(
      <SidebarItem icon={icon} label={label} href={href} />
    );

    expect(getByText(label)).toBeInTheDocument()

    fireEvent.click(getByText(label));

    expect(window.location.href).toContain(href);
  });
});
