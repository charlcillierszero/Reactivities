import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header } from "semantic-ui-react";
import List from "semantic-ui-react/dist/commonjs/elements/List";

interface Activity {
  id: string;
  title: string;
}

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((response) => setActivities(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Header as={"h2"} icon={"users"} content={"Reactivities"} />
      <List>
        {activities.map((activity: Activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
