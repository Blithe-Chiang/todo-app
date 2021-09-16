import React from 'react'

import { TodoType } from '../types/TodoType'

export type TodoItemPropsType = {
  todo: TodoType
  toggleTodoItem: Function
  deleteTodoItem: Function
}

function isTodoCompleted(todo: TodoType): boolean {
  return todo.done
}

export function TodoItem({
  todo,
  toggleTodoItem,
  deleteTodoItem,
}: TodoItemPropsType) {
  return (
    <div className="flex items-center py-3 text-2xl border-t-2">
      <input
        className="w-6 h-6"
        onChange={() => {
          toggleTodoItem(todo.id)
        }}
        type="checkbox"
        checked={todo.done}
      />

      <div className="ml-5">
        <div
          className={`text-gray-700 ${
            isTodoCompleted(todo) ? 'text-gray-200 line-through' : ''
          }`}
        >
          {todo.text}
        </div>
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
  )
}
