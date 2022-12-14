import GregorianCalendarLocale from 'gregorian-calendar/lib/locale/en_US';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import TimePickerLocale from '../../time-picker/locale/en_US';

// 统一合并为完整的 Locale
let locale = { ...GregorianCalendarLocale };
locale.lang = {
  placeholder: 'Select date',
  rangePlaceholder: ['Start date', 'End date'],
  ...CalendarLocale,
};

locale.timePickerLocale = { ...TimePickerLocale };

// All settings at:
// https://github.com/ungtb10d/ant-design/issues/424

export default locale;
