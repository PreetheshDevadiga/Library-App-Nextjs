'use client';

import React from 'react';
import { Check, Globe } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import { useTransition } from 'react';
import { Locale } from '../i18n/config';
import { setUserLocale } from '../services/locale';

type Props = {
  defaultValue: string;
  items: Array<{value: string; label: string}>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={`
            flex items-center justify-center rounded-full p-2 transition-all
            bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540]
            hover:from-[#00C4EF] hover:to-[#6A63EF] hover:shadow-lg
            ${isPending ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          <Select.Icon>
            <Globe className="h-5 w-5" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-md bg-[#0D2E4B] py-1 shadow-lg"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center px-3 py-2 text-base text-white hover:bg-[#1A3550] focus:bg-[#1A3550] focus:outline-none"
                  value={item.value}
                >
                  <div className="mr-2 w-[1rem]">
                    {item.value === defaultValue && (
                      <Check className="h-4 w-4 text-[#00D4FF]" />
                    )}
                  </div>
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-[#0D2E4B]" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}