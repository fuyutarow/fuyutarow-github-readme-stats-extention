import * as React from 'react';
import { useState, useEffect } from 'react';

import logo from './logo.svg';

import './App.css';
import { useKeyPress } from 'react-use';
import Container from '@material-ui/core/Container';

import { name as appName, version } from '../package.json';

const GithubReadmeStats: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div>
      <img {...{
        src: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&count_private=true&theme=radical`,
      }} />
      <img {...{
        src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical`,
      }} />
    </div>
  );

};

const App = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, tabs => {
      const tab = tabs[0];
      setCurrentUrl(tab.url ?? null);

    });
  }, [currentUrl]);

  useEffect(() => {
    if (currentUrl) {
      const parser = new URL(currentUrl);
      const username = parser.pathname.split('/')[1];
      setUsername(username);
    }
  }, [currentUrl, username]);

  return (
    <div className="App">
      <Container className="App-container">
        {
          username && <GithubReadmeStats {...{ username }} />
        }
        <div>
          {appName} v{version}
        </div>
      </Container>
    </div>
  );
};

export default App;
