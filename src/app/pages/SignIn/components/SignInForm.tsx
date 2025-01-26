import { Button, Flex, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { localStorageManager } from 'utils/localeStorage';

import { Logo } from '@shared/assets/icones';

import { useSignInQuery } from './api';

interface ISignInFormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormData>();

  const { mutateAsync, isPending } = useSignInQuery();

  const onSubmit = async (data: ISignInFormData) => {
    const { email, password } = data;
    const payload = {
      userLogin: email,
      password,
    };

    const toastId = toast.loading('Вход в систему...');

    mutateAsync(payload, {
      onSuccess: (res) => {
        toast.success('Вы успешно вошли в систему', { id: toastId });
        if (res.accessToken && res.refreshToken) {
          localStorageManager.set('accessToken', res.accessToken);
          localStorageManager.set('refreshToken', res.refreshToken);
        } else {
          toast.error('Ошибка: токен не получен', { id: toastId });
          return;
        }

        navigate('/dashboard');
      },
      onError: () => {
        toast.error('Ошибка входа в систему', { id: toastId });
      },
    });
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      className="max-w-[432px] mx-auto p-4 rounded-2xl bg-white px-10"
    >
      <Flex justify="center" align="center" className="w-full mb-5">
        <Logo />
      </Flex>

      <Form.Item name="email" help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
          }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder="Пароль"
              height={40}
              className="mt-1"
              size="large"
              status={fieldState.error ? 'error' : ''}
            />
          )}
        />
      </Form.Item>

      <Form.Item name="password" help={errors.password?.message}>
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <Input.Password {...field} height={40} className="mt-1" placeholder="Enter password" size="large" />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ height: '48px', backgroundColor: '#019681', marginTop: '2px' }}
          block
          loading={isPending}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
