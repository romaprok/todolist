import { useState } from 'react';
import './App.css';
import './index.css';

type TodoType = {
  id: string;
  todoText: string;
  isChecked: boolean
}

const App = () => {
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const [currentTodo, setCurrentTodo] = useState<string | undefined>('');

  const addTodo = (todoText: string | undefined) => {
    if (!todoText) return;
    const newTodo = {
      id: crypto.randomUUID(),
      isChecked: false,
      todoText,
    };
    setTodos([...todos, newTodo]);
    setCurrentTodo('');
  };
  const onCurrentTodoChange = (e) => {
    setCurrentTodo(e.currentTarget.value);
  };

  const onChangeTodoCheckedStatus = (id, isChecked) => {
    console.log(isChecked, 'isChecked');
    console.log(id, 'id');
    const newTodos = todos.map(todo => todo.id === id ? { ...todo, isChecked } : todo);
    setTodos(newTodos);
  };

  const removeTodo = (todoId: string) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(newTodos);
  };

  const removeTodos = () => setTodos([]);
  return (
    <div>
      <div style={{ marginBottom: '16px' }}><input onKeyDown={(e) => {
        if (e.key === 'Enter' && !!currentTodo) addTodo(currentTodo);
      }} type="text" onChange={onCurrentTodoChange} value={currentTodo}
                                                   style={{ border: '1px solid black' }} />
      </div>
      <div style={{ marginBottom: '32px' }}>
        <button onClick={(e) => addTodo(currentTodo)}>Add
        </button>
      </div>
      <div style={{ marginBottom: '32px' }}>{todos.map(todo => {
        return (
          <div key={crypto.randomUUID()} className="bg-blue-500 text-white p-4"
               style={{ display: 'flex', marginBottom: '8px' }}>
            <div style={{ margin: '0 6px' }}><input type="checkbox" checked={todo.isChecked}
                                                    onChange={(e) => onChangeTodoCheckedStatus(todo.id, e.currentTarget.checked)} />
            </div>
            <div><span style={{ verticalAlign: 'top' }}>{todo.todoText}</span></div>
            <div>
              <button onClick={() => removeTodo(todo.id)}>Remove todo</button>
            </div>
          </div>
        );
      })}</div>
      {!!todos.length && <div>
        <button onClick={removeTodos}>Remove todos</button>
      </div>}
    </div>
  );
};

export default App;
