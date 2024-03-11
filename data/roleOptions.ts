import { ADMIN, ADMIN_OWNER, MODERATOR, USER } from './stepConstants';

const roleOptions: IDropDownOption[] = [
  {
    label: 'администратор',
    value: ADMIN,
  },
  {
    label: 'владелец',
    value: ADMIN_OWNER,
  },
  {
    label: 'модератор',
    value: MODERATOR,
  },
  {
    label: 'пользователь',
    value: USER,
  },
];

export default roleOptions;
