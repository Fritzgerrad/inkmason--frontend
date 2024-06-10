import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import useClickOutHandler from '@src/hooks/useOnClickOutHancler';
import { BiArrowFromBottom } from 'react-icons/bi';
interface SelectInputOption {
  value: string;
  label: string;
}
interface SelectInputProps {
  label: string;
  id?: string;
  name: string;
  placeholder?: string;
  options: SelectInputOption[];
  fetchOptions?: () => Promise<{ value: string; label: string }[]>;
  onChange: (name: string, value: string) => void;
  className?: string;
  error?: string;
  [rest: string]: unknown;
}

const SelectInput = ({
  label,
  name,
  id,
  options = [],
  fetchOptions,
  onChange,
  className = '',
  placeholder = 'Select an option',
  error = '',
  ...rest
}: SelectInputProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [optionsList, setOptionsList] = useState<SelectInputOption[]>(options);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    onChange(name, value);
    setIsOpen(false);
  };

  useClickOutHandler({
    ref: dropdownRef,
    isOpen,
    callback: () => setIsOpen(false),
  });

  useEffect(() => {
    if (fetchOptions) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await fetchOptions();
          setOptionsList(data);
        } catch (error) {
          console.error('Error fetching options:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
    }

    return () => {};
  }, [fetchOptions]);

  return (
    <div className='w-full flex flex-col' ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id || name}
          className='block text-sm font-light leading-6 text-gray-400 md:text-lg'
        >
          {label}
        </label>
      )}
      <div className='relative mt-1'>
        <button
          type='button'
          className={classNames(
            'block w-full rounded-md border border-gray-400 outline-none py-3 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-base sm:leading-6',
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
          {...rest}
        >
          <span className={`inline-flex w-9/10`}>
            {selectedOption
              ? optionsList.find((option) => option.value === selectedOption)
                  ?.label
              : placeholder}
          </span>
          <BiArrowFromBottom className='absolute top-4 right-2' />
        </button>
        {isOpen && (
          <div className='absolute z-10 mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg'>
            {isLoading ? (
              <div className='flex justify-center py-2'>
                <BiArrowFromBottom />
                <span className='ml-2'>Loading...</span>
              </div>
            ) : (
              <ul className='max-h-60 overflow-auto'>
                {optionsList.map((option) => (
                  <li
                    key={option.value}
                    className='cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100'
                    onClick={() => {
                      handleOptionClick(option.value);
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {error && <span className='text-danger text-sm mt-1'>{error}</span>}
    </div>
  );
};

export default SelectInput;