import { Message, MessageItem, MessageList } from "semantic-ui-react";

interface Props {
  errors: string[] | null;
}

const ValidationError = ({ errors }: Props) => {
  return (
    <Message error>
      {errors && (
        <MessageList>
          {errors.map((error: string, i) => (
            <MessageItem key={i}>{error}</MessageItem>
          ))}
        </MessageList>
      )}
    </Message>
  );
};

export default ValidationError;
