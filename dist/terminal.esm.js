import { ref, reactive, onMounted, pushScopeId, popScopeId, openBlock, createBlock, createVNode, withModifiers, Fragment, renderList, createCommentVNode, toDisplayString, withKeys, withScopeId } from 'vue';

function commandManager(command) {
  const availableCommands = {
    help: {
      name: 'help',
      description: 'list all availables commands on the terminal',
      execute: () => {
        let commandList = '';
        Object.keys(availableCommands).forEach(key => {
          commandList += `
            <div>
              Name: <b>${availableCommands[key].name}</b> - Description: <b>${availableCommands[key].description}</b>
            </div>`;
        });
        return {
          text: `
            <div>This is a list of all available commands:</div>
            ${commandList}
          `,
          color: 'white',
          allowHtml: true,
          additionalStyles: {
            marginTop: '20px'
          }
        };
      }
    },
    creat0r: {
      name: 'creator',
      description: 'The creator of this beautiful terminal',
      execute: () => {
        return {
          text: 'My creator is <a href="https://github.com/toniop99" target="_blank">github/toniop99</a>',
          color: 'green',
          allowHtml: true
        };
      }
    },
    projects: {
      name: 'projects',
      description: 'A list of all my personal projects',
      execute: () => {
        return {
          text: 'In construction',
          color: 'orange',
          allowHtml: false
        };
      }
    }
  };

  if (!availableCommands[command]) {
    return {
      text: `Unknown command: ${command} | Try help for a list of commands`,
      color: 'red'
    };
  }

  return availableCommands[command].execute();
}

var script = {
  setup() {
    const userInput = ref("");
    const historyCommands = reactive([]);
    const caretStyles = reactive({});
    const terminal = ref(null);
    const input = ref(null);
    const caret = ref(null);
    onMounted(() => {
      writehistoryLine({
        text: "Type help to show all available commands",
        color: "white"
      });
    });

    function manageIntroClicked() {
      manageInputCommand(userInput.value);
      clearInput();
    }

    function manageInputCommand(command) {
      switch (command) {
        case "clear":
          historyCommands.length = 0;
          break;

        case "fill":
          for (let i = 0; i < 200; i++) {
            writehistoryLine({
              text: "a",
              color: "green"
            });
          }

          break;

        default:
          writehistoryLine(commandManager(command));
          break;
      }
    }

    function writehistoryLine({
      text,
      color,
      allowHtml = false,
      additionalStyles = null
    }) {
      historyCommands.push({
        text,
        allowHtml,
        styles: {
          fontSize: "14px",
          textAlign: "left",
          color,
          padding: 0,
          margin: 0,
          ...additionalStyles
        }
      });
    } // TODO: Implement key-up key-down to navigate through previous commands


    function manageKeyUp(e) {
      userInput.value = e.target.value;
      const caretStartPosition = input.value.selectionStart;
      const caretEndPosition = input.value.selectionEnd;
      updateCaretPosition(caretStartPosition, caretEndPosition, userInput.value.length);
      scrollToBottom();
    }

    function updateCaretPosition(caretStartPosition, caretEndPosition, userInputLength) {
      if (caretStartPosition !== userInputLength) {
        caretStyles.background = "rgb(36, 170, 36, 0.4)";
      } else {
        caretStyles.background = "rgb(36, 170, 36,1)";
      }

      if (caretStartPosition === caretEndPosition) {
        caretStyles.width = "1ch";
        const left = caretStartPosition - userInputLength;
        caretStyles.left = `${left}ch`;
      } else {
        const caretWidth = caretEndPosition - caretStartPosition;
        const left = caretStartPosition - userInputLength;
        caretStyles.left = `${left}ch`;
        caretStyles.width = `${caretWidth}ch`;
      }
    }

    function focusInput(event) {
      input.value.focus();
      caret.value.classList.add("blink");
    }

    function inputFocusOut() {
      caret.value.classList.remove("blink");
    }

    function clearInput() {
      input.value.value = "";
      userInput.value = "";
    }

    function scrollToBottom() {
      const body = terminal.value.querySelector(".body");
      body.scrollTop = body.scrollHeight;
    }

    return {
      caretStyles,
      historyCommands,
      userInput,
      inputFocusOut,
      terminal,
      caret,
      input,
      focusInput,
      manageKeyUp,
      manageIntroClicked
    };
  }

};

