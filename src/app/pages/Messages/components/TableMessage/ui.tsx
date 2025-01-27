import type { TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Typography } from 'antd';
import { FC, HTMLAttributes, PropsWithChildren, useState } from 'react';
import toast from 'react-hot-toast';
import { queryClient } from 'utils/reactQuery';

import { useGetMessagesQuery, useRemoveMessageQuery, useUpdateMessageQuery } from './api';
import { IEditMessagePayload, IMessageItem, ITableMessageProps } from './types';

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'text';
  record: IMessageItem;
  index: number;
}

const EditableCell: FC<PropsWithChildren<EditableCellProps>> = ({
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
          rules={[{ required: true, message: `Please input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const TableMessage: FC<ITableMessageProps> = ({ params }) => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [editingKey, setEditingKey] = useState('');
  const [editingUser, setEditingUser] = useState<Partial<IMessageItem> | null>(null);
  const { mutateAsync: editMessages } = useUpdateMessageQuery();
  const { mutateAsync: removeMessage } = useRemoveMessageQuery();
  const queryParams = {
    ...params,
    pageInfo: {
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    },
  };

  const { data } = useGetMessagesQuery(queryParams);

  const isEditing = (record: IMessageItem) => record.id.toString() === editingKey;

  const edit = (record: IMessageItem) => {
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
    const row = await form.validateFields();

    const { content, recipient } = row;
    const { id, content: defaultContent, recipient: defaultRecipient } = editingUser as IEditMessagePayload;

    const editedData: IEditMessagePayload = {
      ...editingUser!,
      content: content ?? defaultContent ?? '',
      recipient: recipient ?? defaultRecipient ?? '',
      id: id ?? 0,
    };

    editMessages(editedData, {
      onSuccess: () => {
        toast.success('Пользователь успешно обновлён');
        queryClient.invalidateQueries({ queryKey: ['getMessages'] });
        setEditingKey('');
        setEditingUser(null);
      },
      onError: () => {
        toast.error('Ошибка при сохранении данных');
      },
    });
  };

  const deleteRecord = (id: number) => {
    const payload = { id };
    removeMessage(payload, {
      onSuccess: () => {
        toast.success('Пользователь успешно удалён');
        queryClient.invalidateQueries({ queryKey: ['getMessages'] });
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
      title: 'Organization Name',
      dataIndex: 'organizationName',

      render: (_: any, record: IMessageItem) => {
        return record.organization?.value;
      },
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
      editable: true,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      editable: true,
    },
    {
      title: 'SentAt',
      dataIndex: 'sentAt',
      key: 'sentAt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: IMessageItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={save} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button>Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Popconfirm title="Are you sure to delete?" onConfirm={() => deleteRecord(record.id)}>
              <Button type="link" style={{ marginLeft: 8 }} danger>
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns: TableProps<IMessageItem>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IMessageItem) => ({
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
          total: data?.total || 0,
        }}
        onChange={handleTableChange}
      />
    </Form>
  );
};
