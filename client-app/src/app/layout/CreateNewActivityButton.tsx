import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { CREATE_ACTIVITY } from "../router/paths";

const CreateNewActivityButton = () => {
  return (
    <Button
      as={NavLink}
      to={`/${CREATE_ACTIVITY}`}
      positive
      content="Create Activity"
    />
  );
};

export default CreateNewActivityButton;
