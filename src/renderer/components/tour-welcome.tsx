import * as React from 'react';
import { observer } from 'mobx-react';

import { AppState } from '../state';
import { TourScriptStep, Tour } from './tour';
import { Dialog } from './dialog';

export interface WelcomeTourProps {
  appState: AppState;
}

export interface WelcomeTourState {
  isTourStarted: boolean;
}

function getWelcomeTour(): Set<TourScriptStep> {
  return new Set([
    {
      name: 'fiddle-editors',
      selector: 'div.mosaic-root',
      content: (
        <div>
          <h4>📝 Fiddle Editors</h4>
          <p>
            Electron Fiddle allows you to build little experiments and mini-apps with
            Electron. Each Fiddle has three files: A main script, a renderer script,
            and an HTML file.
          </p>
        </div>
      )
    },
    {
      name: 'select-versions',
      selector: 'select.select-versions',
      content: (
        <div>
          <h4>📇 Choose an Electron Version</h4>
          <p>
            If you're so inclined, choose an Electron version. Electron Fiddle will
            automatically download versions in the background.
          </p>
          <p>
            Open the preferences to see available versions and delete those already
            downloaded.
          </p>
        </div>
      )
    },
    {
      name: 'button-run',
      selector: 'button.button-run',
      content: (
        <div>
          <h4>🚀 Run Your Fiddle</h4>
          <p>
            Hit this button to give your Fiddle a try and start it.
          </p>
        </div>
      )
    },
    {
      name: 'button-publish',
      selector: 'button.button-publish',
      content: (
        <div>
          <h4>🗺 Share Your Fiddle</h4>
          <p>
            Like what you've built? You can save your Fiddle as a public GitHub Gist,
            allowing other users to load it by pasting the URL into the address bar.
          </p>
        </div>
      )
    },
    {
      name: 'main-editor',
      selector: 'div.mosaic-window.main',
      content: (
        <div>
          <h4>📝 Main Script</h4>
          <p>
            Every Electron app starts with a main script, very similar to how
            a Node.js application is started. That main script runs in the "main
            process". To display a user interface, the main process creates renderer
            processes – usually in the form of windows.
          </p>
          <p>
            To get started, pretend that the main process is just like a Node.js
            process. All APIs and features found in Electron are accessible through
            the <code>electron</code> module, which can be required like any other
            Node.js module.
          </p>
          <p>
            The default fiddle creates a new <code>BrowserWindow</code> and loads
            an HTML file.
          </p>
        </div>
      )
    },
    {
      name: 'html-editor',
      selector: 'div.mosaic-window.html',
      content: (
        <div>
          <h4>📝 HTML</h4>
          <p>
            In the default Fiddle, this HTML file is loaded in the
            <code>BrowserWindow</code>. Any HTML, CSS, or JavaScript that works
            in a browser will work here, too. In addition, Electron allows you
            to execute Node.js code. Take a close look at the
             <code>&lt;script /&gt;</code> tag and notice how we can call <code>
            require</code> like we would in Node.js.
          </p>
        </div>
      )
    },
    {
      name: 'renderer-editor',
      selector: 'div.mosaic-window.renderer',
      content: (
        <div>
          <h4>📝 Renderer Script</h4>
          <p>
            This is the script we just <code>required</code> from the HTML file.
            In here, you can do anything that works in Node.js <i>and</i> anything
            that works in a browser.
          </p>
          <p>
            By the way: If you want to use an <code>npm</code> module here, just
            <code>require</code> it. Electron Fiddle will automatically detect that you
            requested a module and install it as soon as you run your Fiddle.
          </p>
        </div>
      )
    }
  ]);
}

@observer
export class WelcomeTour extends React.Component<WelcomeTourProps, WelcomeTourState> {
  constructor(props: WelcomeTourProps) {
    super(props);

    this.stopTour = this.stopTour.bind(this);
    this.startTour = this.startTour.bind(this);

    this.state = {
      isTourStarted: false
    };
  }

  public stopTour() {
    this.props.appState.isTourShowing = false;
  }

  public startTour() {
    this.setState({ isTourStarted: true });
  }

  public render() {
    const { isTourShowing } = this.props.appState;
    const { isTourStarted } = this.state;

    if (!isTourShowing) return null;

    if (!isTourStarted) {
      return (
        <Dialog
          key='welcome-tour-dialog'
          isCentered={true}
          isShowing={true}
          isShowingBackdrop={true}
          onConfirm={this.startTour}
          onClose={this.stopTour}
        >
          <span>Would you like to start the tour?</span>
        </Dialog>
      );
    } else {
      return (
        <Tour tour={getWelcomeTour()} onStop={this.stopTour} />
      );
    }
  }
}
