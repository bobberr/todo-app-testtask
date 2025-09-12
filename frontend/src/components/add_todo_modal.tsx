import { useEffect, useState } from 'react';
import type { Todo } from '../types/todo';

interface TodoModalProps {
  setIsOpen: (isOpen: boolean) => void;
  handleAdd: (title: string, comment: string) => void;
  activeTodo?: Todo;
}

export const TodoModal = ({
  setIsOpen,
  handleAdd,
  activeTodo,
}: TodoModalProps) => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setTitle(activeTodo?.title || '');
    setComment(activeTodo?.comment || '');
  }, [activeTodo]);

  const resetForm = () => {
    setIsOpen(false);
    setIsError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">
          {activeTodo ? 'Edit' : 'Add new'} Todo
        </h2>

        <form
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              await handleAdd(title, comment);
              resetForm();
            } catch (e) {
              setIsError(true);
            }
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-300"
          />

          <textarea
            name="comment"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-300"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
              }}
              className="rounded-md border bg-gray-100 px-4 py-2 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {activeTodo ? 'Edit' : 'Add'}
            </button>
          </div>
          {isError && (
            <span className="text-center text-red-600">
              Something went wrong during {activeTodo ? 'editing' : 'adding'}{' '}
              todo
            </span>
          )}
        </form>
      </div>
    </div>
  );
};
