const pup = require("puppeteer");
const solution = require("./Solu");
let currPage;
const email = "ofYourChoice";
const pswd = "ofYourChoice";
let browserOpenPromise = pup.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});
browserOpenPromise
  .then((browser) => {
    let pageOpenPromise = browser.newPage();
    return pageOpenPromise;
  })
  .then((newPageOpen) => {
    currPage = newPageOpen;
    let hrPageOpen = currPage.goto("https://www.hackerrank.com/auth/login");
    return hrPageOpen;
  })
  .then(() => {
    let emailProm = currPage.type("input[id='input-1']", email);
    return emailProm;
  })
  .then(() => {
    let pswdProm = currPage.type("input[id='input-2']", pswd);
    return pswdProm;
  })
  .then(() => {
    let loginClick = currPage.click("button[data-analytics='LoginPassword']");
    return loginClick;
  })
  .then(() => {
    let clickQues = waitForClick("div[data-automation='algorithms']", currPage);
    return clickQues;
  })
  .then(() => {
    let goToEasySec = waitForClick("input[value='easy']", currPage);
    return goToEasySec;
  })
  .then(() => {
    let wait = currPage.waitFor(5000);
    return wait;
  })
  .then(() => {
    let quesSelectProm = currPage.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    return quesSelectProm;
  })
  .then((quesArr) => {
    let questobeSolved = quesHelper(quesArr[0], solution.answer[0], currPage);
    return questobeSolved;
  });
const waitForClick = (sel, page) => {
  return new Promise((resolve, reject) => {
    let waitForSelectorr = page.waitForSelector(sel);
    waitForSelectorr
      .then(() => {
        let clickNow = page.click(sel);
        return clickNow;
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
function quesHelper(question, solu, page) {
  return new Promise(function (resolve, reject) {
    let quesClicked = question.click();
    quesClicked
      .then(() => {
        let codeEditorForQues = waitForClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return codeEditorForQues;
      })
      .then(() => {
        return waitForClick("input[type='checkbox']", page);
      })
      .then(() => {
        return page.waitForSelector("#input-1", page);
      })
      .then(() => {
        return page.type("#input-1", solu);
      })
      .then(() => {
        let controlKeyPress = page.keyboard.down("Control");
        return controlKeyPress;
      })
      .then(() => {
        let aIsPressed = page.keyboard.press("A");
        return aIsPressed;
      })
      .then(() => {
        let xIsPressed = page.keyboard.press("X");
        return xIsPressed;
      })
      .then(() => {
        let controlKeyUnpress = page.keyboard.up("X");
        return controlKeyUnpress;
      })
      .then(() => {
        let mainEditor = waitForClick(".monaco-editor.no-user-select.vs", page);
        return mainEditor;
      })
      .then(() => {
        let controlKeyPress = page.keyboard.down("Control");
        return controlKeyPress;
      })
      .then(() => {
        let aIsPressed = page.keyboard.press("A");
        return aIsPressed;
      })
      .then(() => {
        let vIsPressed = page.keyboard.press("V");
        return vIsPressed;
      })
      .then(() => {
        let controlKeyUnpress = page.keyboard.up("X");
        return controlKeyUnpress;
      })
      .then(() => {
        let submitCode = waitForClick(
          ".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",
          page
        );
        return submitCode;
      })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
}
