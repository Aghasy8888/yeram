import { DAYS, MONTHS, WEEKS } from "./stepConstants";

const stepOptions: IStepOption[] = [
    {
        label: 'день',
        value: DAYS
    },
    {
        label: 'неделя',
        value: WEEKS
    },
    {
        label: 'месяц',
        value: MONTHS
    },
];

export default stepOptions;