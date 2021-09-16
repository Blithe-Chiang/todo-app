import React, { useState } from 'react'

import { TodoType } from '../types/TodoType'

export type TodoItemPropsType = {
  todo: TodoType
  toggleTodoItem: Function
  deleteTodoItem: Function
  updateTodoText: Function
}

function isTodoCompleted(todo: TodoType): boolean {
  return todo.done
}

export function TodoItem({
  todo,
  toggleTodoItem,
  deleteTodoItem,
  updateTodoText,
}: TodoItemPropsType) {
  const [newText, setNewText] = useState<string>(todo.text)

  const changeText = () => {
    if (newText === todo.text) return
    if (newText.trim() === '') return

    updateTodoText(todo.id, newText)
  }
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

      <div className="flex-1 mx-5">
        <input
          autoFocus
          className={`w-full bg-transparent outline-none ${
            isTodoCompleted(todo) ? 'line-through' : ''
          }`}
          type="text"
          onBlur={changeText}
          value={newText}
          disabled={isTodoCompleted(todo)}
          onChange={(event) => {
            setNewText(event.target.value)
          }}
        />
      </div>
      <button
        className="duration-300 opacity-50 hover:opacity-100"
        onClick={() => {
          deleteTodoItem(todo.id)
        }}
      >
        &#x2715;
      </button>
    </div>
  )
}
