import type { Todo } from '../types/todo';
import { TodoListItem } from './todo_list_item';

interface TodosListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  setActiveId: (id: number) => void;
}

export const TodosList = ({
  todos,
  onToggle,
  onDelete,
  setActiveId,
}: TodosListProps) => (
  <div className="mb-10 max-h-full overflow-y-auto">
    {todos.map((todo) => (
      <TodoListItem
        setActiveId={setActiveId}
        key={todo.id}
        todo={todo}
        onToggle={() => onToggle(todo.id)}
        onDelete={() => onDelete(todo.id)}
      />
    ))}
  </div>
);
