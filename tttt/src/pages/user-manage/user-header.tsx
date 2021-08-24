/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useTheme } from '@emotion/react';

interface Props {
  name: String;
  account: String;
  onSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
// //   type onSearch:React.Dispatch<React.SetStateAction<boolean>>
// interface SearchData {
//     userName:String,
//     userAccount:String,
//   }
function UserHeader({ name, account, onSearch }: Props) {
  const theme = useTheme();
  const [userName, setUserName] = React.useState<String>(name);
  const [userAccount, setUserAccount] = React.useState<String>(account);
  const handleNameChange = (e: any) => {
    setUserName(e.target.value);
  };
  const handleAccountChange = (e: any) => {
    setUserAccount(e.target.value);
  };
  const handleSearch = (event: React.ChangeEvent<{}>) => {
    // onSearch({
    //     userName:String:userName,
    //     userAccount:String:userAccount
    // })
  };
  return (
    <div css={{ margin: theme.spacing(2) }}>
      <TextField
        value={userName}
        onChange={handleNameChange}
        css={{ marginRight: theme.spacing(2), width: 300 }}
        label="人员名称"
        variant="outlined"
      />
      <TextField
        value={userAccount}
        onChange={handleAccountChange}
        css={{ width: 300 }}
        label="账号"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        css={{ color: '#fff', margin: theme.spacing(1) }}
        onClick={handleSearch}
      >
        查询
      </Button>
      <Button variant="contained" color="secondary" css={{ color: '#fff' }}>
        重置
      </Button>
    </div>
  );
}

export default UserHeader;
