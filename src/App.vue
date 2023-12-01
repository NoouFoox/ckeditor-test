<template>
  <div id="app">
    <div style="margin: 10px">
      <a-button
        href=""
        @click.stop.prevent="() => {}"
        @dragstart.stop="dragstart"
        style="margin: 2px"
        :data-textv="`${item}按钮`"
        v-for="item in 20"
        :key="item"
        draggable
        >{{ item }}号按钮</a-button
      >
    </div>
    <SpeedEdit @then="logthen" v-model="value" :config="config" />
    {{ value }}
    <div v-html="value"></div>
  </div>
</template>

<script>
import editConfig from "./editConfig";
import extraPlugins from "./extraPlugins";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
const tableConfig = {
  defaultProperties: {
    borderStyle: "solid",
    borderColor: "hsl(0, 0%, 60%)",
    borderWidth: "1px",
  },
};
export default {
  name: "App",
  components: {},
  data() {
    return {
      value: "",
      editor: null,
      config: {
        ...editConfig,
        extraPlugins,
        table: {
          tableCellProperties: tableConfig,
          tableProperties: tableConfig,
        },
      },
    };
  },
  created() {
    fetch("http://192.168.3.206:4523/m1/3565675-0-default/getTxt")
      .then((j) => j.json())
      .then(({ content }) => {
        this.value = content;
      });
  },
  methods: {
    dragstart(event) {
      const html = "${" + event.target.dataset.textv + "}";
      // TODO
      // event.dataTransfer.setData("text/plain", "?????");
      event.dataTransfer.setData("text/html", html);
    },
    logthen(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      //  编辑器调试 启动!
      CKEditorInspector.attach(editor);
      // const view = editor.editing.view;
      // const viewDocument = view.document;
      console.log(editor);
      this.editor = editor;
      window.editor = editor;
    },
  },
};
</script>

<style>
.ck-content .table {
  width: 100%;
  border: hsl(0, 0%, 60%) solid 1px;
}
.ck-content .table .ck-editor__editable {
  border: hsl(0, 0%, 60%) solid 1px;
}
.ck-content {
  height: 90vh;
}
.ck-powered-by {
  display: none;
}
table,
table {
  width: 100%;
  border: hsl(0, 0%, 60%) solid 1px;
}
table td {
  border: hsl(0, 0%, 60%) solid 1px;
}
</style>
