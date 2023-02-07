import styled from 'styled-components';

type ResultProps = {
    result: string;
};

const ResultContainer = styled.section `
  margin: 10px;
`


const Result = (props: ResultProps) => {
    return <ResultContainer>{props.result}</ResultContainer>;
};

export default Result;
