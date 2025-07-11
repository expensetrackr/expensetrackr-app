import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from './form-context.ts';

export const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {},
    formComponents: {},
});
