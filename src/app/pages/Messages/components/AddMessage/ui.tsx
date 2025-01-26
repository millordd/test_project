import { Button, Flex, Form, Input, Modal, Select } from 'antd';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useCreateMessageQuery } from './api';
import { AddMessagesProps, IMessagePayload } from './types';

export const AddMessages: FC<AddMessagesProps> = ({ isModalOpen, handleCancel }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMessagePayload>();
  const { mutateAsync, isPending } = useCreateMessageQuery();

  const onSubmit = async (payload: IMessagePayload) => {
    mutateAsync(payload, {
      onSuccess: () => {
        toast.success('Сообщение успешно создано');
        handleCancel();
        reset();
      },
    });
  };
  return (
    <Modal title="Add Message" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Organization ID */}
        <Form.Item
          label="Organization ID"
          validateStatus={errors.organizationId ? 'error' : ''}
          help={errors.organizationId ? String(errors.organizationId.message) : undefined}
        >
          <Controller
            name="organizationId"
            control={control}
            rules={{ required: 'Organization ID is required' }}
            render={({ field }) => <Input {...field} placeholder="Enter Organization ID" type="number" />}
          />
        </Form.Item>

        {/* Message Type */}
        <Form.Item
          label="Message Type"
          validateStatus={errors.messageType ? 'error' : ''}
          help={errors.messageType ? String(errors.messageType.message) : undefined}
        >
          <Controller
            name="messageType"
            control={control}
            rules={{ required: 'Message Type is required' }}
            render={({ field }) => (
              <Select {...field} placeholder="Select Message Type">
                <Select.Option value={1}>Type 1</Select.Option>
                <Select.Option value={2}>Type 2</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        {/* Recipient Email */}
        <Form.Item
          label="Recipient Email"
          validateStatus={errors.recipient ? 'error' : ''}
          help={errors.recipient ? String(errors.recipient.message) : undefined}
        >
          <Controller
            name="recipient"
            control={control}
            rules={{ required: 'Recipient email is required' }}
            render={({ field }) => <Input {...field} placeholder="Enter Recipient Email" />}
          />
        </Form.Item>

        {/* Content */}
        <Form.Item
          label="Content"
          validateStatus={errors.content ? 'error' : ''}
          help={errors.content ? String(errors.content.message) : undefined}
        >
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field }) => <Input.TextArea {...field} placeholder="Enter Message Content" rows={4} />}
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="end" align="end" gap={10}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
