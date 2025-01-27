import { Button, Flex, Form, Input, Modal } from 'antd';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useCreateUserQuery } from './api';
import { IAddUserPayload, IAddUserProps } from './types';

export const AddUser: FC<IAddUserProps> = ({ isModalOpen, handleCancel }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddUserPayload>();
  const { mutateAsync, isPending } = useCreateUserQuery();

  const onSubmit = async (payload: IAddUserPayload) => {
    mutateAsync(payload, {
      onSuccess: () => {
        toast.success('Пользватель успешно создано');
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

        {/* UserName*/}
        <Form.Item
          label="UserName"
          validateStatus={errors.userName ? 'error' : ''}
          help={errors.userName ? String(errors.userName.message) : undefined}
        >
          <Controller
            name="userName"
            control={control}
            rules={{ required: 'UserName is required' }}
            render={({ field }) => <Input {...field} placeholder="Enter userName" />}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password ? String(errors.password.message) : undefined}
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <Input.Password {...field} height={40} className="mt-1" placeholder="Enter password" size="large" />
            )}
          />
        </Form.Item>

        {/* PhoneNumber*/}
        <Form.Item
          label="PhoneNumber"
          validateStatus={errors.phoneNumber ? 'error' : ''}
          help={errors.phoneNumber ? String(errors.phoneNumber.message) : undefined}
        >
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: 'PhoneNumber is required' }}
            render={({ field }) => <Input {...field} placeholder="Enter phoneNumber" type="number" />}
          />
        </Form.Item>
        {/* Email*/}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email ? String(errors.email.message) : undefined}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            }}
            render={({ field }) => <Input {...field} placeholder="Enter email" type="email" />}
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
