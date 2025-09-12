import type { Todo } from '../types/todo';

interface TodoListItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  setActiveId: (id: number) => void;
}

export const TodoListItem = ({
  todo,
  onToggle,
  onDelete,
  setActiveId,
}: TodoListItemProps) => (
  <div className="mb-2 flex w-[580px] items-center justify-between border-b-2 pb-2 text-xl font-semibold uppercase">
    <input
      type="checkbox"
      checked={todo.isDone}
      onChange={onToggle}
      className="form-checkbox mr-5 h-7 w-7 rounded"
    />
    <div
      className="w-full cursor-pointer truncate pr-3 transition-colors hover:text-blue-400"
      onClick={() => setActiveId(todo.id)}
    >
      <span
        style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}
        className="max-w-20"
      >
        {todo.title}
      </span>
      <p className="truncate text-xs">{todo.comment}</p>
    </div>
    <button onClick={onDelete}>Delete</button>
  </div>
);
