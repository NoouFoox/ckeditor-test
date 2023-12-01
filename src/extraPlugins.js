import { customUploadAdapterPlugin } from "./upload";
// 限制表格不能嵌套表格
function DisallowNestingTables(editor) {
  editor.model.schema.addChildCheck((context, childDefinition) => {
    if (
      childDefinition.name == "table" &&
      Array.from(context.getNames()).includes("table")
    ) {
      return false;
    }
  });
}

const extraPlugins = [DisallowNestingTables, customUploadAdapterPlugin];
export default extraPlugins;
