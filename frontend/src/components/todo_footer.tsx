interface TodoFooterProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const TodoFooter = ({ setIsOpen }: TodoFooterProps) => {
  return (
    <div className="mb-5">
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-2xl text-white shadow-lg hover:bg-blue-600"
      >
        +
      </button>
    </div>
  );
};
