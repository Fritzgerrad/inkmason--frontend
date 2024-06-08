import React, { ChangeEvent, ReactNode } from 'react';
import classNames from 'classnames';

interface textInputProps {
    label: string;
    id: string;
    name: string;
    type: 'email' | 'text' | 'password' | 'tel';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?:string;
    error?: string;
    Icon?: ReactNode;
    [rest: string]: unknown;
  }

const TextInput = ({
    label,
    name,
    id,
    onChange,
    type,
    error,
    className,
    Icon,
    placeholder
  //{`text-gray-600 text-base font-M font-semibold text-sm`}>

}:textInputProps):React.ReactNode => {
        return (
            <div className={`w-full flex flex-col my-3`}>
              {label && (
                <label
                  htmlFor={name}
                  className={`block text-base font-semibold leading-6 md:text-lg'
                  `}
                >
                  {label}
                </label>
              )}
              <div className={`mt-1 relative`}>
                <input
                  id={id || name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  className={classNames([
                    `block w-full px-2 rounded-md border-1 border-gray-400 outline-none py-3 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-base sm:leading-6`,
                    className,
                  ])}
                  onChange={onChange}
                />
                {Icon && Icon}
              </div>
              {error && <span className={`text-danger text-sm`}>{error}</span>}
            </div>
    );
}
 
export default TextInput;