import { useState } from 'react';
import { DropdownItem } from 'reactstrap';
import { DropdownBtn } from '../DropdownBtn';
import {
  DateInterval,
  DateRange,
  dateRangeIsEmpty,
  rangeOrIntervalToString,
  intervalToDateRange,
  rangeIsInterval,
} from './types';
import DateRangeRow from './DateRangeRow';
import { DateIntervalDropdownItems } from './DateIntervalDropdownItems';

export interface DateRangeSelectorProps {
  initialDateRange?: DateInterval | DateRange;
  disabled?: boolean;
  onDatesChange: (dateRange: DateRange) => void;
  defaultText: string;
}

export const DateRangeSelector = (
  { onDatesChange, initialDateRange, defaultText, disabled }: DateRangeSelectorProps,
) => {
  const [ activeInterval, setActiveInterval ] = useState(
    rangeIsInterval(initialDateRange) ? initialDateRange : undefined,
  );
  const [ activeDateRange, setActiveDateRange ] = useState(
    !rangeIsInterval(initialDateRange) ? initialDateRange : undefined,
  );
  const updateDateRange = (dateRange: DateRange) => {
    setActiveInterval(undefined);
    setActiveDateRange(dateRange);
    onDatesChange(dateRange);
  };
  const updateInterval = (dateInterval?: DateInterval) => () => {
    setActiveInterval(dateInterval);
    setActiveDateRange(undefined);
    onDatesChange(intervalToDateRange(dateInterval));
  };

  return (
    <DropdownBtn disabled={disabled} text={rangeOrIntervalToString(activeInterval ?? activeDateRange) ?? defaultText}>
      <DropdownItem
        active={activeInterval === undefined && dateRangeIsEmpty(activeDateRange)}
        onClick={updateInterval(undefined)}
      >
        {defaultText}
      </DropdownItem>
      <DropdownItem divider />
      <DateIntervalDropdownItems active={activeInterval} onChange={(interval) => updateInterval(interval)()} />
      <DropdownItem divider />
      <DropdownItem header>Custom:</DropdownItem>
      <DropdownItem text>
        <DateRangeRow
          {...activeDateRange}
          onStartDateChange={(startDate) => updateDateRange({ ...activeDateRange, startDate })}
          onEndDateChange={(endDate) => updateDateRange({ ...activeDateRange, endDate })}
        />
      </DropdownItem>
    </DropdownBtn>
  );
};
