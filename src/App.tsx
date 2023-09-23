import { Navbar } from "./components/navbar";
import { NavbarNode } from "./components/navbar_node";
import { Router } from "./components/router";
import { Route, Switch } from "wouter";
import { Overview } from "./pages/overview/overview";
import { WatchList } from "./pages/watch_list/watch_list";
import { GlobalTheme } from "./theme/global_theme";
import { PageContent } from "./components/page_content";

export default function App() {
  return (
    <div className="app">
      <GlobalTheme />
      <Router>
        <Navbar>
          <NavbarNode href="/">Overview</NavbarNode>
          <NavbarNode href="/watchlist">Watch List</NavbarNode>
        </Navbar>
        <PageContent>
          <Switch>
            <Route path="/watchlist">
              <WatchList />
            </Route>
            <Route>
              <Overview />
            </Route>
          </Switch>
        </PageContent>
      </Router>
    </div>
  );
}