const _withId = /*#__PURE__*/withScopeId("data-v-2dd7b4ae");

pushScopeId("data-v-2dd7b4ae");

const _hoisted_1 = {
  ref: "terminal",
  class: "terminal"
};

const _hoisted_2 = /*#__PURE__*/createVNode("div", {
  class: "topbar"
}, [/*#__PURE__*/createVNode("div", {
  class: "buttons"
}, [/*#__PURE__*/createVNode("span", {
  class: "close-button"
}, [/*#__PURE__*/createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "bi bi-x",
  viewBox: "0 0 15 15"
}, [/*#__PURE__*/createVNode("path", {
  d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
})])]), /*#__PURE__*/createVNode("span", {
  class: "minimize-button"
}, [/*#__PURE__*/createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "bi bi-dash",
  viewBox: "0 0 15 15"
}, [/*#__PURE__*/createVNode("path", {
  d: "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
})])]), /*#__PURE__*/createVNode("span", {
  class: "maximize-button"
}, [/*#__PURE__*/createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "bi bi-arrow-bar-up",
  viewBox: "0 0 15 15"
}, [/*#__PURE__*/createVNode("path", {
  "fill-rule": "evenodd",
  d: "M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
})])])]), /*#__PURE__*/createVNode("div", {
  class: "title"
}, "Terminal")], -1);

const _hoisted_3 = {
  class: "history"
};
const _hoisted_4 = {
  class: "current-line"
};

const _hoisted_5 = /*#__PURE__*/createVNode("p", null, "~/dev", -1);

const _hoisted_6 = {
  class: "cmd"
};

popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("div", _hoisted_1, [_hoisted_2, createVNode("div", {
    class: "body",
    onClick: _cache[4] || (_cache[4] = withModifiers((...args) => $setup.focusInput && $setup.focusInput(...args), ["stop"]))
  }, [createVNode("div", _hoisted_3, [(openBlock(true), createBlock(Fragment, null, renderList($setup.historyCommands, historyCommand => {
    return openBlock(), createBlock(Fragment, {
      key: historyCommand.text
    }, [historyCommand.allowHtml ? (openBlock(), createBlock("p", {
      key: 0,
      class: "history-line",
      style: historyCommand.styles,
      innerHTML: historyCommand.text
    }, null, 12, ["innerHTML"])) : createCommentVNode("", true), !historyCommand.allowHtml ? (openBlock(), createBlock("p", {
      key: 1,
      class: "history-line",
      style: historyCommand.styles
    }, toDisplayString(historyCommand.text), 5)) : createCommentVNode("", true)], 64);
  }), 128))]), createVNode("div", _hoisted_4, [_hoisted_5, createVNode("div", _hoisted_6, [createVNode("span", null, toDisplayString($setup.userInput), 1), createVNode("div", {
    class: "caret",
    ref: "caret",
    style: $setup.caretStyles
  }, null, 4)]), createVNode("input", {
    type: "text",
    autocomplete: "off",
    autocorrect: "off",
    autocapitalize: "off",
    spellcheck: "false",
    onKeyup: [_cache[1] || (_cache[1] = (...args) => $setup.manageKeyUp && $setup.manageKeyUp(...args)), _cache[2] || (_cache[2] = withKeys((...args) => $setup.manageIntroClicked && $setup.manageIntroClicked(...args), ["enter"]))],
    onBlur: _cache[3] || (_cache[3] = (...args) => $setup.inputFocusOut && $setup.inputFocusOut(...args)),
    ref: "input"
  }, null, 544)])])], 512);
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "@import url(\"https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap\");\n.terminal[data-v-2dd7b4ae] {\n  box-sizing: border-box;\n  font-family: \"Fira Mono\", monospace;\n  display: flex;\n  flex-direction: column;\n  resize: both;\n  overflow: hidden;\n  width: 80%;\n  height: 350px;\n  min-width: 250px;\n  min-height: 300px;\n  max-height: 100vh;\n  background-color: black;\n  color: black;\n  border-radius: 10px;\n  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.24);\n}\n.topbar[data-v-2dd7b4ae] {\n  display: flex;\n  flex-wrap: wrap;\n  border-radius: 10px 10px 0 0;\n  background-color: #b0bec5;\n  font-weight: bold;\n  height: auto;\n}\n.topbar .buttons[data-v-2dd7b4ae] {\n  display: flex;\n  align-items: center;\n  padding: 0 15px;\n  justify-content: center;\n  margin: 4px 0 4px 0;\n  border-radius: 10px;\n}\n.topbar .buttons span[data-v-2dd7b4ae] {\n  margin: 4px 4px;\n  height: 15px;\n  width: 15px;\n  align-content: center;\n  border-radius: 50%;\n}\n.topbar .buttons:hover span svg[data-v-2dd7b4ae] {\n  visibility: visible;\n}\n.topbar .buttons span svg[data-v-2dd7b4ae] {\n  position: relative;\n  top: -2px;\n  left: 0;\n  color: black;\n  visibility: hidden;\n  width: 100%;\n  height: 100%;\n}\n.topbar .buttons span svg[data-v-2dd7b4ae]:before {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n}\n.topbar .buttons .close-button[data-v-2dd7b4ae] {\n  font-size: 18px;\n  display: inline-block;\n  background-color: red;\n  cursor: pointer;\n}\n.topbar .buttons .minimize-button[data-v-2dd7b4ae] {\n  font-size: 18px;\n  display: inline-block;\n  background-color: yellow;\n  cursor: pointer;\n}\n.topbar .buttons .maximize-button[data-v-2dd7b4ae] {\n  font-size: 12px;\n  display: inline-block;\n  background-color: green;\n  cursor: pointer;\n}\n.topbar .title[data-v-2dd7b4ae] {\n  margin-left: 2em;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.body[data-v-2dd7b4ae] {\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  padding: 5px 15px;\n  height: 100%;\n  width: auto;\n  color: #24aa64;\n}\n.body .current-line[data-v-2dd7b4ae] {\n  display: flex;\n  height: 1.3rem;\n  width: 100%;\n}\n.body .current-line p[data-v-2dd7b4ae] {\n  margin: 0;\n  padding: 0;\n}\n.body .current-line .cmd[data-v-2dd7b4ae] {\n  display: flex;\n  background: black;\n  margin-left: 15px;\n  color: #24aa64;\n}\n.body .current-line .cmd span[data-v-2dd7b4ae] {\n  float: left;\n  font-size: 16px;\n  padding-left: 3px;\n  white-space: nowrap;\n}\n.body .current-line .cmd .caret[data-v-2dd7b4ae] {\n  float: left;\n  position: relative;\n  left: 0ch;\n  width: 1ch;\n  height: 100%;\n  background: #24aa64;\n}\n.body .current-line .cmd .blink[data-v-2dd7b4ae] {\n  animation: Blink-2dd7b4ae 1s linear infinite alternate;\n}\n@keyframes Blink-2dd7b4ae {\n0% {\n    opacity: 0;\n}\n100% {\n    opacity: 1;\n}\n}\n.body .current-line input[data-v-2dd7b4ae] {\n  opacity: 0;\n  width: 5px;\n  height: 5px;\n  background: black;\n  color: black;\n  overflow: hidden;\n}\n.body .current-line input[data-v-2dd7b4ae]:hover {\n  cursor: default;\n}";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-2dd7b4ae";

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('Terminal', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
