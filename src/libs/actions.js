function makeActionDefault(payload) { return { payload }; }

export function formOnSubmit(fun) {
  return (data, dispatch, props) => {
    // eslint-disable-next-line no-nested-ternary
    const formName = props ? (props.form && typeof props.form === 'string' ? { reduxFormName: props.form } : null) : null;
    dispatch(fun({ ...data, ...formName }));
  };
}

export const POSTFIX = {
  request: '/REQUEST',
  success: '/SUCCESS',
  failure: '/FAILURE',
};

export function syncAction(type, makeAction = makeActionDefault) {
  const actionCreator = (...args) => {
    const action = makeAction(...args);
    if (typeof action === 'object') {
      action.type = type;
    }
    return action;
  };
  actionCreator.type = type;
  actionCreator.onSubmit = formOnSubmit(actionCreator);
  return actionCreator;
}

export function asyncAction(base, makeAction = makeActionDefault) {
  const actionCreator = (...args) => {
    const action = makeAction(...args);
    if (typeof action === 'object') {
      action.type = base;
    }
    return action;
  };

  actionCreator.type = base;
  actionCreator.request = `${base}${POSTFIX.request}`;
  actionCreator.success = `${base}${POSTFIX.success}`;
  actionCreator.failure = `${base}${POSTFIX.failure}`;
  actionCreator.onSubmit = formOnSubmit(actionCreator);
  return actionCreator;
}
