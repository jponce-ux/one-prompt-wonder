import { FormEvent, useMemo, useState } from 'react';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

type Filter = 'all' | 'active' | 'completed';

const STORAGE_KEY = 'speckitlite.todo.localstorage.v1';

function loadTodos(): Todo[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (todo): todo is Todo =>
        typeof todo?.id === 'string' &&
        typeof todo?.text === 'string' &&
        typeof todo?.completed === 'boolean' &&
        typeof todo?.createdAt === 'string',
    );
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  function updateTodos(nextTodos: Todo[]) {
    setTodos(nextTodos);
    saveTodos(nextTodos);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) {
      return;
    }

    updateTodos([createTodo(text), ...todos]);
    setDraft('');
    setFilter('all');
  }

  function toggleTodo(id: string) {
    updateTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id: string) {
    updateTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <main className="app-shell">
      <section className="todo-panel" aria-labelledby="app-title">
        <div className="panel-header">
          <div>
            <p className="eyebrow">No-login local MVP</p>
            <h1 id="app-title">TODO List</h1>
          </div>
          <div className="summary" aria-label="Todo counts">
            <span>{todos.length} total</span>
            <span>{activeCount} active</span>
            <span>{completedCount} done</span>
          </div>
        </div>

        <form className="todo-form" onSubmit={handleSubmit}>
          <label htmlFor="todo-text">New todo</label>
          <div className="form-row">
            <input
              id="todo-text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Add a task..."
              autoComplete="off"
            />
            <button type="submit">Add</button>
          </div>
        </form>

        <div className="filters" aria-label="Todo filters">
          {(['all', 'active', 'completed'] as Filter[]).map((option) => (
            <button
              key={option}
              type="button"
              className={filter === option ? 'selected' : ''}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {visibleTodos.length === 0 ? (
          <p className="empty-state">
            {todos.length === 0
              ? 'Add your first task to start.'
              : 'No todos match this filter.'}
          </p>
        ) : (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button type="button" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
