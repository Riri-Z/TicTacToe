

type ResultProps= {
  result :string
}
const Result = (props: ResultProps) => {

  return (
    <>{props.result} has won the game</>
  )
}

export default Result;