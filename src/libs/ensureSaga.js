import { call, put } from 'redux-saga/effects';

/**
 * Function helper ensure
 * @function name ensure;
 * @param requestSerializer
 * @param api {function} method Api
 * @param action {object} contain string params success and failure
 * @param serializer {function} serialize function
 * @param putGen
 * @param name {string}
 * name of in arguments of returned generator that need to include to serialize function
 * */
export default function ensure(
  {
    requestSerializer = args => args,
    api, action, responseSerializer = d => d, putGen = put,
    onSuccess = () => null, onFailure = () => null,
  }, name = 'payload',
) {
  // eslint-disable-next-line func-names
  return function* (args = {}) {
    const defaultArgs = Object.assign({ params: {} }, args);
    try {
      const { data } = yield call(api, requestSerializer(args));
      yield putGen({
        type: action.success,
        payload: responseSerializer(data, args[name]),
        meta: { ...defaultArgs.params, ...(data.meta || {}) },
      });
      onSuccess();
    } catch (err) {
      yield putGen({
        type: action.failure,
        err,
      });
      onFailure(err);
    }
  };
}
