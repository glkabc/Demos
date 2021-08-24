import authMocks from './features/authenticationMock';
import rolesMocks from './features/roleMock';
import resourceMocks from './features/resourceMock';
import userMocks from './features/userMock';
import roleLists from './features/roleListsMock';
import orgManagementMock from './features/orgManagementMock';
import addNewDirectoryMock from './features/addNewDirectoryMock';

const aggregatedHandlers = [
  ...authMocks,
  ...rolesMocks,
  ...resourceMocks,
  ...userMocks,
  ...roleLists,
  ...orgManagementMock,
  ...addNewDirectoryMock,
];

export default aggregatedHandlers;
