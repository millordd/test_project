import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IMessageFilterProps } from './types';

const { RangePicker } = DatePicker;

export const MessageFilter: FC<IMessageFilterProps> = ({ setFilterData }) => {
  const { control, handleSubmit } = useForm();

  const onSearch = (values: any) => {
    const updatedFilters = {
      recipient: values.recipient || '',
      sentAt: new Date().toISOString(),
      startDate: values.range?.[0] ? dayjs(values.range[0]).toISOString() : null,
      endDate: values.range?.[1] ? dayjs(values.range[1]).toISOString() : null,
    };

    setFilterData((prev: any) => ({
      ...prev,
      filters: updatedFilters,

      orderBy: {
        orderColumn: Number(values.orderColumn),
        direction: Number(values.direction),
      },
    }));
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSearch)}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Recipient">
            <Controller
              name="recipient"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter recipient" />}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Order Column">
            <Controller
              name="orderColumn"
              control={control}
              render={({ field }) => <Input type="number" {...field} />}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Sort Direction">
            <Controller
              name="direction"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <Select.Option value={0}>Ascending</Select.Option>
                  <Select.Option value={1}>Descending</Select.Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Date Range">
        <Controller
          name="range"
          control={control}
          render={({ field }) => (
            <RangePicker
              {...field}
              placement="bottomLeft"
              showTime
              onChange={(dates) => {
                field.onChange(dates ? [dates[0], dates[1]] : []);
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};
