import "./App.css";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import NoteScreen from "./Screens/NoteScreen";
import NoteUpdateScreen from "./Screens/NoteUpdateScreen";
import NoteCreateScreen from "./Screens/NoteCreateScreen";
function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route
              path="/notes/search/sort/:sort"
              component={HomeScreen}
              exact
            />

            <Route path="/notes/search/:filter" component={HomeScreen} exact />
            <Route
              path="/notes/search/sort/:sort/page/:page"
              component={HomeScreen}
              exact
            />
            <Route
              path="/notes/search/week/page/:page"
              component={HomeScreen}
              exact
            />
            <Route path="/search/:keyword" component={HomeScreen} exact />

            <Route
              path="/notes/search/month/page/:page"
              component={HomeScreen}
              exact
            />
            <Route
              path="/notes/search/year/page/:page"
              component={HomeScreen}
              exact
            />
            <Route
              path="/notes/search/week/sort/:sort"
              component={HomeScreen}
              exact
            />
            <Route path="/page/:page" component={HomeScreen} exact />

            <Route path="/notes" component={NoteCreateScreen} exact />

            <Route path="/notes/:id" component={NoteScreen} exact />
            <Route path="/notes/:id/edit" component={NoteUpdateScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
