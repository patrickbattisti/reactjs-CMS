import React from "react";

import Routes from "./routes";
import { UserProvider } from "./contexts/user";
import { SnackbarProvider } from "./contexts/snackbar";

function App() {
  return (
    <UserProvider>
      <SnackbarProvider>
        <Routes />
      </SnackbarProvider>
    </UserProvider>
  );
}

export default App;
