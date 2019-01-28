import React from 'react';

const NavBar = ({ changePage, activePage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#">liftDropGrow</a>
      <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbarColor01" style={{}}>
        <ul className="navbar-nav mr-auto">
          <li className={activePage === 'workouts' ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href="#" id="workouts" onClick={changePage}>Workout Tracker <span className="sr-only">(current)</span></a>
          </li>
          <li className={activePage === 'progress' ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href="#" id="progress" onClick={changePage}>Progress Graph</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;