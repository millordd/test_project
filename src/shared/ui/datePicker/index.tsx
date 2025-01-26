import 'react-calendar/dist/Calendar.css';

import { Typography } from 'alif-ui';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Fragment, useState } from 'react';
import Calendar from 'react-calendar';

import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import CalendarIcon from '@shared/assets/icones/calendarIcon.svg';
import ChevronLeftIcon from '@shared/assets/icones/chevronLeftIcon.svg';
import ChevronRightIcon from '@shared/assets/icones/chevronRightIcon.svg';
import WhiteCalendarIcon from '@shared/assets/icones/whiteCalendarIcon.svg';

import { IDatePickerProps, Value } from './types';

export const DatePicker = ({ value, onChange }: IDatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (date: Value) => {
    if (!date) return;
    onChange(dayjs(Array.isArray(date) ? date[0] : date).format('YYYY-MM-DD'));
    setIsOpen(false);
  };

  const fullDate = (date: string | null, format = 'DD.MM.YYYY') => {
    return date ? dayjs(date).format(format) : 'ДД.ММ.ГГГГ';
  };

  return (
    <>
      <Popover>
        <div className="flex max-w-96 flex-col">
          <PopoverButton className="focus:outline-0">
            <div
              className="relative h-11 py-3 flex items-center justify-between gap-x-2 rounded-lg border bg-[#F5F5FA] dark:bg-dark-mode-base dark:text-white dark:border-gray-800 px-4"
              onClick={() => setIsOpen(true)}
            >
              <Typography proportions="m" category="body" className={clsx(value && 'opacity-60')}>
                {value ? fullDate(value) : 'ДД.ММ.ГГГГ'}
              </Typography>
              <div className={clsx(value && 'opacity-60')}>
                <div className="block dark:hidden">
                  <CalendarIcon />
                </div>
                <div className="hidden dark:block">
                  <WhiteCalendarIcon />
                </div>
              </div>
            </div>
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="z-50">
              {isOpen && (
                <div className="absolute z-10 mt-[6px] w-[310px] rounded-[10px] border bg-white p-6">
                  <div className="flex justify-center">
                    <Calendar
                      onChange={handleClick}
                      value={value ? new Date(value) : null}
                      locale="ru"
                      className="custom-calendar"
                      next2Label={null}
                      prev2Label={null}
                      nextLabel={
                        <div className="flex items-center justify-center text-lg transition-all">
                          <ChevronRightIcon />
                        </div>
                      }
                      prevLabel={
                        <div className="flex items-center justify-center text-lg transition-all">
                          <ChevronLeftIcon />
                        </div>
                      }
                      tileClassName="custom-tile"
                    />
                  </div>
                </div>
              )}
            </PopoverPanel>
          </Transition>
        </div>
      </Popover>
    </>
  );
};
