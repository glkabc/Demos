import { render, screen } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import AuthenticatedApp from './authenticated-app';

test('AuthenticatedApp render Home, RoleManage, ResourceManage pages and I can navigate to those pages', async () => {
  await render(<AuthenticatedApp />);
  expect(window.history.length).toBe(1);

  const productManageMenu = screen.getByText('产品管理');
  userEvent.click(productManageMenu);
  userEvent.click(productManageMenu);
  const toRoleManageLink = screen.getByText('角色管理');
  userEvent.click(toRoleManageLink);
  expect(window.history.length).toBe(2);
});

test('landing on a bad page shows no match component', async () => {
  window.history.pushState({}, 'Test page', '/this-path-not-existed');
  await render(<AuthenticatedApp />);
  expect(screen.queryByRole('alert')).toHaveTextContent('No Match');
});
