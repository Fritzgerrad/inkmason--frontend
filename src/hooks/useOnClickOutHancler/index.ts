import { useEffect } from 'react';

interface UseClickOutHandlerProps {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
  isOpen: boolean;
}
const useClickOutHandler = ({
  ref,
  isOpen,
  callback,
}: UseClickOutHandlerProps) => {
  const eventListener = (event: MouseEvent) => {
    if (isOpen && ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('click', eventListener);
    return () => document.removeEventListener('click', eventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, isOpen, ref]);
};
export default useClickOutHandler;
