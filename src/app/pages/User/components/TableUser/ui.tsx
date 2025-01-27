import type { TableProps } from 'antd';
import { Form, Input, Popconfirm, Table, Typography } from 'antd';
import { FC, HTMLAttributes, PropsWithChildren, useState } from 'react';
import toast from 'react-hot-toast';
import { queryClient } from 'utils/reactQuery';

import { useGetUsersQuery, useUpdateUserQuery } from './api';
import { IEditUserPayload, ITableUserProps, IUser } from './types';

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'text';
  record: IUser;
  index: number;
}

const EditableCell: React.FC<PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const TableUser: FC<ITableUserProps> = ({ params, pagination, setPagination }) => {
  const { data } = useGetUsersQuery(params);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [editingUser, setEditingUser] = useState<Partial<IUser> | null>(null);
  const { mutateAsync: editUser } = useUpdateUserQuery();

  const isEditing = (record: IUser) => record.id.toString() === editingKey;

  const edit = (record: IUser) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id.toString());
    setEditingUser(record);
  };
  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  const cancel = () => {
    setEditingKey('');
    setEditingUser(null);
  };

  const save = async () => {
    const row = (await form.validateFields()) as Partial<IUser>;
    const editedData: IEditUserPayload = {
      ...editingUser!,
      userName: row.userName ?? editingUser?.userName ?? '',
      email: row.email ?? editingUser?.email ?? '',
      phoneNumber: row.phoneNumber ?? editingUser?.phoneNumber ?? '',
      id: editingUser?.id ?? 0,
      updatedAt: new Date().toISOString(),
      timestamp: btoa(new Date().toISOString()),
    };

    editUser(editedData, {
      onSuccess: () => {
        toast.success('Пользователь успешно обновлён');
        queryClient.invalidateQueries({ queryKey: ['getUsers'] });
        setEditingKey('');
        setEditingUser(null);
      },
    });
  };

  const columns = [
    {
      title: 'Organization ID',
      dataIndex: 'id',
      key: 'organizationId',
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: IUser) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={save} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <button>Cancel</button>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps<IUser>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IUser) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{ body: { cell: EditableCell } }}
        dataSource={data?.items || []}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.total || 0, // Total items from backend
        }}
        onChange={handleTableChange}
      />
    </Form>
  );
};
