/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast';
import { queryClient } from 'utils/reactQuery';

import { useMutation } from '@tanstack/react-query';

interface ToastWithPromiseParams<T> {
  tags: T[];
  id?: any;
}

export const useToastWithPromise = <T>(invalidateQueries?: ToastWithPromiseParams<T>[]) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (callback: () => Promise<void>) => callback(),
    onSuccess: () => {
      invalidateQueries?.forEach(({ tags, id }) =>
        tags.forEach((tag) => queryClient.refetchQueries({ queryKey: [tag, id], exact: true }))
      );
    },
  });

  const onSubmit = (functionApprove: (body: any) => Promise<any>, body: any, textSuccess: string): Promise<any> => {
    return toast.promise(
      mutateAsync(() => functionApprove(body)),
      {
        loading: 'Выполняется запрос...',
        success: textSuccess,
        error: 'Ошибка при выполнении запроса',
      }
    );
  };

  return { isPending, onSubmit };
};
