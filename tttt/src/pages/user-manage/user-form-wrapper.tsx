/** @jsxImportSource @emotion/react */
import useEditorQuery from './use-editor-query';
import UserFormType from './user-form-type';
import UserFrom from './user-form';

interface Props {
  id?: number;
  setUserEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const userFormDefaultValue: UserFormType = {
  user_name: '',
  user_id: '',
  user_mail: '',
  user_phone: '',
  user_structuer: '',
  user_type: '',
  user_status: 1,
  user_structures: {
    id: null,
    lable: '',
  },
  user_types: {
    id: null,
    lable: '',
  },
  user_selectStatus: {
    status: undefined,
    lable: '',
  },
};

function UserFormWrapper({ id, setUserEditorOpen }: Props) {
  const { data, isLoading, isError, isIdle, isSuccess } = useEditorQuery(id);
  if (id === undefined) {
    return (
      <UserFrom
        defaltValues={userFormDefaultValue}
        setUserEditorOpen={setUserEditorOpen}
      />
    );
  }
  if (isIdle || isLoading) {
    return <div>加载中......</div>;
  }
  if (isError) {
    return <div>加载出错</div>;
  }
  if (isSuccess && data) {
    return (
      <UserFrom defaltValues={data} setUserEditorOpen={setUserEditorOpen} />
    );
  }
  return null;
}

export default UserFormWrapper;
