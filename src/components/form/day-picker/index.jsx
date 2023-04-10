import cx from 'classnames';
import { Text } from 'components/ui';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import Input from './Input';
import styles from './styles.scss';

export class RangeDatePicker extends Component {
  render() {
    const { start_date: from, end_date: to } = this.props;
    const modifiers = { start: from.input.value, end: to.input.value };
    return (
      <div className="InputFromTo">
        <div className="wrapInput">
          <DayPickerInput
            value={from.input.value}
            placeholder="From"
            format="ll"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from.input.value, { from: from.input.value, to: to.input.value }],
              disabledDays: { after: to.input.value, before: new Date() },
              toMonth: to.input.value || undefined,
              modifiers,
              numberOfMonths: 2,
              onDayClick: () => this.to.focus(),
            }}
            onDayChange={from.input.onChange}
            inputProps={{
              placeholder: 'Start Date',
              value: from.input.value,
            }}
            component={Input}
          />
          <div className={styles.info}>
            <span className={cx(
              styles.text,
              { [styles.visible]: from.meta.touched && from.meta.error },
            )}
            >
              {from.meta.touched && from.meta.error}
            </span>
          </div>
        </div>
        <Text size="md" black inline className={cx('ml10 mr10 mb10', styles.to)}>to</Text>
        <span className="InputFromTo-to">
          <DayPickerInput
            value={to.input.value}
            placeholder="To"
            format="ll"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from.input.value, { from: from.input.value, to: to.input.value }],
              disabledDays: { before: from.input.value },
              modifiers,
              month: from.input.value,
              fromMonth: from.input.value || undefined,
              numberOfMonths: 2,
            }}
            onDayChange={to.input.onChange}
            inputProps={{
              placeholder: 'End Date',
              setRef: (el) => { this.to = el; },
              value: to.input.value,
            }}
            component={Input}
          />
          <div className={styles.info}>
            <span className={cx(
              styles.text,
              { [styles.visible]: to.meta.touched && to.meta.error },
            )}
            >
              {to.meta.touched && to.meta.error}
            </span>
          </div>
        </span>
      </div>
    );
  }
}

RangeDatePicker.propTypes = {
  start_date: PropTypes.shape({
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      onChange: PropTypes.func.isRequired,
    }),
  }),
  end_date: PropTypes.shape({
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      onChange: PropTypes.func.isRequired,
    }),
  }),
};
