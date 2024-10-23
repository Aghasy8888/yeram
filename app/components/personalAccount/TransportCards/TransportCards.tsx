import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { getScheduleForShow } from '@/helpers/helpers_6';
import { TransportCardMobile } from '../../personalAccount';
import { selectCompanyInDetails } from '@/redux/features/company/companySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const TransportCards = ({
  transportsToShow,
  onSetSchedule,
  setReportStepWrapper,
}: ITransportCardsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const companyInDetails: ICompany = useAppSelector(selectCompanyInDetails) as ICompany;

  const onSetReportStep = (
    option: IDropDownOption,
    transport: ITransportFromBack
  ) => {
    setReportStepWrapper(
      navigate,
      dispatch,
      option,
      [transport],
      companyInDetails?.id
    );
  };

  return transportsToShow?.map((transport, index) => {
    const scheduleForShow = getScheduleForShow(transport);

    return (
      <div key={index}>
        <TransportCardMobile
          scheduleForShow={scheduleForShow}
          onSetReportStep={(option: IDropDownOption) =>
            onSetReportStep(option, transport)
          }
          onSetSchedule={onSetSchedule}
          transport={transport}
        />
      </div>
    );
  });
};

export default memo(TransportCards);
