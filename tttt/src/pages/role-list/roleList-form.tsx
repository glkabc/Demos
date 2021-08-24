/** @jsxImportSource @emotion/react */
import RoleFormListsType from './role-formLists-type';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface Props {
  defaltValues: RoleFormListsType;
  setRoleEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const schema = yup.object().shape({
  user_name: yup.string().required(),
  user_id: yup.string().required(),
  user_mail: yup.string().required(),
  user_phone: yup.string().required(),
  user_structuer: yup.string().required(),
});

function RoleListForm({ defaltValues, setRoleEditOpen }: Props) {
  console.log(defaltValues);
  // const { control, handleSubmit } = useForm<RoleFormListsType>({
  //     resolver: yupResolver(schema),
  //     defaultValues: defaltValues,
  //   });
  return <div>表单</div>;
}

export default RoleListForm;
