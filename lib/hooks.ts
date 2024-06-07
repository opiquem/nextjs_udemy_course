import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { ActionError, ActionFunction } from './actions';

export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}

export interface SubmissionState {
  loading: boolean;
  error: ActionError | null;
}

export type UseFormStateResult = [
  SubmissionState,
  (event: FormEvent<HTMLFormElement>) => Promise<void>
];

export function useFormState(action: ActionFunction): UseFormStateResult {
  const [state, setState] = useState({ loading: false, error: null });

  const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = await action(formData);
    if (result?.isError) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: result,
      }));
    } else {
      form.reset();
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return [state, handleSumbit];
}
