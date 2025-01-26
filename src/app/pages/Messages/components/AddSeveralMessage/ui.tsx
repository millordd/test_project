import { Button, Flex, Form, Input, Modal, Select } from 'antd';
import { FC } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useCreateSeveralMessageQuery } from './api';
import { IAddSeveralMessagesProps, ISeveralMessagePayload } from './types';

export const AddSeveralMessage: FC<IAddSeveralMessagesProps> = ({ handleCancel, isModalOpen }) => {
  const { control, handleSubmit, reset } = useForm<ISeveralMessagePayload>({
    defaultValues: {
      messageType: 0,
      items: [{ recipient: '', content: '' }],
    },
  });
  const { mutateAsync, isPending } = useCreateSeveralMessageQuery();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = async (payload: ISeveralMessagePayload) => {
    mutateAsync(payload, {
      onSuccess: () => {
        toast.success('Сообщение успешно создано');
        handleCancel();
        reset();
      },
    });
  };

  return (
    <Modal title="Add Several Messages" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        {/* Message Type */}
        <Form.Item label="Message Type">
          <Controller
            name="messageType"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <Select.Option value={0}>Type 0</Select.Option>
                <Select.Option value={1}>Type 1</Select.Option>
                <Select.Option value={2}>Type 2</Select.Option>
                <Select.Option value={3}>Type 3</Select.Option>
              </Select>
            )}
          />
        </Form.Item>
        <div className="scrollable max-h-48 overflow-y-auto">
          {fields.map((field, index) => (
            <div key={field.id}>
              {/* Recipient */}
              <Form.Item label="Recipient">
                <Controller
                  name={`items.${index}.recipient`}
                  control={control}
                  rules={{
                    required: 'Recipient is required',
                  }}
                  render={({ field, fieldState }) => (
                    <Input {...field} placeholder="Enter recipient email" status={fieldState.error ? 'error' : ''} />
                  )}
                />
              </Form.Item>

              {/* Content */}
              <Form.Item label="Content">
                <Controller
                  name={`items.${index}.content`}
                  control={control}
                  rules={{ required: 'Content is required' }}
                  render={({ field, fieldState }) => (
                    <Input.TextArea
                      {...field}
                      placeholder="Enter message content"
                      status={fieldState.error ? 'error' : ''}
                    />
                  )}
                />
              </Form.Item>

              {fields.length > 1 && (
                <Button danger size="small" onClick={() => remove(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>

        <Flex justify="end" align="end">
          <Button type="dashed" size="small" onClick={() => append({ recipient: '', content: '' })}>
            + Add Message
          </Button>
        </Flex>

        {/* Form Buttons */}

        <Form.Item className="mt-4">
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
