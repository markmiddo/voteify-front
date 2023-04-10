import { stopSubmit } from 'redux-form';

export function makeErrorAction(errors) {
  if (typeof errors === 'string') return { _error: errors };
  if (Array.isArray(errors)) {
    if (typeof errors[0] === 'string') {
      return { _error: errors[0] };
    }
    throw new Error('Incorrect format error message');
  }
  const res = r => (Array.isArray(r) ? r[0] : r);
  return Object
    .keys(errors)
    .reduce((A, field) => Object.assign({}, A, { [field]: res(errors[field]) }),
      {});
}

export function asyncErrorAction(formName, errors) {
  return stopSubmit(formName, makeErrorAction(errors));
}
