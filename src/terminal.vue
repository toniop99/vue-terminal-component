<template>
  <div ref="terminal" class="terminal">
    <div class="topbar">
      <div class="buttons">
        <span class="close-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 15 15"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
        <span class="minimize-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-dash"
            viewBox="0 0 15 15"
          >
            <path
              d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
            />
          </svg>
        </span>
        <span class="maximize-button"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-arrow-bar-up"
            viewBox="0 0 15 15"
          >
            <path
              fill-rule="evenodd"
              d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
            /></svg
        ></span>
      </div>
      <div class="title">Terminal</div>
    </div>

    <div class="body" @click.stop="focusInput">
      <div class="history">
        <template
          v-for="historyCommand in historyCommands"
          :key="historyCommand.text"
        >
          <p
            v-if="historyCommand.allowHtml"
            class="history-line"
            :style="historyCommand.styles"
            v-html="historyCommand.text"
          />

          <p
            v-if="!historyCommand.allowHtml"
            class="history-line"
            :style="historyCommand.styles"
          >
            {{ historyCommand.text }}
          </p>
        </template>
      </div>
      <div class="current-line">
        <p>~/dev</p>
        <div class="cmd">
          <span>{{ userInput }}</span>
          <div class="caret" ref="caret" :style="caretStyles"></div>
        </div>
        <input
          type="text"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          @keyup="manageKeyUp"
          @keyup.enter="manageIntroClicked"
          @blur="inputFocusOut"
          ref="input"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { commandManager } from "./services/commandManager";

export default {
  setup() {
    const userInput = ref("");
    const historyCommands = reactive([]);
    const caretStyles = reactive({});

    const terminal = ref(null);
    const input = ref(null);
    const caret = ref(null);

    onMounted(() => {
      writehistoryLine({
        text: "Type /help to show all available commands",
        color: "white",
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
              color: "green",
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
      additionalStyles = null,
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
          ...additionalStyles,
        },
      });
    }

    // TODO: Implement key-up key-down to navigate through previous commands
    function manageKeyUp(e) {
      userInput.value = e.target.value;
      const caretStartPosition = input.value.selectionStart;
      const caretEndPosition = input.value.selectionEnd;

      updateCaretPosition(
        caretStartPosition,
        caretEndPosition,
        userInput.value.length
      );
      scrollToBottom();
    }

    function updateCaretPosition(
      caretStartPosition,
      caretEndPosition,
      userInputLength
    ) {
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
      manageIntroClicked,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap");

// Termninal Properties
$terminal-background: rgba(0, 0, 0, 1);
$terminal-width: 80%;
$terminal-height: 350px;
$terminal-text-color: rgba(0, 0, 0, 1);

// Topbar Properties
$topbar-background: rgba(176, 190, 197, 1);

// Body Properties
$body-text-color: rgb(36, 170, 100, 1);

.terminal {
  box-sizing: border-box;
  font-family: "Fira Mono", monospace;
  display: flex;
  flex-direction: column;
  resize: both;
  overflow: hidden;
  width: $terminal-width;
  height: $terminal-height;
  min-width: 250px;
  min-height: 300px;
  max-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: $terminal-background;
  color: $terminal-text-color;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.24);
}

.topbar {
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px 10px 0 0;
  background-color: $topbar-background;
  font-weight: bold;
  height: auto;

  .buttons {
    display: flex;
    align-items: center;
    padding: 0 15px;
    justify-content: center;
    margin: 4px 0 4px 0;
    border-radius: 10px;

    span {
      margin: 4px 4px;
      height: 15px;
      width: 15px;
      align-content: center;
      border-radius: 50%;
    }

    &:hover {
      span svg {
        visibility: visible;
      }
    }

    span svg {
      position: relative;
      top: -2px;
      left: 0;
      color: black;
      visibility: hidden;
      width: 100%;
      height: 100%;

      &:before {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
    .close-button {
      font-size: 18px;
      display: inline-block;
      background-color: red;
      cursor: pointer;
    }

    .minimize-button {
      font-size: 18px;
      display: inline-block;
      background-color: yellow;
      cursor: pointer;
    }

    .maximize-button {
      font-size: 12px;
      display: inline-block;
      background-color: green;
      cursor: pointer;
    }
  }

  .title {
    margin-left: 2em;
    display: flex;
    margin-left: 200px;
    justify-content: center;
    align-items: center;
    color: white;
    text-shadow: 1px 0 1px black;

  }
}

.body {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  height: 100%;
  width: auto;
  color: $body-text-color;

  .current-line {
    display: flex;
    height: 1.3rem;
    width: 100%;

    p {
      margin: 0;
      padding: 0;
    }

    .cmd {
      display: flex;
      background: black;
      margin-left: 15px;
      color: $body-text-color;

      span {
        float: left;
        font-size: 16px;
        padding-left: 3px;
        white-space: nowrap;
      }

      .caret {
        float: left;
        position: relative;
        left: 0ch;
        width: 1ch;
        height: 100%;
        background: $body-text-color;
      }

      .blink {
        animation: Blink 1s linear infinite alternate;
      }
    }

    @keyframes Blink {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    input {
      opacity: 0;
      width: 5px;
      height: 5px;
      background: $terminal-background;
      color: $terminal-background;
      overflow: hidden;

      &:hover {
        cursor: default;
      }
    }
  }
}
</style>
