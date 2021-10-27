'use strict';

const CSS = `
body *, body *::before, body *::after {
  /*CSS transition*/
  transition: 0.01ms !important;
  transition-delay: 0ms !important;
  /*CSS animations*/
  animation-delay: 0ms !important;
  animation-duration: 0ms !important;
 }
`;

let playTransition = false;
//init
toogleTransition();

browser.browserAction.onClicked.addListener(handleClick);
browser.webNavigation.onCommitted.addListener(handeTabUpdate)


function handleClick() {
    playTransition = !playTransition;
    toogleTransition();
}

function handeTabUpdate(details) {
	// @todo use details.frameId to inject in the specific updated frame
    if (playTransition === false) {
        disableTabTransition(details.tabId);
    }
}


function disableAllTabsTransition() {
    browser.tabs.query({}).then((tabs) => {
        for (let tab of tabs) {
            disableTabTransition(tab);
        }
    });
}

function disableTabTransition(tab) {
    browser.tabs.insertCSS(tab.id, { code: CSS, cssOrigin: 'user', allFrames: true });
}


window.onload = disableAllTabsTransition;
