import { Todo, TodoInput } from '../types/todos';
import { getLocalToken } from '../utils/authUtils';

interface CoreOutput {
  message?: string;
  error?: unknown;
}
interface TodoOutput extends CoreOutput {
  todos?: Todo[];
  token?: string;
}

export const getTodosFetcher = async (): Promise<TodoOutput> => {
  try {
    const response = await fetch('http://localhost:8080/todos', {
      method: 'GET',
      headers: {
        Authorization: getLocalToken() || '',
      },
    });
    const result = await response.json();

    return { todos: result.data };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};

interface CreateTodoOutput extends CoreOutput {
  todo?: Todo;
  token?: string;
}

interface GetTodoInput {
  id: string;
}
interface GetTodoOutput extends CoreOutput {
  todo?: Todo;
}
export const getTodoFetcher = async ({
  id,
}: GetTodoInput): Promise<GetTodoOutput> => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'GET',
      headers: {
        Authorization: getLocalToken() || '',
      },
    });
    const result = await response.json();

    return { todo: result.data };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};

interface CreateTodoOutput extends CoreOutput {
  todo?: Todo;
  token?: string;
}
export interface CreateTodoInput extends TodoInput {}
export const createTodo = async (
  todoInput: CreateTodoInput
): Promise<CreateTodoOutput> => {
  try {
    const response = await fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getLocalToken() || '',
      },
      body: JSON.stringify(todoInput),
    });
    const result = await response.json();

    return { todo: result.data };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};

export interface UpdateTodoInput extends TodoInput {
  id?: string;
}
interface UpdateTodoOutput extends CoreOutput {
  todo?: Todo;
}
export const updateTodoFetcher = async ({
  id,
  title,
  content,
}: UpdateTodoInput): Promise<UpdateTodoOutput> => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getLocalToken() || '',
      },
      body: JSON.stringify({ title, content }),
    });
    const result = await response.json();

    return { todo: result.data };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};

interface DeleteTodoInput {
  id: string;
}
interface DeleteTodoOutput extends CoreOutput {
  ok: boolean;
}
export const deleteTodoFetch = async ({
  id,
}: DeleteTodoInput): Promise<DeleteTodoOutput> => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getLocalToken() || '',
      },
    });
    const result = await response.json();

    return { ok: result.data === null && true };
  } catch (error) {
    return { ok: false, message: '에러 발생 :', error };
  }
};