interface UserFormType {
  user_name: string;
  user_id: string;
  user_mail: string;
  user_phone: string;
  user_structuer: string;
  user_type: string;
  user_status: number;
  user_structures: {
    id: number | null;
    lable: string;
  };
  user_types: {
    id: number | null;
    lable: string;
  };
  user_selectStatus: {
    status: number | undefined;
    lable: string;
  };
}

export default UserFormType;
