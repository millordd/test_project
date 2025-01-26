import { Button, Form, Input, Modal, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useCreateMessageQuery } from './api';
import { IMessagePayload } from './types';

interface AddMessagesProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
const { Option } = Select;

export const AddMessages: React.FC<AddMessagesProps> = ({ isModalOpen, handleOk, handleCancel }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IMessagePayload>();
  const { mutateAsync, isPending } = useCreateMessageQuery();

  const onSubmit = async (payload: IMessagePayload) => {
    mutateAsync(payload, {
      onSuccess: () => {
        toast.success('Сообщение успешно создано');
        handleOk();
      },
    });
  };
  return (
    <Modal title="Add Mesage" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
                <Option value={1}>Type 1</Option>
                <Option value={2}>Type 2</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Recipient Email"
          validateStatus={errors.recipient ? 'error' : ''}
          help={errors.recipient ? String(errors.recipient.message) : undefined}
        >
          <Controller
            name="recipient"
            control={control}
            defaultValue=""
            rules={{
              required: 'Recipient email is required',
            }}
            render={({ field }) => <Input {...field} placeholder="Enter Recipient Email" />}
          />
        </Form.Item>

        <Form.Item
          label="Content"
          validateStatus={errors.content ? 'error' : ''}
          help={errors.content ? String(errors.content.message) : undefined}
        >
          <Controller
            name="content"
            control={control}
            defaultValue=""
            rules={{ required: 'Content is required' }}
            render={({ field }) => <Input.TextArea {...field} placeholder="Enter Message Content" rows={4} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
