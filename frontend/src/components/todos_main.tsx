import { useEffect, useMemo, useState } from 'react';
import type { Todo } from '../types/todo';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../services/todos_api';
import { TodosList } from './todos_list';
import { TodoFooter } from './todo_footer';
import { TodoModal } from './add_todo_modal';

export const TodoMain = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isError, setIsError] = useState(false);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    }
  };

  const activeTodo = useMemo(() => {
    return todos.find((todo) => todo.id === activeId);
  }, [activeId]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (title: string, comment: string) => {
    await createTodo(title, comment);
    fetchTodos();
  };

  const handleEdit = async (title: string, comment: string) => {
    if (activeId === null) return;
    await updateTodo(activeId, { title, comment });
    fetchTodos();
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    await updateTodo(id, { isDone: !todo.isDone });
    fetchTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div>
      <div className="flex h-screen flex-col items-center">
        <h1 className="py-20 text-3xl uppercase">Todo Test App</h1>
        {isError ? (
          <p className="mb-10 text-red-500">Something went wrong.</p>
        ) : (
          <TodosList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            setActiveId={setActiveId}
          />
        )}

        <TodoFooter setIsOpen={setIsAddOpen} />
        {isAddOpen && (
          <TodoModal setIsOpen={setIsAddOpen} handleAdd={handleAdd} />
        )}
        {activeId !== null && (
          <TodoModal
            setIsOpen={(isOpen) => (!isOpen ? setActiveId(null) : null)}
            handleAdd={handleEdit}
            activeTodo={activeTodo}
          />
        )}
      </div>
    </div>
  );
};
