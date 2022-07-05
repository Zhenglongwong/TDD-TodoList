interface CounterProps {
 count: Number;
}

const Counter = ({count}: CounterProps) => {
  return (
      <h1>{`Todos: ${count}`}</h1>
  )
}

export default Counter