const validators = {
  required: {
    check: value => !value,
    defaultValue: 'Required',
  },
  email: {
    check: value => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
    defaultValue: 'Invalid email address',
  },
  equal: {
    check: (value, values, args) => value !== values.get(args[0]),
    defaultValue: 'passwords must match',
  },
  minLength: {
    check: (value, values, args) => !value || value.length < Number(args[0]),
    defaultValue: 'Length must be longer',
  },
  facebookUrl: {
    check: value => value && !/^(?:(?:http|https):\/\/)?(?:www.)?(facebook|fb).com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-.]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-.]*)?\/?$/i.test(value),
    defaultValue: 'Invalid facebook url',
  },
  instagramUrl: {
    check: value => value && !/^(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_.]+)?\/?$/im.test(value),
    defaultValue: 'Invalid instagram url',
  },
};

export default config => values => (
  Object.keys(config).reduce((errors, item) => {
    config[item].forEach(([validator, message, customCheck]) => {
      const args = validator.split(':');
      const name = args.shift();
      if (validator === 'custom' && customCheck(values.get(item), values, args)) {
        // eslint-disable-next-line no-param-reassign
        errors[item] = message || '';
      }
      if (validators[name] && validators[name].check(values.get(item), values, args)) {
        // eslint-disable-next-line no-param-reassign
        errors[item] = message || validators[name].defaultValue;
      }
    });
    return errors;
  }, {})
);
