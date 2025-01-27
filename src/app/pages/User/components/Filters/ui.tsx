import { Button, Col, Input, Row, Select, Space } from 'antd';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IGetUsersPayload } from '../TableUser/types';

interface IFilterProps {
  setFilters: (filters: any) => void;
}

export const Filter: FC<IFilterProps> = ({ setFilters }) => {
  const { control, handleSubmit } = useForm<IGetUsersPayload>({
    defaultValues: {
      filters: {
        userName: '',
        email: '',
        phoneNumber: '',
      },
      orderBy: {
        orderColumn: 1,
        direction: 0,
      },
      pageInfo: {
        pageNumber: 0,
        pageSize: 0,
      },
    },
  });

  const onSubmit = (values: IGetUsersPayload) => {
    const updatedValues = {
      ...values,
      orderBy: {
        orderColumn: Number(values.orderBy.orderColumn),
        direction: Number(values.orderBy.direction),
      },
    };

    setFilters(updatedValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Controller
              name="filters.userName"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter User Name" />}
            />
          </Col>
          <Col span={8}>
            <Controller
              name="filters.email"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter Email" />}
            />
          </Col>
          <Col span={8}>
            <Controller
              name="filters.phoneNumber"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter Phone Number" />}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Controller
              name="orderBy.orderColumn"
              control={control}
              render={({ field }) => <Input type="number" {...field} placeholder="Enter Order Column" />}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="orderBy.direction"
              control={control}
              render={({ field }) => (
                <Select {...field} defaultValue={0} style={{ width: '100%' }}>
                  <Select.Option value={0}>Ascending id 0</Select.Option>
                  <Select.Option value={1}>Descending id 1</Select.Option>
                  <Select.Option value={2}>other id 2</Select.Option>
                </Select>
              )}
            />
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          Apply Filters
        </Button>
      </Space>
    </form>
  );
};
