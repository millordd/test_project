import { Table } from 'antd';
import { FC } from 'react';

import { PenIcon } from '@shared/assets/icones';

import { useGetUsersQuery } from './api';
import { ITableUserProps } from './types';

export const TableUser: FC<ITableUserProps> = ({ payload }) => {
  const { data } = useGetUsersQuery(payload);

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
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: '',
      render: () => (
        <div>
          <PenIcon />
        </div>
      ),
    },
  ];

  return (
    <div className="max-h-[45vh] overflow-y-auto">
      <Table dataSource={data?.items || []} columns={columns} pagination={{ pageSize: data?.total }} />
    </div>
  );
};
