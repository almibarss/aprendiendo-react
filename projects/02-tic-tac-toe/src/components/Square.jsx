export function Square ({ children, updateBoard, index, isSelected }) {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  return (
    <div
      className={className}
      onClick={() => updateBoard(index)}
    >
      {children}
    </div>
  )
}
