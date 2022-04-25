import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { UserStorage } from "./context/UserContext";
import LoginRouter from "./LoginRouter";
import Home from "./pages/home/Home";
import PaginaNotFound from "./pages/paginaNotFound/PaginaNotFound";
import ProtectedRouter from "./components/helps/ProtectedRouter";
import { ChakraProvider } from "@chakra-ui/react";
import { CreatedTask } from "./pages/createdTask/CreatedTask";
import { theme } from "./styles/theme";
import { UpdatedTask } from "./pages/updatedTask/UpdatedTask";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <div>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <UserStorage>
            <TaskProvider>
              <Header />
              <Routes>
                <Route
                  path="/home"
                  element={
                    <ProtectedRouter>
                      <Home />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/task"
                  element={
                    <ProtectedRouter>
                      <CreatedTask />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/task/:id"
                  element={
                    <ProtectedRouter>
                      <UpdatedTask />
                    </ProtectedRouter>
                  }
                />
                <Route path="/*" element={<LoginRouter />} />
                <Route path="*" element={<PaginaNotFound />} />
              </Routes>
            </TaskProvider>
          </UserStorage>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
