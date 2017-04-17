# Process Code Defining Document

This is a command line application, and not designed to be run as a node module in a node server or browser.

    node index.js [markdown file name] [optional output code file name]

A pdf is rendered from the input Markdown, and the indented pre-formated code sections are extracted to a js file.

In it's current state, it is designed to serve the [solar_design_algorithm](https://github.com/kshowalter/solar_design_algorithm) project, but may be made more general if needed.
