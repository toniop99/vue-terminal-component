'use strict';var vue=require('vue');function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function commandManager(command) {
  var availableCommands = {
    help: {
      name: 'help',
      description: 'list all availables commands on the terminal',
      execute: function execute() {
        var commandList = '';
        Object.keys(availableCommands).forEach(function (key) {
          commandList += "\n            <div>\n              Name: <b>".concat(availableCommands[key].name, "</b> - Description: <b>").concat(availableCommands[key].description, "</b>\n            </div>");
        });
        return {
          text: "\n            <div>This is a list of all available commands:</div>\n            ".concat(commandList, "\n          "),
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
      execute: function execute() {
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
      execute: function execute() {
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
      text: "Unknown command: ".concat(command, " | Try help for a list of commands"),
      color: 'red'
    };
  }

  return availableCommands[command].execute();
}var script = {
  setup: function setup() {
    var userInput = vue.ref("");
    var historyCommands = vue.reactive([]);
    var caretStyles = vue.reactive({});
    var terminal = vue.ref(null);
    var input = vue.ref(null);
    var caret = vue.ref(null);
    vue.onMounted(function () {
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
          for (var i = 0; i < 200; i++) {
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

    function writehistoryLine(_ref) {
      var text = _ref.text,
          color = _ref.color,
          _ref$allowHtml = _ref.allowHtml,
          allowHtml = _ref$allowHtml === void 0 ? false : _ref$allowHtml,
          _ref$additionalStyles = _ref.additionalStyles,
          additionalStyles = _ref$additionalStyles === void 0 ? null : _ref$additionalStyles;
      historyCommands.push({
        text: text,
        allowHtml: allowHtml,
        styles: _objectSpread2({
          fontSize: "14px",
          textAlign: "left",
          color: color,
          padding: 0,
          margin: 0
        }, additionalStyles)
      });
    } // TODO: Implement key-up key-down to navigate through previous commands


    function manageKeyUp(e) {
      userInput.value = e.target.value;
      var caretStartPosition = input.value.selectionStart;
      var caretEndPosition = input.value.selectionEnd;
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
        var left = caretStartPosition - userInputLength;
        caretStyles.left = "".concat(left, "ch");
      } else {
        var caretWidth = caretEndPosition - caretStartPosition;

        var _left = caretStartPosition - userInputLength;

        caretStyles.left = "".concat(_left, "ch");
        caretStyles.width = "".concat(caretWidth, "ch");
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
      var body = terminal.value.querySelector(".body");
      body.scrollTop = body.scrollHeight;
    }

    return {
      caretStyles: caretStyles,
      historyCommands: historyCommands,
      userInput: userInput,
      inputFocusOut: inputFocusOut,
      terminal: terminal,
      caret: caret,
      input: input,
      focusInput: focusInput,
      manageKeyUp: manageKeyUp,
      manageIntroClicked: manageIntroClicked
    };
  }
};var _withId = /*#__PURE__*/vue.withScopeId("data-v-2dd7b4ae");

vue.pushScopeId("data-v-2dd7b4ae");

var _hoisted_1 = {
  ref: "terminal",
  class: "terminal"
};

var _hoisted_2 = /*#__PURE__*/vue.createVNode("div", {
  class: "topbar"
}, [/*#__PURE__*/vue.createVNode("div", {
  class: "buttons"
}, [/*#__PURE__*/vue.createVNode("span", {
  class: "close-button"
}, [/*#__PURE__*/vue.createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "bi bi-x",
  viewBox: "0 0 15 15"
}, [/*#__PURE__*/vue.createVNode("path", {
  d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
})])]), /*#__PURE__*/vue.createVNode("span", {
  class: "minimize-button"
}, [/*#__PURE__*/vue.createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "bi bi-dash",
  viewBox: "0 0 15 15"
}, [/*#__PURE__*/vue.createVNode("path", {
  d: "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
})])]), /*#__PURE__*/vue.createVNode("span", {
  class: "maximize-button"
}, [/*#__PURE__*/vue.createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "bi bi-arrow-bar-up",
  viewBox: "0 0 15 15"
}, [/*#__PURE__*/vue.createVNode("path", {
  "fill-rule": "evenodd",
  d: "M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
})])])]), /*#__PURE__*/vue.createVNode("div", {
  class: "title"
}, "Terminal")], -1);

var _hoisted_3 = {
  class: "history"
};
var _hoisted_4 = {
  class: "current-line"
};

var _hoisted_5 = /*#__PURE__*/vue.createVNode("p", null, "~/dev", -1);

var _hoisted_6 = {
  class: "cmd"
};

vue.popScopeId();

var render = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [_hoisted_2, vue.createVNode("div", {
    class: "body",
    onClick: _cache[4] || (_cache[4] = vue.withModifiers(function () {
      return $setup.focusInput && $setup.focusInput.apply($setup, arguments);
    }, ["stop"]))
  }, [vue.createVNode("div", _hoisted_3, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($setup.historyCommands, function (historyCommand) {
    return vue.openBlock(), vue.createBlock(vue.Fragment, {
      key: historyCommand.text
    }, [historyCommand.allowHtml ? (vue.openBlock(), vue.createBlock("p", {
      key: 0,
      class: "history-line",
      style: historyCommand.styles,
      innerHTML: historyCommand.text
    }, null, 12, ["innerHTML"])) : vue.createCommentVNode("", true), !historyCommand.allowHtml ? (vue.openBlock(), vue.createBlock("p", {
      key: 1,
      class: "history-line",
      style: historyCommand.styles
    }, vue.toDisplayString(historyCommand.text), 5)) : vue.createCommentVNode("", true)], 64);
  }), 128))]), vue.createVNode("div", _hoisted_4, [_hoisted_5, vue.createVNode("div", _hoisted_6, [vue.createVNode("span", null, vue.toDisplayString($setup.userInput), 1), vue.createVNode("div", {
    class: "caret",
    ref: "caret",
    style: $setup.caretStyles
  }, null, 4)]), vue.createVNode("input", {
    type: "text",
    autocomplete: "off",
    autocorrect: "off",
    autocapitalize: "off",
    spellcheck: "false",
    onKeyup: [_cache[1] || (_cache[1] = function () {
      return $setup.manageKeyUp && $setup.manageKeyUp.apply($setup, arguments);
    }), _cache[2] || (_cache[2] = vue.withKeys(function () {
      return $setup.manageIntroClicked && $setup.manageIntroClicked.apply($setup, arguments);
    }, ["enter"]))],
    onBlur: _cache[3] || (_cache[3] = function () {
      return $setup.inputFocusOut && $setup.inputFocusOut.apply($setup, arguments);
    }),
    ref: "input"
  }, null, 544)])])], 512);
});function styleInject(css, ref) {
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
}var css_248z = "@import url(\"https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap\");\n.terminal[data-v-2dd7b4ae] {\n  box-sizing: border-box;\n  font-family: \"Fira Mono\", monospace;\n  display: flex;\n  flex-direction: column;\n  resize: both;\n  overflow: hidden;\n  width: 80%;\n  height: 350px;\n  min-width: 250px;\n  min-height: 300px;\n  max-height: 100vh;\n  background-color: black;\n  color: black;\n  border-radius: 10px;\n  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.24);\n}\n.topbar[data-v-2dd7b4ae] {\n  display: flex;\n  flex-wrap: wrap;\n  border-radius: 10px 10px 0 0;\n  background-color: #b0bec5;\n  font-weight: bold;\n  height: auto;\n}\n.topbar .buttons[data-v-2dd7b4ae] {\n  display: flex;\n  align-items: center;\n  padding: 0 15px;\n  justify-content: center;\n  margin: 4px 0 4px 0;\n  border-radius: 10px;\n}\n.topbar .buttons span[data-v-2dd7b4ae] {\n  margin: 4px 4px;\n  height: 15px;\n  width: 15px;\n  align-content: center;\n  border-radius: 50%;\n}\n.topbar .buttons:hover span svg[data-v-2dd7b4ae] {\n  visibility: visible;\n}\n.topbar .buttons span svg[data-v-2dd7b4ae] {\n  position: relative;\n  top: -2px;\n  left: 0;\n  color: black;\n  visibility: hidden;\n  width: 100%;\n  height: 100%;\n}\n.topbar .buttons span svg[data-v-2dd7b4ae]:before {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n}\n.topbar .buttons .close-button[data-v-2dd7b4ae] {\n  font-size: 18px;\n  display: inline-block;\n  background-color: red;\n  cursor: pointer;\n}\n.topbar .buttons .minimize-button[data-v-2dd7b4ae] {\n  font-size: 18px;\n  display: inline-block;\n  background-color: yellow;\n  cursor: pointer;\n}\n.topbar .buttons .maximize-button[data-v-2dd7b4ae] {\n  font-size: 12px;\n  display: inline-block;\n  background-color: green;\n  cursor: pointer;\n}\n.topbar .title[data-v-2dd7b4ae] {\n  margin-left: 2em;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.body[data-v-2dd7b4ae] {\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  padding: 5px 15px;\n  height: 100%;\n  width: auto;\n  color: #24aa64;\n}\n.body .current-line[data-v-2dd7b4ae] {\n  display: flex;\n  height: 1.3rem;\n  width: 100%;\n}\n.body .current-line p[data-v-2dd7b4ae] {\n  margin: 0;\n  padding: 0;\n}\n.body .current-line .cmd[data-v-2dd7b4ae] {\n  display: flex;\n  background: black;\n  margin-left: 15px;\n  color: #24aa64;\n}\n.body .current-line .cmd span[data-v-2dd7b4ae] {\n  float: left;\n  font-size: 16px;\n  padding-left: 3px;\n  white-space: nowrap;\n}\n.body .current-line .cmd .caret[data-v-2dd7b4ae] {\n  float: left;\n  position: relative;\n  left: 0ch;\n  width: 1ch;\n  height: 100%;\n  background: #24aa64;\n}\n.body .current-line .cmd .blink[data-v-2dd7b4ae] {\n  animation: Blink-2dd7b4ae 1s linear infinite alternate;\n}\n@keyframes Blink-2dd7b4ae {\n0% {\n    opacity: 0;\n}\n100% {\n    opacity: 1;\n}\n}\n.body .current-line input[data-v-2dd7b4ae] {\n  opacity: 0;\n  width: 5px;\n  height: 5px;\n  background: black;\n  color: black;\n  overflow: hidden;\n}\n.body .current-line input[data-v-2dd7b4ae]:hover {\n  cursor: default;\n}";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-2dd7b4ae";// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('Terminal', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;