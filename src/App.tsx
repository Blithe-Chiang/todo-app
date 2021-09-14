import React, { FormEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type TodoType = Readonly<{
  id: string
  text: string
  done: boolean
}>

type CompletedTodoType = TodoType & {
  readonly done: true
}

function toggleTodo(todo: TodoType): TodoType {
  return { ...todo, done: !todo.done }
}

function completeTodo(todo: TodoType): CompletedTodoType {
  return { ...todo, done: true }
}

function isTodoCompleted(todo: TodoType): boolean {
  return todo.done
}

function App() {
  const [todos, setTodos] = useState<TodoType[]>([])

  const [inCompletedItemsCount, setInCompletedItemsCount] = useState<number>(0)

  // restore todos from localStorage
  useEffect(() => {
    const todosString = localStorage.getItem('todos')

    if (todosString != null) {
      try {
        const t = JSON.parse(todosString) as TodoType[]
        // just a simple test here
        if (Array.isArray(t)) {
          setTodos(t)
        }
      } catch {
        // seems this line never hits..
        setTodos([])
        console.error('failed to restore todos')
      }
    }
  }, [])

  // store todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // when todos changed, update the counter
  useEffect(() => {
    setInCompletedItemsCount(todos.filter((t) => !t.done).length)
  }, [todos])

  const toggleTodoItem = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? toggleTodo(todo) : todo))
    )
  }

  const deleteTodoItem = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const [newTodoText, setNewTodoText] = useState('')

  const addNewTodo = () => {
    const text = newTodoText

    if (text.trim() === '') {
      return
    }

    const newTodo: TodoType = {
      text,
      done: false,
      id: uuidv4(),
    }

    setTodos((prevTodos) => [newTodo, ...prevTodos])

    setNewTodoText('')
  }

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    addNewTodo()
  }

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((t) => !t.done))
  }

  return (
    <React.Fragment>
      <div className="min-h-screen pt-10 bg-gray-100">
        <div className="container mx-auto">
          <div className="px-5 py-5 mx-auto space-y-5 bg-white md:w-3/4 sm:w-full">
            <div className="text-center text-red-300 text-7xl">todos</div>
            {/* add new item */}
            <form onSubmit={onFormSubmit}>
              <input
                value={newTodoText}
                onChange={(event) => {
                  setNewTodoText(event.target.value)
                }}
                className="w-full px-3 py-4 duration-300 outline-none hover:ring-1 ring-gray-300"
                type="text"
                placeholder="What needs to be done?"
              />
            </form>
            {/* display items */}
            <div
              className={`text-gray-500 ${todos.length > 0 ? '' : 'hidden'}`}
            >
              {todos.map((todo) => (
                <div
                  className="flex items-center py-3 text-2xl border-t-2"
                  key={todo.id}
                >
                  <input
                    className="w-6 h-6"
                    onChange={() => {
                      toggleTodoItem(todo.id)
                    }}
                    type="checkbox"
                    checked={todo.done}
                  />

                  <div
                    className={`text-gray-700 ml-5 ${
                      isTodoCompleted(todo) ? 'text-gray-200 line-through' : ''
                    }`}
                  >
                    {todo.text}
                  </div>

                  <button
                    className="ml-auto duration-300 opacity-50 hover:opacity-100"
                    onClick={() => {
                      deleteTodoItem(todo.id)
                    }}
                  >
                    &#x2715;
                  </button>
                </div>
              ))}
              <div className="flex items-baseline px-3">
                <span>{inCompletedItemsCount} items left</span>
                <button
                  onClick={clearCompleted}
                  className={`px-3 ml-auto bg-gray-200 rounded-lg ${
                    inCompletedItemsCount === todos.length ? 'hidden' : ''
                  }`}
                >
                  clear completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
