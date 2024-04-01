import { Grid } from "@mui/material";
import { Page } from "../../components/Page";
import { EventList } from "./components/EventList";
import { useUserEvents } from "./hooks";
import { RegisteredEventList } from "./components/RegisteredEventList";
import { UnRegisteredEventList } from "./components/UnRegisteredEventList";
import { ListsContainer } from "./styles";

const SPACING = 2;

export const Events = () => {
  useUserEvents();

  return (
    <Page>
      <ListsContainer container spacing={SPACING}>
        <Grid item xs>
          <UnRegisteredEventList />
        </Grid>
        <Grid item xs>
          <RegisteredEventList />
        </Grid>
      </ListsContainer>
    </Page>
  );
};
