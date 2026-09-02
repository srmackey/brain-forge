// _brain-forge/obsidian/quickadd-capture-raw.js — QuickAdd Macro
//
// Creates a dated file in raw/ ready for pasting a 'distill-this' output.
// Filename: YYYYMMDD-.md, YYYYMMDD-2-.md, YYYYMMDD-3-.md, ...
// Opens the file immediately so the user can paste.

module.exports = async () => {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const folder = `raw`;
  const content =
    "\n\n<!-- Paste your distill-this output below. " +
    "It supplies its own frontmatter — delete this comment before saving. -->\n";

  // Find an available filename
  let path = `${folder}/${today}-.md`;
  let counter = 2;
  while (app.vault.getAbstractFileByPath(path)) {
    path = `${folder}/${today}-${String(counter)}-.md`;
    counter++;
  }

  const file = await app.vault.create(path, content);
  const leaf = app.workspace.getLeaf("tab");
  await leaf.openFile(file);

  // === Force Source Mode ===
  const viewState = leaf.getViewState();
  if (viewState.state) {
    viewState.state.mode = 'source';
    await leaf.setViewState(viewState);
  }

  // === Select all content (so paste replaces everything) ===
  const editor = leaf.view?.editor;
  if (editor) {
    editor.exec("selectAll");
    editor.focus();
  }
};
